let defaultFormatter = function (formatter, HTMLHint, options) {
  let nocolor = options.nocolor

  formatter.on('start', function () {
    console.log('')
  })

  formatter.on('config', function (event) {
    let configPath = event.configPath
    console.log('   Config loaded: %s', nocolor ? configPath : configPath.cyan)
    console.log('')
  })

  formatter.on('file', function (event) {
    console.log('   ' + event.file.white)

    let arrLogs = HTMLHint.format(event.messages, {
      colors: nocolor ? false : true,
      indent: 6,
    })

    arrLogs.forEach(function (str) {
      console.log(str)
    })

    console.log('')
  })

  formatter.on('end', function (event) {
    let allFileCount = event.allFileCount
    let allHintCount = event.allHintCount
    let allHintFileCount = event.allHintFileCount
    let time = event.time
    let message

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
