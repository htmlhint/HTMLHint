#!/usr/bin/env node

var program = require('commander'),
    fs = require('fs'),
    path = require('path'),
    HTMLHint  = require("../index").HTMLHint;

require('colors');

function map(val) {
    var objMap = {};
    val.split(',').forEach(function(item){
    var arrItem = item.split(/\s*=\s*/);
    objMap[arrItem[0]] = arrItem[1]?arrItem[1]:true;
    });
    return objMap;
}

program.on('--help', function(){
    console.log('  Examples:');
    console.log('');
    console.log('    htmlhint -l');
    console.log('    htmlhint -r tag-pair,id-class-value=underline test.html');
    console.log('    htmlhint -c .htmlhintrc test.html');
    console.log('    htmlhint -f checkstyle test.html');
    console.log('');
});

program
    .version('@VERSION')
    .usage('[options] <file ...>')
    .option('-l, --list', 'show all of the rules available.')
    .option('-c, --config <file>', 'custom configuration file.')
    .option('-r, --rules <ruleid, ruleid=value ...>', 'set all of the rules available.', map)
    .option('-f, --format <format>', 'indicate which format to use for output.')
    .parse(process.argv);

if(program.list){
    listRules();
    quit(0);
}

var arrAllFiles = getAllFiles(program.args);

var ruleset = program.rules;
if(ruleset === undefined){
    ruleset = getConfig(program.config);
}
var formatter = HTMLHint.getFormatter(program.format || 'text');

quit(processFiles(arrAllFiles, ruleset));

function listRules(){
    var rules = HTMLHint.rules,
        rule;
    console.log('\r\nAll rules:');
    console.log('======================================');
    for (var id in rules){
        rule = rules[id];
        console.log('\r\n'+rule.id+' :');
        console.log('    '+rule.description);
    }
}

function getConfig(configFile){
    if(configFile === undefined){
        configFile = '.htmlhintrc';
    }
    if(fs.existsSync(configFile)){
        var config = fs.readFileSync(configFile, 'utf-8'),
            ruleset;
        try{
            ruleset = JSON.parse(config);
        }
        catch(e){}
        return ruleset;
    }
}

function getAllFiles(arrTargets){
    var arrAllFiles = [];
    if(arrTargets.length > 0){
        for(var i=0,l=arrTargets.length;i<l;i++){
            getFiles(arrTargets[i], arrAllFiles);
        }
    }
    else{
        getFiles(process.cwd(), arrAllFiles);
    }
    return arrAllFiles;
}

function getFiles(filepath, arrFiles){
    if(fs.existsSync(filepath) === false){
        return;
    }
    filepath = path.resolve(process.cwd(), filepath);
    var stat = fs.statSync(filepath);
    if(stat.isFile() && /\.html?$/i.test(filepath)){
        arrFiles.push(filepath);
    }
    else if(stat.isDirectory()){
        fs.readdirSync(filepath).forEach(function(filename){
            getFiles(filepath + '/' + filename, arrFiles);
        });
    }
}

function processFiles(arrFiles, ruleset){
    var exitcode = 0,
        allHintCount = 0;
    if (formatter.start) {
        console.log(formatter.start());
    }
    arrFiles.forEach(function(filepath){
        var hintCount = hintFile(filepath, ruleset);
        if(hintCount > 0){
            exitcode = 1;
            allHintCount += hintCount;
        }
    });
    if (formatter.end) {
        console.log(formatter.end(allHintCount));
    }
    return exitcode;
}

function hintFile(filepath, ruleset){
    var html = fs.readFileSync(filepath, 'utf-8');
    var messages = HTMLHint.verify(html, ruleset);
    if(messages.length > 0){
        console.log(formatter.format(messages, filepath));
    }
    return messages.length;
}

function quit(code){
    if ((!process.stdout.flush || !process.stdout.flush()) && (parseFloat(process.versions.node) < 0.5)) {
        process.once("drain", function () {
            process.exit(code || 0);
        });
    } else {
        process.exit(code || 0);
    }
}