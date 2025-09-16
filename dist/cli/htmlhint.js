#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const async_1 = require("async");
const chalk = require("chalk");
const commander_1 = require("commander");
const fs_1 = require("fs");
const glob_1 = require("glob");
const parse_glob_1 = require("./parse-glob");
const path_1 = require("path");
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
    console.log('    htmlhint https://www.example.com/');
    console.log('    cat test.html | htmlhint stdin');
    console.log('    htmlhint --list');
    console.log('    htmlhint --init');
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
    .option('--init', 'create a new .htmlhintrc config file with default rules')
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
if (cliOptions.init) {
    const success = initConfig();
    process.exit(success ? 0 : 1);
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
    const ruleIds = Object.keys(rules).sort();
    console.log('     All rules:');
    console.log(' ==================================================');
    for (const id of ruleIds) {
        const rule = rules[id];
        console.log('     %s : %s', chalk.bold(rule.id), rule.description);
    }
}
function initConfig() {
    const configPath = '.htmlhintrc';
    const defaultConfig = JSON.stringify(HTMLHint.defaultRuleset, null, 2);
    try {
        (0, fs_1.writeFileSync)(configPath, defaultConfig, { encoding: 'utf-8', flag: 'wx' });
        console.log(chalk.green('Created configuration file: %s'), configPath);
        console.log('');
        console.log('Configuration file contents:');
        console.log(chalk.gray(defaultConfig));
        return true;
    }
    catch (error) {
        if (error instanceof Error && 'code' in error && error.code === 'EEXIST') {
            console.log(chalk.yellow('Configuration file already exists: %s'), configPath);
            return true;
        }
        console.log(chalk.red('Failed to create configuration file: %s'), error instanceof Error ? error.message : String(error));
        return false;
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
            const arrFiles = (0, glob_1.globSync)(rulesdir, {
                dot: false,
                nodir: true,
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
            return ruleset;
        }
        catch (e) {
            console.log('   Config could not be parsed: %s', chalk.yellow(configPath));
            console.log('');
        }
    }
    return undefined;
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
    const walk = (0, glob_1.globStream)(pattern, {
        cwd: base,
        dot: false,
        ignore: arrIgnores,
        nodir: true,
    });
    walk.on('data', (file) => {
        base = base.replace(/^.\//, '');
        if (path_1.sep !== '/') {
            base = base.replace(/\//g, path_1.sep);
        }
        callback(base + file);
    });
    walk.on('end', () => {
        onFinish();
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
    fetch(url).then((response) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHRtbGhpbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY2xpL2h0bWxoaW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLGlDQUFrRTtBQUNsRSwrQkFBOEI7QUFDOUIseUNBQW1DO0FBQ25DLDJCQUFzRTtBQUN0RSwrQkFBaUQ7QUFDakQsNkNBQXdDO0FBQ3hDLCtCQUE0QztBQUU1Qyx5REFBd0Q7QUFLeEQsTUFBTSxRQUFRLEdBQXFCLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLFFBQVEsQ0FBQTtBQUNyRSxNQUFNLFNBQVMsR0FBYyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUE7QUFFbkQsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUE7QUFFekMsU0FBUyxHQUFHLENBQUMsR0FBVztJQUN0QixNQUFNLE1BQU0sR0FBc0MsRUFBRSxDQUFBO0lBQ3BELEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDOUIsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQTtRQUNyQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQTtJQUNyRCxDQUFDLENBQUMsQ0FBQTtJQUNGLE9BQU8sTUFBTSxDQUFBO0FBQ2YsQ0FBQztBQUVELE1BQU0sT0FBTyxHQUFHLElBQUksbUJBQU8sRUFBRSxDQUFBO0FBRTdCLE9BQU8sQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRTtJQUN4QixPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFBO0lBQzFCLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENB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