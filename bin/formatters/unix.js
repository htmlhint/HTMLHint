const unixFormatter = function (formatter, HTMLHint, options) {
  const nocolor = options.nocolor
  formatter.on('file', (event) => {
    event.messages.forEach((message) => {
      console.log(
        [
          event.file,
          message.line,
          message.col,
          ` ${message.message} [${message.type}/${message.rule.id}]`,
        ].join(':')
      )
    })
  })

  formatter.on('end', (event) => {
    const allHintCount = event.allHintCount
    if (allHintCount > 0) {
      console.log('')
      const message = '%d problems'
      console.log(nocolor ? message : message.red, event.allHintCount)
    }
  })
}

module.exports = unixFormatter
