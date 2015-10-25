/**
 * Copyright (c) 2015, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */
var formatter = {
    onFileHint: function(result){
        result.messages.forEach(function (message) {
            console.log([
                result.file,
                message.line,
                message.col,
                " " + message.message + ' ['+message.type+'/'+message.rule.id+']'
            ].join(":"));
        });
    },
    onEnd: function(hintInfo){
        var allHintCount = hintInfo.allHintCount;
        if(allHintCount > 0){
            console.log('');
            console.log('%d problems', hintInfo.allHintCount);
        }
    }
};
module.exports = formatter;
