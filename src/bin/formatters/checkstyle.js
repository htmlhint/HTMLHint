const xml = require('xml')

const checkstyleFormatter = function (formatter) {
  formatter.on('end', (event) => {
    const arrFiles = []
    const arrAllMessages = event.arrAllMessages

    arrAllMessages.forEach((fileInfo) => {
      const arrMessages = fileInfo.messages
      const arrErrors = []

      arrMessages.forEach((message) => {
        arrErrors.push({
          error: {
            _attr: {
              line: message.line,
              column: message.col,
              severity: message.type,
              message: message.message,
              source: `htmlhint.${message.rule.id}`,
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

    const objXml = {
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
