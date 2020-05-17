let path = require('path')
let events = require('events')
let glob = require('glob')
path.parse = path.parse || require('path-parse')

let mapFormatters
let arrSupportedFormatters
let HTMLHint
let options

// load formatters
mapFormatters = loadFormatters()
arrSupportedFormatters = []

for (let formatterName in mapFormatters) {
  if (formatterName !== 'default') {
    arrSupportedFormatters.push(formatterName)
  }
}

// load all formatters
function loadFormatters() {
  let arrFiles = glob.sync('./formatters/*.js', {
    cwd: __dirname,
    dot: false,
    nodir: true,
    strict: false,
    silent: true,
  })

  let mapFormatters = {}
  arrFiles.forEach(function (file) {
    let fileInfo = path.parse(file)
    let formatterPath = path.resolve(__dirname, file)
    mapFormatters[fileInfo.name] = require(formatterPath)
  })

  return mapFormatters
}

let formatter = new events.EventEmitter()

formatter.getSupported = function () {
  return arrSupportedFormatters
}

formatter.init = function (tmpHTMLHint, tmpOptions) {
  HTMLHint = tmpHTMLHint
  options = tmpOptions
}

formatter.setFormat = function (format) {
  let formatHandel = mapFormatters[format]

  if (formatHandel === undefined) {
    console.log(
      'No supported formatter, supported formatters: %s'.red,
      arrSupportedFormatters.join(', ')
    )
    process.exit(1)
  } else {
    formatHandel(formatter, HTMLHint, options)
  }
}

module.exports = formatter
