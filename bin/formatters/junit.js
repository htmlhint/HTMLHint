let xml = require('xml')

let junitFormatter = function (formatter, HTMLHint) {
  formatter.on('end', function (event) {
    let arrTestcase = []
    let arrAllMessages = event.arrAllMessages

    arrAllMessages.forEach(function (fileInfo) {
      let arrMessages = fileInfo.messages
      let arrLogs = HTMLHint.format(arrMessages)

      arrTestcase.push({
        testcase: [
          {
            _attr: {
              name: fileInfo.file,
              time: (fileInfo.time / 1000).toFixed(3),
            },
          },
          {
            failure: {
              _attr: {
                message: 'Found ' + arrMessages.length + ' errors',
              },
              _cdata: arrLogs.join('\r\n'),
            },
          },
        ],
      })
    })

    let objXml = {
      testsuites: [
        {
          testsuite: [
            {
              _attr: {
                name: 'HTMLHint Tests',
                time: (event.time / 1000).toFixed(3),
                tests: event.allFileCount,
                failures: arrAllMessages.length,
              },
            },
          ].concat(arrTestcase),
        },
      ],
    }

    console.log(
      xml(objXml, {
        declaration: true,
        indent: '    ',
      })
    )
  })
}

module.exports = junitFormatter
