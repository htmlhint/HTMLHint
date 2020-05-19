import { EventEmitter } from 'events'

const jsonFormatter = function (formatter: EventEmitter) {
  formatter.on('end', (event) => {
    console.log(JSON.stringify(event.arrAllMessages))
  })
}

module.exports = jsonFormatter
