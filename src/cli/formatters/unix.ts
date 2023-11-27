import * as chalk from 'chalk'
import { FormatterCallback } from '../formatter'

const unixFormatter: FormatterCallback = function unixFormatter(
  formatter,
  HTMLHint,
  options
) {
  const nocolor = options.nocolor

  const chalkInstance =
    nocolor !== false ? new chalk.Instance({ level: 1 }) : chalk

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
      console.log(
        nocolor ? message : chalkInstance.red(message),
        event.allHintCount
      )
    }
  })
}

export = unixFormatter
