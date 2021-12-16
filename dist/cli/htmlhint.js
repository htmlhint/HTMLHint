#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const async_1 = require("async");
const chalk = require("chalk");
const commander_1 = require("commander");
const cosmiconfig_1 = require("cosmiconfig");
const fs_1 = require("fs");
const glob = require("glob");
const parseGlob = require("parse-glob");
const path_1 = require("path");
const node_fetch_1 = require("node-fetch");
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
        let result;
        const explorerSync = (0, cosmiconfig_1.cosmiconfigSync)('htmlhint');
        explorerSync.clearCaches();
        try {
            let configPath = cliOptions.config;
            if (configPath) {
                result = explorerSync.load(configPath);
                if (result == null) {
                    console.error(`Could not resolve config file at ${configPath}`);
                    process.exit(2);
                }
                else if (result.isEmpty) {
                    console.error('Config file is empty');
                    process.exit(2);
                }
                ruleset = result.config;
            }
            else {
                result = explorerSync.search(globInfo.base);
                if (result == null || result.isEmpty) {
                    ruleset = {};
                    configPath = '';
                }
                else {
                    ruleset = result.config;
                    configPath = result.filepath;
                }
            }
            formatter.emit('config', {
                ruleset: ruleset,
                configPath: configPath,
            });
        }
        catch (err) {
            console.log(err);
            process.exit(2);
        }
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
    const globInfo = parseGlob(target);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHRtbGhpbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY2xpL2h0bWxoaW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLGlDQUFrRTtBQUNsRSwrQkFBOEI7QUFDOUIseUNBQW1DO0FBQ25DLDZDQUE2QztBQUM3QywyQkFBdUQ7QUFDdkQsNkJBQTRCO0FBRTVCLHdDQUF1QztBQUN2QywrQkFBbUM7QUFDbkMsMkNBQThCO0FBSzlCLE1BQU0sUUFBUSxHQUFxQixPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxRQUFRLENBQUE7QUFDckUsTUFBTSxTQUFTLEdBQWMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFBO0FBRW5ELE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFBO0FBRXpDLFNBQVMsR0FBRyxDQUFDLEdBQVc7SUFDdEIsTUFBTSxNQUFNLEdBQXNDLEVBQUUsQ0FBQTtJQUNwRCxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQzlCLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUE7UUFDckMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUE7SUFDckQsQ0FBQyxDQUFDLENBQUE7SUFDRixPQUFPLE1BQU0sQ0FBQTtBQUNmLENBQUM7QUFFRCxNQUFNLE9BQU8sR0FBRyxJQUFJLG1CQUFPLEVBQUUsQ0FBQTtBQUU3QixPQUFPLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUU7SUFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQTtJQUMxQixPQUFPLENBQUMsR0FBRyxDQUFD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