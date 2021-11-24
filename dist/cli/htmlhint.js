#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var async_1 = require("async");
var chalk = require("chalk");
var program = require("commander");
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
if (program.list) {
    listRules();
    process.exit(0);
}
var arrTargets = program.args;
if (arrTargets.length === 0) {
    arrTargets.push('./');
}
formatter.init(HTMLHint, {
    nocolor: program.nocolor,
});
var format = program.format || 'default';
if (format) {
    formatter.setFormat(format);
}
hintTargets(arrTargets, {
    rulesdir: program.rulesdir,
    ruleset: program.rules,
    formatter: formatter,
    ignore: program.ignore,
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
        process.exit(!program.warn && allHintCount > 0 ? 1 : 0);
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
        ruleset = getConfig(program.config, globInfo.base, formatter);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHRtbGhpbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY2xpL2h0bWxoaW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLCtCQUFrRTtBQUNsRSw2QkFBOEI7QUFDOUIsbUNBQW9DO0FBQ3BDLHlCQUF1RDtBQUN2RCwyQkFBNEI7QUFFNUIsc0NBQXVDO0FBQ3ZDLDZCQUE0QztBQUM1Qyx5Q0FBOEI7QUFDOUIsdURBQXdEO0FBS3hELElBQU0sUUFBUSxHQUFxQixPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxRQUFRLENBQUE7QUFDckUsSUFBTSxTQUFTLEdBQWMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFBO0FBRW5ELElBQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFBO0FBRXpDLFNBQVMsR0FBRyxDQUFDLEdBQVc7SUFDdEIsSUFBTSxNQUFNLEdBQXNDLEVBQUUsQ0FBQTtJQUNwRCxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQUk7UUFDMUIsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQTtRQUNyQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQTtJQUNyRCxDQUFDLENBQUMsQ0FBQTtJQUNGLE9BQU8sTUFBTSxDQUFBO0FBQ2YsQ0FBQztBQUVELE9BQU8sQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFO0lBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUE7SUFDMUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUE7SUFDM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFBO0lBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsNEJBQTRCLENBQUMsQ0FBQTtJQUN6QyxPQUFPLENBQUMsR0FBRyxDQUFDLDZCQUE2QixDQUFDLENBQUE7SUFDMUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFBO0lBQy9DLE9BQU8sQ0FBQyxHQUFHLENBQUMsc0NBQXNDLENBQUMsQ0FBQTtJQUNuRCxPQUFPLENBQUMsR0FBRyxDQUFDLG9DQUFvQyxDQUFDLENBQUE7SUFDakQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFBO0lBQ2xDLE9BQU8sQ0FBQyxHQUFHLENBQ1Qsa0VBQWtFLENBQ25FLENBQUE7SUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLDZDQUE2QyxDQUFDLENBQUE7SUFDMUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyw4Q0FBOEMsQ0FBQyxDQUFBO0lBQzNELE9BQU8sQ0FBQyxHQUFHLENBQUMsa0NBQWtDLENBQUMsQ0FBQTtJQUMvQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFBO0FBQ2pCLENBQUMsQ0FBQyxDQUFBO0FBRUYsSUFBTSxzQkFBc0IsR0FBRyxTQUFTLENBQUMsWUFBWSxFQUFFLENBQUE7QUFFdkQsT0FBTztLQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDO0tBQ3BCLEtBQUssQ0FBQywrQ0FBK0MsQ0FBQztLQUN0RCxNQUFNLENBQUMsWUFBWSxFQUFFLGlDQUFpQyxDQUFDO0tBQ3ZELE1BQU0sQ0FBQyxxQkFBcUIsRUFBRSwyQkFBMkIsQ0FBQztLQUMxRCxNQUFNLENBQ0wsd0NBQXdDLEVBQ3hDLGdDQUFnQyxFQUNoQyxHQUFHLENBQ0o7S0FDQSxNQUFNLENBQ0wsOEJBQThCLEVBQzlCLHVDQUF1QyxDQUN4QztLQUNBLE1BQU0sQ0FDTCxtQkFBaUIsc0JBQXNCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFHLEVBQ3BELGtDQUFrQyxDQUNuQztLQUNBLE1BQU0sQ0FDTCxxQ0FBcUMsRUFDckMsZ0NBQWdDLENBQ2pDO0tBQ0EsTUFBTSxDQUFDLFdBQVcsRUFBRSxlQUFlLENBQUM7S0FDcEMsTUFBTSxDQUFDLFFBQVEsRUFBRSx3QkFBd0IsQ0FBQztLQUMxQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO0FBRXRCLElBQUksT0FBTyxDQUFDLElBQUksRUFBRTtJQUNoQixTQUFTLEVBQUUsQ0FBQTtJQUNYLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7Q0FDaEI7QUFFRCxJQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFBO0FBQy9CLElBQUksVUFBVSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7SUFDM0IsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtDQUN0QjtBQUdELFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO0lBQ3ZCLE9BQU8sRUFBRSxPQUFPLENBQUMsT0FBTztDQUN6QixDQUFDLENBQUE7QUFFRixJQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxJQUFJLFNBQVMsQ0FBQTtBQUMxQyxJQUFJLE1BQU0sRUFBRTtJQUNWLFNBQVMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUE7Q0FDNUI7QUFFRCxXQUFXLENBQUMsVUFBVSxFQUFFO0lBQ3RCLFFBQVEsRUFBRSxPQUFPLENBQUMsUUFBUTtJQUMxQixPQUFPLEVBQUUsT0FBTyxDQUFDLEtBQUs7SUFDdEIsU0FBUyxFQUFFLFNBQVM7SUFDcEIsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNO0NBQ3ZCLENBQUMsQ0FBQTtBQUdGLFNBQVMsU0FBUztJQUNoQixJQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFBO0lBQzVCLElBQUksSUFBSSxDQUFBO0lBRVIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO0lBQzlCLE9BQU8sQ0FBQyxHQUFHLENBQUMscURBQXFELENBQUMsQ0FBQTtJQUVsRSxLQUFLLElBQU0sRUFBRSxJQUFJLEtBQUssRUFBRTtRQUN0QixJQUFJLEdBQUcsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQ2hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQTtLQUNuRTtBQUNILENBQUM7QUFFRCxTQUFTLFdBQVcsQ0FDbEIsVUFBb0IsRUFDcEIsT0FLQztJQUVELElBQUksY0FBYyxHQUliLEVBQUUsQ0FBQTtJQUNQLElBQUksWUFBWSxHQUFHLENBQUMsQ0FBQTtJQUNwQixJQUFJLGdCQUFnQixHQUFHLENBQUMsQ0FBQTtJQUN4QixJQUFJLFlBQVksR0FBRyxDQUFDLENBQUE7SUFDcEIsSUFBTSxTQUFTLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtJQUV0QyxJQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFBO0lBR25DLElBQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUE7SUFDakMsSUFBSSxRQUFRLEVBQUU7UUFDWixlQUFlLENBQUMsUUFBUSxDQUFDLENBQUE7S0FDMUI7SUFHRCxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBRXZCLElBQU0sUUFBUSxHQUFzQyxFQUFFLENBQUE7SUFDdEQsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFDLE1BQU07UUFDeEIsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFDLElBQUk7WUFDakIsWUFBWSxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsVUFBQyxNQUFNO2dCQUNuQyxZQUFZLElBQUksTUFBTSxDQUFDLGVBQWUsQ0FBQTtnQkFDdEMsZ0JBQWdCLElBQUksTUFBTSxDQUFDLG1CQUFtQixDQUFBO2dCQUM5QyxZQUFZLElBQUksTUFBTSxDQUFDLGVBQWUsQ0FBQTtnQkFDdEMsY0FBYyxHQUFHLGNBQWMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUE7Z0JBQ2hFLElBQUksRUFBRSxDQUFBO1lBQ1IsQ0FBQyxDQUFDLENBQUE7UUFDSixDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUMsQ0FBQyxDQUFBO0lBRUYsY0FBVyxDQUFDLFFBQVEsRUFBRTtRQUVwQixJQUFNLFNBQVMsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLFNBQVMsQ0FBQTtRQUNsRCxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNwQixjQUFjLEVBQUUsY0FBYztZQUM5QixZQUFZLEVBQUUsWUFBWTtZQUMxQixnQkFBZ0IsRUFBRSxnQkFBZ0I7WUFDbEMsWUFBWSxFQUFFLFlBQVk7WUFDMUIsSUFBSSxFQUFFLFNBQVM7U0FDaEIsQ0FBQyxDQUFBO1FBQ0YsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksWUFBWSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUN6RCxDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUM7QUFHRCxTQUFTLGVBQWUsQ0FBQyxRQUFnQjtJQUN2QyxRQUFRLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUE7SUFDdkMsSUFBSSxlQUFVLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDeEIsSUFBSSxhQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUU7WUFDcEMsUUFBUSxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFBO1lBQzNDLFFBQVEsSUFBSSxTQUFTLENBQUE7WUFDckIsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ25DLEdBQUcsRUFBRSxLQUFLO2dCQUNWLEtBQUssRUFBRSxJQUFJO2dCQUNYLE1BQU0sRUFBRSxLQUFLO2dCQUNiLE1BQU0sRUFBRSxJQUFJO2FBQ2IsQ0FBQyxDQUFBO1lBQ0YsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQUk7Z0JBQ3BCLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUNoQixDQUFDLENBQUMsQ0FBQTtTQUNIO2FBQU07WUFDTCxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUE7U0FDbkI7S0FDRjtBQUNILENBQUM7QUFHRCxTQUFTLFFBQVEsQ0FBQyxRQUFnQjtJQUNoQyxRQUFRLEdBQUcsY0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQzVCLElBQUk7UUFDRixJQUFNLFFBQU0sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDaEMsUUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0tBQ2pCO0lBQUMsT0FBTyxDQUFDLEVBQUU7S0FFWDtBQUNILENBQUM7QUFHRCxTQUFTLFlBQVksQ0FDbkIsTUFBYyxFQUNkLE9BSUMsRUFDRCxVQVNVO0lBRVYsSUFBTSxRQUFRLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQ3BDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQTtJQUVoQyxJQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFBO0lBR25DLElBQUksZUFBZSxHQUFHLENBQUMsQ0FBQTtJQUN2QixJQUFJLG1CQUFtQixHQUFHLENBQUMsQ0FBQTtJQUMzQixJQUFJLGVBQWUsR0FBRyxDQUFDLENBQUE7SUFDdkIsSUFBTSxpQkFBaUIsR0FJbEIsRUFBRSxDQUFBO0lBR1AsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQTtJQUM3QixJQUFJLE9BQU8sS0FBSyxTQUFTLEVBQUU7UUFDekIsT0FBTyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUE7S0FDOUQ7SUFHRCxJQUFNLFNBQVMsR0FBRyxhQUFVLENBQVMsVUFBQyxRQUFRLEVBQUUsSUFBSTtRQUNsRCxJQUFNLFNBQVMsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFBO1FBRXRDLElBQUksUUFBUSxLQUFLLE9BQU8sRUFBRTtZQUN4QixTQUFTLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFBO1NBQzdCO2FBQU0sSUFBSSxjQUFjLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ3hDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFBO1NBQ3JDO2FBQU07WUFDTCxJQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFBO1lBQzVDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQTtTQUNuQjtRQUVELFNBQVMsUUFBUSxDQUFDLFFBQWdCO1lBQ2hDLElBQU0sU0FBUyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsU0FBUyxDQUFBO1lBQ2xELElBQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUE7WUFDakMsSUFBSSxTQUFTLEdBQUcsQ0FBQyxFQUFFO2dCQUNqQixTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtvQkFDckIsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsUUFBUSxFQUFFLFFBQVE7b0JBQ2xCLElBQUksRUFBRSxTQUFTO2lCQUNoQixDQUFDLENBQUE7Z0JBQ0YsaUJBQWlCLENBQUMsSUFBSSxDQUFDO29CQUNyQixJQUFJLEVBQUUsUUFBUTtvQkFDZCxRQUFRLEVBQUUsUUFBUTtvQkFDbEIsSUFBSSxFQUFFLFNBQVM7aUJBQ2hCLENBQUMsQ0FBQTtnQkFDRixtQkFBbUIsRUFBRSxDQUFBO2dCQUNyQixlQUFlLElBQUksU0FBUyxDQUFBO2FBQzdCO1lBQ0QsZUFBZSxFQUFFLENBQUE7WUFDakIsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ3BCLENBQUM7SUFDSCxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUE7SUFHTixJQUFJLFVBQVUsR0FBRyxLQUFLLENBQUE7SUFDdEIsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFBO0lBQ3JCLFNBQVMsQ0FBQyxLQUFLLENBQUM7UUFDZCxVQUFVLEdBQUcsSUFBSSxDQUFBO1FBQ2pCLGNBQWMsRUFBRSxDQUFBO0lBQ2xCLENBQUMsQ0FBQyxDQUFBO0lBRUYsU0FBUyxjQUFjO1FBQ3JCLElBQUksVUFBVSxJQUFJLFVBQVUsRUFBRTtZQUM1QixVQUFVLENBQUM7Z0JBQ1QsZUFBZSxFQUFFLGVBQWU7Z0JBQ2hDLG1CQUFtQixFQUFFLG1CQUFtQjtnQkFDeEMsZUFBZSxFQUFFLGVBQWU7Z0JBQ2hDLGlCQUFpQixFQUFFLGlCQUFpQjthQUNyQyxDQUFDLENBQUE7U0FDSDtJQUNILENBQUM7SUFFRCxJQUFJLE1BQU0sS0FBSyxPQUFPLEVBQUU7UUFDdEIsVUFBVSxHQUFHLElBQUksQ0FBQTtRQUNqQixLQUFLLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7S0FDNUI7U0FBTSxJQUFJLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFDdEMsVUFBVSxHQUFHLElBQUksQ0FBQTtRQUNqQixLQUFLLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7S0FDNUI7U0FBTTtRQUNMLFFBQVEsQ0FDTixRQUFRLEVBQ1IsVUFBQyxRQUFRO1lBQ1AsVUFBVSxHQUFHLEtBQUssQ0FBQTtZQUNsQixLQUFLLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDL0IsQ0FBQyxFQUNEO1lBQ0UsVUFBVSxHQUFHLElBQUksQ0FBQTtZQUNqQixjQUFjLEVBQUUsQ0FBQTtRQUNsQixDQUFDLENBQ0YsQ0FBQTtLQUNGO0FBQ0gsQ0FBQztBQUdELFNBQVMsV0FBVyxDQUFDLE1BQWM7SUFNakMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFBO0lBRW5DLElBQU0sUUFBUSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUNsQyxJQUFJLElBQUksR0FBRyxjQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBRWpDLElBQUksSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQTtJQUVuQyxJQUFJLE9BQU8sR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFBO0lBQzNCLElBQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUE7SUFDOUIsSUFBTSxXQUFXLEdBQUcsY0FBYyxDQUFBO0lBRWxDLElBQUksUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEtBQUssSUFBSSxFQUFFO1FBRTdCLElBQUksUUFBUSxDQUFDLFFBQVEsS0FBSyxFQUFFLEVBQUU7WUFDNUIsT0FBTyxJQUFJLFdBQVcsQ0FBQTtTQUN2QjtLQUNGO1NBQU07UUFFTCxJQUFJLFFBQVEsQ0FBQyxRQUFRLEtBQUssRUFBRSxFQUFFO1lBQzVCLE9BQU8sSUFBSSxRQUFNLFdBQWEsQ0FBQTtTQUMvQjthQUVJLElBQUksZUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLGFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRTtZQUM3RCxJQUFJLElBQU8sUUFBUSxDQUFDLFFBQVEsTUFBRyxDQUFBO1lBQy9CLE9BQU8sR0FBRyxRQUFNLFdBQWEsQ0FBQTtTQUM5QjtLQUNGO0lBRUQsT0FBTztRQUNMLElBQUksRUFBRSxJQUFJO1FBQ1YsT0FBTyxFQUFFLE9BQU87S0FDakIsQ0FBQTtBQUNILENBQUM7QUFHRCxTQUFTLFNBQVMsQ0FDaEIsVUFBOEIsRUFDOUIsSUFBWSxFQUNaLFNBQW9CO0lBRXBCLElBQUksVUFBVSxLQUFLLFNBQVMsSUFBSSxlQUFVLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFFaEQsSUFBSSxhQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxFQUFFLEtBQUssS0FBSyxFQUFFO1lBQzFDLElBQUksR0FBRyxjQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7U0FDckI7UUFFRCxPQUFPLElBQUksRUFBRTtZQUNYLElBQU0sYUFBYSxHQUFHLGNBQU8sQ0FBQyxJQUFJLEVBQUUsYUFBYSxDQUFDLENBQUE7WUFFbEQsSUFBSSxlQUFVLENBQUMsYUFBYSxDQUFDLEVBQUU7Z0JBQzdCLFVBQVUsR0FBRyxhQUFhLENBQUE7Z0JBQzFCLE1BQUs7YUFDTjtZQUVELElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQ1QsTUFBSzthQUNOO1lBRUQsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBRyxDQUFDLENBQUMsQ0FBQTtTQUNoRDtLQUNGO0lBR0QsSUFBSSxVQUFVLEtBQUssU0FBUyxJQUFJLGVBQVUsQ0FBQyxVQUFVLENBQUMsRUFBRTtRQUN0RCxJQUFNLE1BQU0sR0FBRyxpQkFBWSxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQTtRQUNoRCxJQUFJLE9BQU8sR0FBWSxFQUFFLENBQUE7UUFFekIsSUFBSTtZQUNGLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUE7WUFDL0MsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ3ZCLE9BQU8sRUFBRSxPQUFPO2dCQUNoQixVQUFVLEVBQUUsVUFBVTthQUN2QixDQUFDLENBQUE7U0FDSDtRQUFDLE9BQU8sQ0FBQyxFQUFFO1NBRVg7UUFFRCxPQUFPLE9BQU8sQ0FBQTtLQUNmO0FBQ0gsQ0FBQztBQUdELFNBQVMsUUFBUSxDQUNmLFFBQTRELEVBQzVELFFBQW9DLEVBQ3BDLFFBQW9CO0lBRXBCLElBQUksSUFBSSxHQUFXLFFBQVEsQ0FBQyxJQUFJLENBQUE7SUFDaEMsSUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQTtJQUNoQyxJQUFNLE1BQU0sR0FBdUIsUUFBUSxDQUFDLE1BQU0sQ0FBQTtJQUNsRCxJQUFNLFVBQVUsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUE7SUFFekMsSUFBSSxNQUFNLEVBQUU7UUFDVixNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFDLE9BQU87WUFDaEMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUMxQixDQUFDLENBQUMsQ0FBQTtLQUNIO0lBRUQsSUFBTSxJQUFJLEdBQVUsSUFBSSxDQUN0QixPQUFPLEVBQ1A7UUFDRSxHQUFHLEVBQUUsSUFBSTtRQUNULEdBQUcsRUFBRSxLQUFLO1FBQ1YsTUFBTSxFQUFFLFVBQVU7UUFDbEIsS0FBSyxFQUFFLElBQUk7UUFDWCxNQUFNLEVBQUUsS0FBSztRQUNiLE1BQU0sRUFBRSxJQUFJO0tBQ2IsRUFDRDtRQUNFLFFBQVEsRUFBRSxDQUFBO0lBQ1osQ0FBQyxDQUNGLENBQUE7SUFFRCxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxVQUFDLElBQVk7UUFDNUIsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFBO1FBRS9CLElBQUksVUFBRyxLQUFLLEdBQUcsRUFBRTtZQUNmLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxVQUFHLENBQUMsQ0FBQTtTQUNoQztRQUVELFFBQVEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUE7SUFDdkIsQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDO0FBR0QsU0FBUyxRQUFRLENBQUMsUUFBZ0IsRUFBRSxPQUFpQjtJQUNuRCxJQUFJLE9BQU8sR0FBRyxFQUFFLENBQUE7SUFFaEIsSUFBSTtRQUNGLE9BQU8sR0FBRyxpQkFBWSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQTtLQUMxQztJQUFDLE9BQU8sQ0FBQyxFQUFFO0tBRVg7SUFFRCxPQUFPLFFBQVEsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFBO0FBQzFDLENBQUM7QUFHRCxTQUFTLFNBQVMsQ0FDaEIsT0FBNEIsRUFDNUIsUUFBb0M7SUFFcEMsT0FBTyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUE7SUFFakMsSUFBTSxPQUFPLEdBQWEsRUFBRSxDQUFBO0lBRTVCLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxVQUFDLElBQUk7UUFDNUIsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUNwQixDQUFDLENBQUMsQ0FBQTtJQUVGLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRTtRQUN0QixJQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQ2hDLElBQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFBO1FBQ2xELFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUNwQixDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUM7QUFHRCxTQUFTLE9BQU8sQ0FDZCxHQUFXLEVBQ1gsT0FBNEIsRUFDNUIsUUFBb0M7SUFFcEMsSUFBTSxPQUFPLEdBQUcsY0FBTSxPQUFBLFFBQVEsQ0FBQyxFQUFFLENBQUMsRUFBWixDQUFZLENBQUE7SUFDbEMsb0JBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxRQUFRO1FBQ3ZCLElBQUksUUFBUSxDQUFDLEVBQUUsRUFBRTtZQUNmLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQyxJQUFJO2dCQUN4QixJQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQTtnQkFDL0MsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1lBQ3BCLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQTtTQUNaO2FBQU07WUFDTCxPQUFPLEVBQUUsQ0FBQTtTQUNWO0lBQ0gsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFBO0FBQ2IsQ0FBQyJ9