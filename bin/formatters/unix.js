var unixFormatter = function (formatter, HTMLHint, options) {
  var nocolor = options.nocolor
  formatter.on('file', (event) => {
    event.messages.forEach((message) => {
      console.log(
        [
          event.file,
          message.line,
          message.col,
          ' ' +
            message.message +
            ' [' +
            message.type +
            '/' +
            message.rule.id +
            ']',
        ].join(':')
      )
    })
  })

  formatter.on('end', (event) => {
    var allHintCount = event.allHintCount
    if (allHintCount > 0) {
      console.log('')
      var message = '%d problems'
      console.log(nocolor ? message : message.red, event.allHintCount)
    }
  })
}

module.exports = unixFormatter
