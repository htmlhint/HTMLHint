const path = require('path')
const events = require('events')
const glob = require('glob')
path.parse = path.parse || require('path-parse')

let HTMLHint
let options

// load formatters
const mapFormatters = loadFormatters()
const arrSupportedFormatters = []

for (const formatterName in mapFormatters) {
  if (formatterName !== 'default') {
    arrSupportedFormatters.push(formatterName)
  }
}

// load all formatters
function loadFormatters() {
  const arrFiles = glob.sync('./formatters/*.js', {
    cwd: __dirname,
    dot: false,
    nodir: true,
    strict: false,
    silent: true,
  })

  const mapFormatters = {}
  arrFiles.forEach(function (file) {
    const fileInfo = path.parse(file)
    const formatterPath = path.resolve(__dirname, file)
    mapFormatters[fileInfo.name] = require(formatterPath)
  })

  return mapFormatters
}

const formatter = new events.EventEmitter()

formatter.getSupported = function () {
  return arrSupportedFormatters
}

formatter.init = function (tmpHTMLHint, tmpOptions) {
  HTMLHint = tmpHTMLHint
  options = tmpOptions
}

formatter.setFormat = function (format) {
  const formatHandel = mapFormatters[format]

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
