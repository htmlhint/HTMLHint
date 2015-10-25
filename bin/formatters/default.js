/**
 * Copyright (c) 2015, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */
var formatter = {
    onStart: function(){
        console.log('');
    },
    onConfigLoaded: function(config, configPath){
        console.log('   Config loaded: %s', configPath.cyan);
        console.log('');
    },
    onFileHint: function(result, HTMLHint){
        console.log('   '+result.file.white);
        var arrLogs = HTMLHint.format(result.messages, {
            colors: true,
            indent: 6
        });
        arrLogs.forEach(function(str){
            console.log(str);
        });
        console.log('');
    },
    onEnd: function(hintInfo){
        var allFileCount = hintInfo.allFileCount;
        var allHintCount = hintInfo.allHintCount;
        var allHintFileCount = hintInfo.allHintFileCount;
        var time = hintInfo.time;
        if(allHintCount > 0){
            console.log('Scan %d files, found %d errors in %d files (%d ms)'.red, allFileCount, allHintCount, allHintFileCount, time);
        }
        else{
            console.log('Scan %d files, without errors (%d ms).'.green, allFileCount, time);
        }
    }
};
module.exports = formatter;
