const jsonFormatter = function (formatter) {
  formatter.on('end', function (event) {
    console.log(JSON.stringify(event.arrAllMessages))
  })
}

module.exports = jsonFormatter
