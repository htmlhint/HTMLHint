var fs = require('fs')

var htmlFormatter = function (formatter) {
  formatter.on('end', function (event) {
    var fileContent
    fileContent = '<html>'
    fileContent += `<head><title>HTML Hint Violation Report</title></head>`
    fileContent += `<body>`
    fileContent += `<center><h2>Violation Report</h2></center>`

    fileContent += `<table border = 1>`
    fileContent += `<tr><th>Number#</th><th>File Name</th><th>Line Number</th><th>Message</th></tr>`

    var arrAllMessages = event.arrAllMessages
    arrAllMessages.forEach(function (fileInfo) {
      var arrMessages = fileInfo.messages
      arrMessages.forEach(function (message, i) {
        fileContent += `<tr><td>${i + 1}</td><td>${fileInfo.file}</td><td>${
          message.line
        }</td><td>${message.message}</td></tr>`
      })
    })

    fileContent = fileContent.replace('</table></body></html>')
    console.log(fileContent)
    fs.writeFileSync('report.html', fileContent)
  })
}

module.exports = htmlFormatter
