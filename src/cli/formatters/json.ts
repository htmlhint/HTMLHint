import { FormatterCallback } from '../formatter'

export const jsonFormatter: FormatterCallback = function (formatter) {
  formatter.on('end', (event) => {
    console.log(JSON.stringify(event.arrAllMessages))
  })
}
