let compactFormatter = function (formatter, HTMLHint, options) {
  let nocolor = options.nocolor

  formatter.on('file', function (event) {
    event.messages.forEach(function (message) {
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

  formatter.on('end', function (event) {
    let allHintCount = event.allHintCount
    if (allHintCount > 0) {
      console.log('')
      let message = '%d problems'
      console.log(nocolor ? message : message.red, event.allHintCount)
    }
  })
}

module.exports = compactFormatter
