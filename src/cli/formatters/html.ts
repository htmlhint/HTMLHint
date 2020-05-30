import { writeFileSync } from 'fs'
import { FormatterCallback } from '../formatter'

const htmlFormatter: FormatterCallback = function (formatter) {
  formatter.on('end', (event) => {
    let fileContent = '<html>'
    fileContent += '<head><title>HTML Hint Violation Report</title></head>'
    fileContent += '<body>'
    fileContent += '<center><h2>Violation Report</h2></center>'

    fileContent += '<table border="1">'
    fileContent +=
      '<tr><th>Number#</th><th>File Name</th><th>Line Number</th><th>Message</th></tr>'

    for (const { file, messages } of event.arrAllMessages) {
      fileContent += messages
        .map(
          ({ line, message }, i) =>
            `<tr><td>${
              i + 1
            }</td><td>${file}</td><td>${line}</td><td>${message}</td></tr>`
        )
        .join('')
    }

    fileContent += '</table></body></html>'
    console.log(fileContent)
    writeFileSync('report.html', fileContent)
  })
}

module.exports = htmlFormatter
