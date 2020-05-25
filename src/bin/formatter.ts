import { EventEmitter } from 'events'
import * as glob from 'glob'
import * as path from 'path'
import type { HTMLHint as IHTMLHint } from '../core/core'
import type { Hint, Ruleset } from '../core/types'
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

export interface FormatterFileEvent {
  file: string
  messages: Hint[]
  time: number
}

export interface FormatterConfigEvent {
  ruleset: Ruleset
  configPath?: string
}

export interface FormatterEndEvent {
  arrAllMessages: {
    file: string
    messages: Hint[]
    time: number
  }[]
  allFileCount: number
  allHintFileCount: number
  allHintCount: number
  time: number
}

export interface Formatter extends EventEmitter {
  getSupported(): typeof arrSupportedFormatters
  init(tmpHTMLHint: typeof IHTMLHint, tmpOptions: { nocolor?: boolean }): void
  setFormat(format: string): void

  emit(event: 'start'): boolean
  on(event: 'start', listener: () => void): this

  emit(event: 'file', arg: FormatterFileEvent): boolean
  on(event: 'file', listener: (event: FormatterFileEvent) => void): this

  emit(event: 'config', arg: FormatterConfigEvent): boolean
  on(event: 'config', listener: (event: FormatterConfigEvent) => void): this

  emit(event: 'end', arg: FormatterEndEvent): boolean
  on(event: 'end', listener: (event: FormatterEndEvent) => void): this
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

export type FormatterCallback = (
  formatter: Formatter,
  HTMLHint: typeof IHTMLHint,
  options: { nocolor?: boolean }
) => void

module.exports = formatter
