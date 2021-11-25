#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var async_1 = require("async");
var chalk = require("chalk");
var commander_1 = require("commander");
var fs_1 = require("fs");
var glob = require("glob");
var parseGlob = require("parse-glob");
var path_1 = require("path");
var node_fetch_1 = require("node-fetch");
var stripJsonComments = require("strip-json-comments");
var HTMLHint = require('../htmlhint.js').HTMLHint;
var formatter = require('./formatter');
var pkg = require('../../package.json');
function map(val) {
    var objMap = {};
    val.split(',').forEach(function (item) {
        var arrItem = item.split(/\s*=\s*/);
        objMap[arrItem[0]] = arrItem[1] ? arrItem[1] : true;
    });
    return objMap;
}
var program = new commander_1.Command();
program.on('--help', function () {
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
var arrSupportedFormatters = formatter.getSupported();
program
    .version(pkg.version)
    .usage('<file|folder|pattern|stdin|url ...> [options]')
    .option('-l, --list', 'show all of the rules available')
    .option('-c, --config <file>', 'custom configuration file')
    .option('-r, --rules <ruleid, ruleid=value ...>', 'set all of the rules available', map)
    .option('-R, --rulesdir <file|folder>', 'load custom rules from file or folder')
    .option("-f, --format <".concat(arrSupportedFormatters.join('|'), ">"), 'output messages as custom format')
    .option('-i, --ignore <pattern, pattern ...>', 'add pattern to exclude matches')
    .option('--nocolor', 'disable color')
    .option('--warn', 'Warn only, exit with 0')
    .parse(process.argv);
var cliOptions = program.opts();
if (cliOptions.list) {
    listRules();
    process.exit(0);
}
var arrTargets = program.args;
if (arrTargets.length === 0) {
    arrTargets.push('./');
}
formatter.init(HTMLHint, {
    nocolor: cliOptions.nocolor,
});
var format = cliOptions.format || 'default';
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
    var rules = HTMLHint.rules;
    var rule;
    console.log('     All rules:');
    console.log(' ==================================================');
    for (var id in rules) {
        rule = rules[id];
        console.log('     %s : %s', chalk.bold(rule.id), rule.description);
    }
}
function hintTargets(arrTargets, options) {
    var arrAllMessages = [];
    var allFileCount = 0;
    var allHintFileCount = 0;
    var allHintCount = 0;
    var startTime = new Date().getTime();
    var formatter = options.formatter;
    var rulesdir = options.rulesdir;
    if (rulesdir) {
        loadCustomRules(rulesdir);
    }
    formatter.emit('start');
    var arrTasks = [];
    arrTargets.forEach(function (target) {
        arrTasks.push(function (next) {
            hintAllFiles(target, options, function (result) {
                allFileCount += result.targetFileCount;
                allHintFileCount += result.targetHintFileCount;
                allHintCount += result.targetHintCount;
                arrAllMessages = arrAllMessages.concat(result.arrTargetMessages);
                next();
            });
        });
    });
    (0, async_1.series)(arrTasks, function () {
        var spendTime = new Date().getTime() - startTime;
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
            var arrFiles = glob.sync(rulesdir, {
                dot: false,
                nodir: true,
                strict: false,
                silent: true,
            });
            arrFiles.forEach(function (file) {
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
        var module_1 = require(filepath);
        module_1(HTMLHint);
    }
    catch (e) {
    }
}
function hintAllFiles(target, options, onFinished) {
    var globInfo = getGlobInfo(target);
    globInfo.ignore = options.ignore;
    var formatter = options.formatter;
    var targetFileCount = 0;
    var targetHintFileCount = 0;
    var targetHintCount = 0;
    var arrTargetMessages = [];
    var ruleset = options.ruleset;
    if (ruleset === undefined) {
        ruleset = getConfig(cliOptions.config, globInfo.base, formatter);
    }
    var hintQueue = (0, async_1.queue)(function (filepath, next) {
        var startTime = new Date().getTime();
        if (filepath === 'stdin') {
            hintStdin(ruleset, hintNext);
        }
        else if (/^https?:\/\//.test(filepath)) {
            hintUrl(filepath, ruleset, hintNext);
        }
        else {
            var messages = hintFile(filepath, ruleset);
            hintNext(messages);
        }
        function hintNext(messages) {
            var spendTime = new Date().getTime() - startTime;
            var hintCount = messages.length;
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
    var isWalkDone = false;
    var isHintDone = true;
    hintQueue.drain(function () {
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
        walkPath(globInfo, function (filepath) {
            isHintDone = false;
            void hintQueue.push(filepath);
        }, function () {
            isWalkDone = true;
            checkAllHinted();
        });
    }
}
function getGlobInfo(target) {
    target = target.replace(/\\/g, '/');
    var globInfo = parseGlob(target);
    var base = (0, path_1.resolve)(globInfo.base);
    base += /\/$/.test(base) ? '' : '/';
    var pattern = globInfo.glob;
    var globPath = globInfo.path;
    var defaultGlob = '*.{htm,html}';
    if (globInfo.is.glob === true) {
        if (globPath.basename === '') {
            pattern += defaultGlob;
        }
    }
    else {
        if (globPath.basename === '') {
            pattern += "**/".concat(defaultGlob);
        }
        else if ((0, fs_1.existsSync)(target) && (0, fs_1.statSync)(target).isDirectory()) {
            base += "".concat(globPath.basename, "/");
            pattern = "**/".concat(defaultGlob);
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
            var tmpConfigFile = (0, path_1.resolve)(base, '.htmlhintrc');
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
        var config = (0, fs_1.readFileSync)(configPath, 'utf-8');
        var ruleset = {};
        try {
            ruleset = JSON.parse(stripJsonComments(config));
            formatter.emit('config', {
                ruleset: ruleset,
                configPath: configPath,
            });
        }
        catch (e) {
        }
        return ruleset;
    }
}
function walkPath(globInfo, callback, onFinish) {
    var base = globInfo.base;
    var pattern = globInfo.pattern;
    var ignore = globInfo.ignore;
    var arrIgnores = ['**/node_modules/**'];
    if (ignore) {
        ignore.split(',').forEach(function (pattern) {
            arrIgnores.push(pattern);
        });
    }
    var walk = glob(pattern, {
        cwd: base,
        dot: false,
        ignore: arrIgnores,
        nodir: true,
        strict: false,
        silent: true,
    }, function () {
        onFinish();
    });
    walk.on('match', function (file) {
        base = base.replace(/^.\//, '');
        if (path_1.sep !== '/') {
            base = base.replace(/\//g, path_1.sep);
        }
        callback(base + file);
    });
}
function hintFile(filepath, ruleset) {
    var content = '';
    try {
        content = (0, fs_1.readFileSync)(filepath, 'utf-8');
    }
    catch (e) {
    }
    return HTMLHint.verify(content, ruleset);
}
function hintStdin(ruleset, callback) {
    process.stdin.setEncoding('utf8');
    var buffers = [];
    process.stdin.on('data', function (text) {
        buffers.push(text);
    });
    process.stdin.on('end', function () {
        var content = buffers.join('');
        var messages = HTMLHint.verify(content, ruleset);
        callback(messages);
    });
}
function hintUrl(url, ruleset, callback) {
    var errorFn = function () { return callback([]); };
    (0, node_fetch_1.default)(url).then(function (response) {
        if (response.ok) {
            response.text().then(function (body) {
                var messages = HTMLHint.verify(body, ruleset);
                callback(messages);
            }, errorFn);
        }
        else {
            errorFn();
        }
    }, errorFn);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHRtbGhpbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY2xpL2h0bWxoaW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLCtCQUFrRTtBQUNsRSw2QkFBOEI7QUFDOUIsdUNBQW1DO0FBQ25DLHlCQUF1RDtBQUN2RCwyQkFBNEI7QUFFNUIsc0NBQXVDO0FBQ3ZDLDZCQUE0QztBQUM1Qyx5Q0FBOEI7QUFDOUIsdURBQXdEO0FBS3hELElBQU0sUUFBUSxHQUFxQixPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxRQUFRLENBQUE7QUFDckUsSUFBTSxTQUFTLEdBQWMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFBO0FBRW5ELElBQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFBO0FBRXpDLFNBQVMsR0FBRyxDQUFDLEdBQVc7SUFDdEIsSUFBTSxNQUFNLEdBQXNDLEVBQUUsQ0FBQTtJQUNwRCxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQUk7UUFDMUIsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQTtRQUNyQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQTtJQUNyRCxDQUFDLENBQUMsQ0FBQTtJQUNGLE9BQU8sTUFBTSxDQUFBO0FBQ2YsQ0FBQztBQUVELElBQU0sT0FBTyxHQUFHLElBQUksbUJBQU8sRUFBRSxDQUFBO0FBRTdCLE9BQU8sQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFO0lBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUE7SUFDMUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUNm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