const compactFormatter = function (formatter, HTMLHint, options) {
  const nocolor = options.nocolor

  formatter.on('file', (event) => {
    event.messages.forEach((message) => {
      console.log(
        '%s: line %d, col %d, %s - %s (%s)',
        event.file,
        message.line,
        message.col,
        message.type,
        message.message,
        message.rule.id
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

module.exports = compactFormatter
