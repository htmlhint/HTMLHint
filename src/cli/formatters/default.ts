import * as chalk from 'chalk'
import { FormatterCallback } from '../formatter'

export const defaultFormatter: FormatterCallback = function (
  formatter,
  HTMLHint,
  options
) {
  const nocolor = !!options.nocolor

  formatter.on('start', () => {
    console.log('')
  })

  formatter.on('config', (event) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const configPath = event.configPath!
    console.log(
      '   Config loaded: %s',
      nocolor ? configPath : chalk.cyan(configPath)
    )
    console.log('')
  })

  formatter.on('file', (event) => {
    console.log(`   ${chalk.white(event.file)}`)

    const arrLogs = HTMLHint.format(event.messages, {
      colors: !nocolor,
      indent: 6,
    })

    arrLogs.forEach((str) => {
      console.log(str)
    })

    console.log('')
  })

  formatter.on('end', (event) => {
    const allFileCount = event.allFileCount
    const allHintCount = event.allHintCount
    const allHintFileCount = event.allHintFileCount
    const time = event.time
    let message

    if (allHintCount > 0) {
      message = 'Scanned %d files, found %d errors in %d files (%d ms)'
      console.log(
        nocolor ? message : chalk.red(message),
        allFileCount,
        allHintCount,
        allHintFileCount,
        time
      )
    } else {
      message = 'Scanned %d files, no errors found (%d ms).'
      console.log(nocolor ? message : chalk.green(message), allFileCount, time)
    }
  })
}
