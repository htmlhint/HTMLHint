#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const async_1 = require("async");
const chalk = require("chalk");
const commander_1 = require("commander");
const fs_1 = require("fs");
const glob = require("glob");
const parse_glob_1 = require("./parse-glob");
const path_1 = require("path");
const node_fetch_1 = require("node-fetch");
const stripJsonComments = require("strip-json-comments");
const HTMLHint = require('../htmlhint.js').HTMLHint;
const formatter = require('./formatter');
const pkg = require('../../package.json');
function map(val) {
    const objMap = {};
    val.split(',').forEach((item) => {
        const arrItem = item.split(/\s*=\s*/);
        objMap[arrItem[0]] = arrItem[1] ? arrItem[1] : true;
    });
    return objMap;
}
const program = new commander_1.Command();
program.on('--help', () => {
    console.log('  Examples:');
    console.log('');
    console.log('    htmlhint');
    console.log('    htmlhint www');
    console.log('    htmlhint www/test.html');
    console.log('    htmlhint www/**/*.xhtml');
    console.log('    htmlhint www/**/*.{htm,html}');
    console.log('    htmlhint http://www.alibaba.com/');
    console.log('    cat test.html | htmlhint stdin');
    console.log('    htmlhint --list');
    console.log('    htmlhint --rules tag-pair,id-class-value=underline test.html');
    console.log('    htmlhint --config .htmlhintrc test.html');
    console.log('    htmlhint --ignore **/build/**,**/test/**');
    console.log('    htmlhint --rulesdir ./rules/');
    console.log('');
});
const arrSupportedFormatters = formatter.getSupported();
program
    .version(pkg.version)
    .usage('<file|folder|pattern|stdin|url ...> [options]')
    .option('-l, --list', 'show all of the rules available')
    .option('-c, --config <file>', 'custom configuration file')
    .option('-r, --rules <ruleid, ruleid=value ...>', 'set all of the rules available', map)
    .option('-R, --rulesdir <file|folder>', 'load custom rules from file or folder')
    .option(`-f, --format <${arrSupportedFormatters.join('|')}>`, 'output messages as custom format')
    .option('-i, --ignore <pattern, pattern ...>', 'add pattern to exclude matches')
    .option('--nocolor', 'disable color')
    .option('--warn', 'Warn only, exit with 0')
    .parse(process.argv);
const cliOptions = program.opts();
if (cliOptions.list) {
    listRules();
    process.exit(0);
}
const arrTargets = program.args;
if (arrTargets.length === 0) {
    arrTargets.push('./');
}
formatter.init(HTMLHint, {
    nocolor: cliOptions.nocolor,
});
const format = cliOptions.format || 'default';
if (format) {
    formatter.setFormat(format);
}
hintTargets(arrTargets, {
    rulesdir: cliOptions.rulesdir,
    ruleset: cliOptions.rules,
    formatter: formatter,
    ignore: cliOptions.ignore,
});
function listRules() {
    const rules = HTMLHint.rules;
    let rule;
    console.log('     All rules:');
    console.log(' ==================================================');
    for (const id in rules) {
        rule = rules[id];
        console.log('     %s : %s', chalk.bold(rule.id), rule.description);
    }
}
function hintTargets(arrTargets, options) {
    let arrAllMessages = [];
    let allFileCount = 0;
    let allHintFileCount = 0;
    let allHintCount = 0;
    const startTime = new Date().getTime();
    const formatter = options.formatter;
    const rulesdir = options.rulesdir;
    if (rulesdir) {
        loadCustomRules(rulesdir);
    }
    formatter.emit('start');
    const arrTasks = [];
    arrTargets.forEach((target) => {
        arrTasks.push((next) => {
            hintAllFiles(target, options, (result) => {
                allFileCount += result.targetFileCount;
                allHintFileCount += result.targetHintFileCount;
                allHintCount += result.targetHintCount;
                arrAllMessages = arrAllMessages.concat(result.arrTargetMessages);
                next();
            });
        });
    });
    (0, async_1.series)(arrTasks, () => {
        const spendTime = new Date().getTime() - startTime;
        formatter.emit('end', {
            arrAllMessages: arrAllMessages,
            allFileCount: allFileCount,
            allHintFileCount: allHintFileCount,
            allHintCount: allHintCount,
            time: spendTime,
        });
        process.exit(!cliOptions.warn && allHintCount > 0 ? 1 : 0);
    });
}
function loadCustomRules(rulesdir) {
    rulesdir = rulesdir.replace(/\\/g, '/');
    if ((0, fs_1.existsSync)(rulesdir)) {
        if ((0, fs_1.statSync)(rulesdir).isDirectory()) {
            rulesdir += /\/$/.test(rulesdir) ? '' : '/';
            rulesdir += '**/*.js';
            const arrFiles = glob.sync(rulesdir, {
                dot: false,
                nodir: true,
                strict: false,
                silent: true,
            });
            arrFiles.forEach((file) => {
                loadRule(file);
            });
        }
        else {
            loadRule(rulesdir);
        }
    }
}
function loadRule(filepath) {
    filepath = (0, path_1.resolve)(filepath);
    try {
        const module = require(filepath);
        module(HTMLHint);
    }
    catch (e) {
    }
}
function hintAllFiles(target, options, onFinished) {
    const globInfo = getGlobInfo(target);
    globInfo.ignore = options.ignore;
    const formatter = options.formatter;
    let targetFileCount = 0;
    let targetHintFileCount = 0;
    let targetHintCount = 0;
    const arrTargetMessages = [];
    let ruleset = options.ruleset;
    if (ruleset === undefined) {
        ruleset = getConfig(cliOptions.config, globInfo.base, formatter);
    }
    const hintQueue = (0, async_1.queue)((filepath, next) => {
        const startTime = new Date().getTime();
        if (filepath === 'stdin') {
            hintStdin(ruleset, hintNext);
        }
        else if (/^https?:\/\//.test(filepath)) {
            hintUrl(filepath, ruleset, hintNext);
        }
        else {
            const messages = hintFile(filepath, ruleset);
            hintNext(messages);
        }
        function hintNext(messages) {
            const spendTime = new Date().getTime() - startTime;
            const hintCount = messages.length;
            if (hintCount > 0) {
                formatter.emit('file', {
                    file: filepath,
                    messages: messages,
                    time: spendTime,
                });
                arrTargetMessages.push({
                    file: filepath,
                    messages: messages,
                    time: spendTime,
                });
                targetHintFileCount++;
                targetHintCount += hintCount;
            }
            targetFileCount++;
            setImmediate(next);
        }
    }, 10);
    let isWalkDone = false;
    let isHintDone = true;
    hintQueue.drain(() => {
        isHintDone = true;
        checkAllHinted();
    });
    function checkAllHinted() {
        if (isWalkDone && isHintDone) {
            onFinished({
                targetFileCount: targetFileCount,
                targetHintFileCount: targetHintFileCount,
                targetHintCount: targetHintCount,
                arrTargetMessages: arrTargetMessages,
            });
        }
    }
    if (target === 'stdin') {
        isWalkDone = true;
        void hintQueue.push(target);
    }
    else if (/^https?:\/\//.test(target)) {
        isWalkDone = true;
        void hintQueue.push(target);
    }
    else {
        walkPath(globInfo, (filepath) => {
            isHintDone = false;
            void hintQueue.push(filepath);
        }, () => {
            isWalkDone = true;
            checkAllHinted();
        });
    }
}
function getGlobInfo(target) {
    target = target.replace(/\\/g, '/');
    const globInfo = (0, parse_glob_1.parseGlob)(target);
    let base = (0, path_1.resolve)(globInfo.base);
    base += /\/$/.test(base) ? '' : '/';
    let pattern = globInfo.glob;
    const globPath = globInfo.path;
    const defaultGlob = '*.{htm,html}';
    if (globInfo.is.glob === true) {
        if (globPath.basename === '') {
            pattern += defaultGlob;
        }
    }
    else {
        if (globPath.basename === '') {
            pattern += `**/${defaultGlob}`;
        }
        else if ((0, fs_1.existsSync)(target) && (0, fs_1.statSync)(target).isDirectory()) {
            base += `${globPath.basename}/`;
            pattern = `**/${defaultGlob}`;
        }
    }
    return {
        base: base,
        pattern: pattern,
    };
}
function getConfig(configPath, base, formatter) {
    if (configPath === undefined && (0, fs_1.existsSync)(base)) {
        if ((0, fs_1.statSync)(base).isDirectory() === false) {
            base = (0, path_1.dirname)(base);
        }
        while (base) {
            const tmpConfigFile = (0, path_1.resolve)(base, '.htmlhintrc');
            if ((0, fs_1.existsSync)(tmpConfigFile)) {
                configPath = tmpConfigFile;
                break;
            }
            if (!base) {
                break;
            }
            base = base.substring(0, base.lastIndexOf(path_1.sep));
        }
    }
    if (configPath !== undefined && (0, fs_1.existsSync)(configPath)) {
        const config = (0, fs_1.readFileSync)(configPath, 'utf-8');
        let ruleset = {};
        try {
            ruleset = JSON.parse(stripJsonComments(config));
            formatter.emit('config', {
                ruleset: ruleset,
                configPath: configPath,
            });
        }
        catch (e) {
            console.log('   Config could not be parsed: %s', chalk.yellow(configPath));
            console.log('');
        }
        return ruleset;
    }
}
function walkPath(globInfo, callback, onFinish) {
    let base = globInfo.base;
    const pattern = globInfo.pattern;
    const ignore = globInfo.ignore;
    const arrIgnores = ['**/node_modules/**'];
    if (ignore) {
        ignore.split(',').forEach((pattern) => {
            arrIgnores.push(pattern);
        });
    }
    const walk = glob(pattern, {
        cwd: base,
        dot: false,
        ignore: arrIgnores,
        nodir: true,
        strict: false,
        silent: true,
    }, () => {
        onFinish();
    });
    walk.on('match', (file) => {
        base = base.replace(/^.\//, '');
        if (path_1.sep !== '/') {
            base = base.replace(/\//g, path_1.sep);
        }
        callback(base + file);
    });
}
function hintFile(filepath, ruleset) {
    let content = '';
    try {
        content = (0, fs_1.readFileSync)(filepath, 'utf-8');
    }
    catch (e) {
    }
    return HTMLHint.verify(content, ruleset);
}
function hintStdin(ruleset, callback) {
    process.stdin.setEncoding('utf8');
    const buffers = [];
    process.stdin.on('data', (text) => {
        buffers.push(text);
    });
    process.stdin.on('end', () => {
        const content = buffers.join('');
        const messages = HTMLHint.verify(content, ruleset);
        callback(messages);
    });
}
function hintUrl(url, ruleset, callback) {
    const errorFn = () => callback([]);
    (0, node_fetch_1.default)(url).then((response) => {
        if (response.ok) {
            response.text().then((body) => {
                const messages = HTMLHint.verify(body, ruleset);
                callback(messages);
            }, errorFn);
        }
        else {
            errorFn();
        }
    }, errorFn);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHRtbGhpbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY2xpL2h0bWxoaW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLGlDQUFrRTtBQUNsRSwrQkFBOEI7QUFDOUIseUNBQW1DO0FBQ25DLDJCQUF1RDtBQUN2RCw2QkFBNEI7QUFFNUIsNkNBQXdDO0FBQ3hDLCtCQUE0QztBQUM1QywyQ0FBOEI7QUFDOUIseURBQXdEO0FBS3hELE1BQU0sUUFBUSxHQUFxQixPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxRQUFRLENBQUE7QUFDckUsTUFBTSxTQUFTLEdBQWMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFBO0FBRW5ELE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFBO0FBRXpDLFNBQVMsR0FBRyxDQUFDLEdBQVc7SUFDdEIsTUFBTSxNQUFNLEdBQXNDLEVBQUUsQ0FBQTtJQUNwRCxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQzlCLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUE7UUFDckMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUE7SUFDckQsQ0FBQyxDQUFDLENBQUE7SUFDRixPQUFPLE1BQU0sQ0FBQTtBQUNmLENBQUM7QUFFRCxNQUFNLE9BQU8sR0FBRyxJQUFJLG1CQUFPLEVBQUUsQ0FBQTtBQUU3QixPQUFPLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUU7SUFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQTtJQUMxQixPQUFPLENBQUMsR0FBRyxDQUFD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