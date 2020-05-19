const markdownFormatter = function (formatter, HTMLHint) {
  formatter.on('end', (event) => {
    console.log('# TOC')

    const arrToc = []
    const arrContents = []
    const arrAllMessages = event.arrAllMessages

    arrAllMessages.forEach((fileInfo) => {
      const filePath = fileInfo.file
      const arrMessages = fileInfo.messages
      let errorCount = 0
      let warningCount = 0

      arrMessages.forEach((message) => {
        if (message.type === 'error') {
          errorCount++
        } else {
          warningCount++
        }
      })

      arrToc.push(`   - [${filePath}](#${filePath})`)
      arrContents.push(`<a name="${filePath}" />`)
      arrContents.push(`# ${filePath}`)
      arrContents.push('')
      arrContents.push(`Found ${errorCount} errors, ${warningCount} warnings`)

      const arrLogs = HTMLHint.format(arrMessages)
      arrContents.push('')
      arrLogs.forEach((log) => {
        arrContents.push(`    ${log}`)
      })
      arrContents.push('')
    })

    console.log(`${arrToc.join('\r\n')}\r\n`)
    console.log(arrContents.join('\r\n'))
  })
}

module.exports = markdownFormatter
