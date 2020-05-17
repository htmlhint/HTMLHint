var xml = require('xml')

var checkstyleFormatter = function (formatter) {
  formatter.on('end', function (event) {
    var arrFiles = []
    var arrAllMessages = event.arrAllMessages
    arrAllMessages.forEach(function (fileInfo) {
      var arrMessages = fileInfo.messages
      var arrErrors = []
      arrMessages.forEach(function (message) {
        arrErrors.push({
          error: {
            _attr: {
              line: message.line,
              column: message.col,
              severity: message.type,
              message: message.message,
              source: 'htmlhint.' + message.rule.id,
            },
          },
        })
      })
      arrFiles.push({
        file: [
          {
            _attr: {
              name: fileInfo.file,
            },
          },
        ].concat(arrErrors),
      })
    })
    var objXml = {
      checkstyle: [
        {
          _attr: {
            version: '4.3',
          },
        },
      ].concat(arrFiles),
    }
    console.log(
      xml(objXml, {
        declaration: true,
        indent: '    ',
      })
    )
  })
}
module.exports = checkstyleFormatter
