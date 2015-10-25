/**
 * Copyright (c) 2015, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */
var xml = require('xml');

var formatter = {
    onEnd: function(hintInfo){
        var arrFiles = [];
        var arrAllMessages = hintInfo.arrAllMessages;
        arrAllMessages.forEach(function(fileInfo){
            var arrMessages = fileInfo.messages;
            var arrErrors = [];
            arrMessages.forEach(function(message){
                arrErrors.push({
                    error: {
                        _attr: {
                            line: message.line,
                            column: message.col,
                            severity: message.type,
                            message: message.message,
                            source: 'htmlhint.'+message.rule.id
                        }
                    }
                });
            });
            arrFiles.push({
                file: [
                    {
                        _attr: {
                            name: fileInfo.file
                        }
                    }
                ].concat(arrErrors)
            });
        });
        var objXml = {
            checkstyle: [
                {
                  _attr: {
                    version: '4.3'
                  }
                }
            ].concat(arrFiles)
        };
        console.log(xml(objXml, {
            declaration: true,
            indent: '    '
        }));
    }
};
module.exports = formatter;
