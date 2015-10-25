/**
 * Copyright (c) 2015, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */
var xml = require('xml');

var formatter = {
    onEnd: function(hintInfo, HTMLHint){
        var arrTestcase = [];
        var arrAllMessages = hintInfo.arrAllMessages;
        arrAllMessages.forEach(function(fileInfo){
            var arrMessages = fileInfo.messages;
            var arrLogs = HTMLHint.format(arrMessages);
            arrTestcase.push({
                testcase: [
                    {
                      _attr: {
                        name: fileInfo.file,
                        time: (fileInfo.time / 1000).toFixed(3)
                      }
                    },
                    {
                        failure: {
                            _attr: {
                                message: 'Found '+arrMessages.length+' errors'
                            },
                            _cdata: arrLogs.join('\r\n')
                        }
                    }
                ]
            });
        });
        var objXml = {
            testsuites: [
                {
                    testsuite: [
                        {
                          _attr: {
                            name: 'HTMLHint Tests',
                            time: (hintInfo.time / 1000).toFixed(3),
                            tests: hintInfo.allFileCount,
                            failures: arrAllMessages.length
                          }
                        }
                    ].concat(arrTestcase)
                }
            ]
        };
        console.log(xml(objXml, {
            declaration: true,
            indent: '    '
        }));
    }
};
module.exports = formatter;
