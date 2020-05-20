import { EventEmitter } from 'events'
import * as glob from 'glob'
import * as path from 'path'
import type { HTMLHint as IHTMLHint } from '../core/core'
// @ts-expect-error
path.parse = path.parse || require('path-parse')

let HTMLHint: typeof IHTMLHint
let options: any

// load formatters
const mapFormatters = loadFormatters()
const arrSupportedFormatters: string[] = []

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

  const mapFormatters: { [name: string]: any } = {}
  arrFiles.forEach((file) => {
    const fileInfo = path.parse(file)
    const formatterPath = path.resolve(__dirname, file)
    mapFormatters[fileInfo.name] = require(formatterPath)
  })

  return mapFormatters
}

export interface Formatter extends EventEmitter {
  getSupported(): typeof arrSupportedFormatters
  init(tmpHTMLHint: typeof IHTMLHint, tmpOptions: { nocolor?: boolean }): void
  setFormat(format: string): void
}

const formatter: Formatter = new EventEmitter() as Formatter

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
