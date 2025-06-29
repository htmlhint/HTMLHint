import { writeFileSync } from 'fs'
import { FormatterCallback } from '../formatter'

/**
 * Escapes HTML characters for safe display in HTML
 * @param message The message that might contain HTML code
 * @returns Escaped message
 */
const formatMessage = (message: string): string =>
  message
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')

const htmlFormatter: FormatterCallback = function (formatter) {
  formatter.on('end', (event) => {
    let fileContent = '<!DOCTYPE html>\n'
    fileContent += '<html lang="en">\n'
    fileContent += '<head>\n'
    fileContent += '<meta charset="utf-8">\n'
    fileContent +=
      '<meta name="viewport" content="width=device-width, initial-scale=1">\n'
    fileContent += '<title>HTML Hint Violation Report</title>\n'
    fileContent += '<meta name="generator" content="HTMLHint">\n'
    fileContent += '<meta name="color-scheme" content="light dark">\n'
    fileContent +=
      '<meta name="description" content="HTMLHint Violation Report">\n'
    fileContent +=
      '<style>body{font-family:Arial,helvetica,sans-serif;} footer{margin-top:20px;text-align:center;opacity:0.5;}</style>\n'
    fileContent +=
      '<style>table{border-collapse:collapse;width:100%;} th,td{border:1px solid rgb(128,128,128,0.4);padding:8px;text-align:left;} th{background-color:rgb(128,128,128,0.2);}</style>\n'
    fileContent +=
      '<style>@media (prefers-color-scheme: dark) {body {background-color:#333;color-scheme: dark;color:#fff;}}</style>\n'
    fileContent += '</head>\n'
    fileContent += '<body>\n'
    fileContent += '<h1>Violation Report</h1>\n'
    fileContent += '<main>\n'
    fileContent += '<table>\n'
    fileContent +=
      '<tr><th>Number#</th><th>File Name</th><th>Line Number</th><th>Message</th></tr>\n'

    let totalMessages = 0
    for (const { messages } of event.arrAllMessages) {
      totalMessages += messages.length
    }

    let messageCount = 0
    for (const { file, messages } of event.arrAllMessages) {
      messages.forEach(({ line, message }) => {
        messageCount++
        const isLastMessage = messageCount === totalMessages

        if (isLastMessage) {
          // Last message - add the table closing tag right after it (no newline)
          fileContent += `<tr><td>${messageCount}</td><td>${file}</td><td>${line}</td><td>${formatMessage(message)}</td></tr></table>\n`
        } else {
          fileContent += `<tr><td>${messageCount}</td><td>${file}</td><td>${line}</td><td>${formatMessage(message)}</td></tr>\n`
        }
      })
    }

    // Table closing tag is now included with the last message
    // fileContent += '</table>\n'
    fileContent +=
      '<footer><small>Generated by <a href="https://htmlhint.com" target="_blank" rel="noopener">HTMLHint</a></small></footer>\n'
    fileContent += '</main>\n'
    fileContent += '</body>\n'
    fileContent += '</html>'
    console.log(fileContent)
    writeFileSync('report.html', fileContent)
  })
}

module.exports = htmlFormatter
