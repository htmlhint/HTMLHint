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
    .option("-f, --format <" + arrSupportedFormatters.join('|') + ">", 'output messages as custom format')
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
    async_1.series(arrTasks, function () {
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
    if (fs_1.existsSync(rulesdir)) {
        if (fs_1.statSync(rulesdir).isDirectory()) {
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
    filepath = path_1.resolve(filepath);
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
    var hintQueue = async_1.queue(function (filepath, next) {
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
    var base = path_1.resolve(globInfo.base);
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
            pattern += "**/" + defaultGlob;
        }
        else if (fs_1.existsSync(target) && fs_1.statSync(target).isDirectory()) {
            base += globPath.basename + "/";
            pattern = "**/" + defaultGlob;
        }
    }
    return {
        base: base,
        pattern: pattern,
    };
}
function getConfig(configPath, base, formatter) {
    if (configPath === undefined && fs_1.existsSync(base)) {
        if (fs_1.statSync(base).isDirectory() === false) {
            base = path_1.dirname(base);
        }
        while (base) {
            var tmpConfigFile = path_1.resolve(base, '.htmlhintrc');
            if (fs_1.existsSync(tmpConfigFile)) {
                configPath = tmpConfigFile;
                break;
            }
            if (!base) {
                break;
            }
            base = base.substring(0, base.lastIndexOf(path_1.sep));
        }
    }
    if (configPath !== undefined && fs_1.existsSync(configPath)) {
        var config = fs_1.readFileSync(configPath, 'utf-8');
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
        content = fs_1.readFileSync(filepath, 'utf-8');
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
    node_fetch_1.default(url).then(function (response) {
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