const fs = require('fs')

const htmlFormatter = function (formatter) {
  formatter.on('end', function (event) {
    let fileContent
    fileContent = '<html>'
    fileContent =
      fileContent + '<head><title>HTML Hint Violation Report</title></head>'
    fileContent = fileContent + '<body>'
    fileContent = fileContent + '<center><h2>Violation Report</h2></center>'

    fileContent = fileContent + '<table border = 1>'
    fileContent =
      fileContent +
      '<tr><th>Number#</th><th>File Name</th><th>Line Number</th><th>Message</th></tr>'

    const arrAllMessages = event.arrAllMessages
    arrAllMessages.forEach(function (fileInfo) {
      const arrMessages = fileInfo.messages
      arrMessages.forEach(function (message, i) {
        fileContent =
          fileContent +
          '<tr><td>' +
          (i + 1) +
          '</td><td>' +
          fileInfo.file +
          '</td><td>' +
          message.line +
          '</td><td>' +
          message.message +
          '</td></tr>'
      })
    })

    fileContent = fileContent.replace('</table></body></html>')
    console.log(fileContent)
    fs.writeFileSync('report.html', fileContent)
  })
}

module.exports = htmlFormatter
