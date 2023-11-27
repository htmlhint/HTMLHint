import { FormatterCallback } from '../formatter'

const jsonFormatter: FormatterCallback = function jsonFormatter(formatter) {
  formatter.on('end', (event) => {
    console.log(JSON.stringify(event.arrAllMessages))
  })
}

export = jsonFormatter
