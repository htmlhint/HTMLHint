var xml = require('xml');

var junitFormatter = function(formatter, HTMLHint) {
  formatter.on('end', function(event) {
    var arrTestcase = [];
    var arrAllMessages = event.arrAllMessages;
    arrAllMessages.forEach(function(fileInfo) {
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
                message: 'Found ' + arrMessages.length + ' errors'
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
                time: (event.time / 1000).toFixed(3),
                tests: event.allFileCount,
                failures: arrAllMessages.length
              }
            }
          ].concat(arrTestcase)
        }
      ]
    };
    console.log(
      xml(objXml, {
        declaration: true,
        indent: '    '
      })
    );
  });
};
module.exports = junitFormatter;
