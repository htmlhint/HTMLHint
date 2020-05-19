const jsonFormatter = function (formatter) {
  formatter.on('end', (event) => {
    console.log(JSON.stringify(event.arrAllMessages))
  })
}

module.exports = jsonFormatter
