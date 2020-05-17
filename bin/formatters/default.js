var defaultFormatter = function (formatter, HTMLHint, options) {
  var nocolor = options.nocolor

  formatter.on('start', () => {
    console.log('')
  })

  formatter.on('config', (event) => {
    var configPath = event.configPath
    console.log('   Config loaded: %s', nocolor ? configPath : configPath.cyan)
    console.log('')
  })

  formatter.on('file', (event) => {
    console.log('   ' + event.file.white)

    var arrLogs = HTMLHint.format(event.messages, {
      colors: nocolor ? false : true,
      indent: 6,
    })

    arrLogs.forEach((str) => {
      console.log(str)
    })

    console.log('')
  })

  formatter.on('end', (event) => {
    var allFileCount = event.allFileCount
    var allHintCount = event.allHintCount
    var allHintFileCount = event.allHintFileCount
    var time = event.time
    var message

    if (allHintCount > 0) {
      message = 'Scanned %d files, found %d errors in %d files (%d ms)'
      console.log(
        nocolor ? message : message.red,
        allFileCount,
        allHintCount,
        allHintFileCount,
        time
      )
    } else {
      message = 'Scanned %d files, no errors found (%d ms).'
      console.log(nocolor ? message : message.green, allFileCount, time)
    }
  })
}

module.exports = defaultFormatter
