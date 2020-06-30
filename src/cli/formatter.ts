import * as chalk from 'chalk'
import { EventEmitter } from 'events'
import { sync as globSync } from 'glob'
import { parse, resolve } from 'path'
import type { HTMLHint as IHTMLHint } from '../core/core'
import type { Hint, Ruleset } from '../core/types'

export type FormatterCallback = (
  formatter: Formatter,
  HTMLHint: typeof IHTMLHint,
  options: { nocolor?: boolean }
) => void

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
  const arrFiles = globSync('./formatters/*.js', {
    cwd: __dirname,
    dot: false,
    nodir: true,
    strict: false,
    silent: true,
  })

  return arrFiles.reduce<{ [name: string]: FormatterCallback }>((map, file) => {
    const fileInfo = parse(file)
    const formatterPath = resolve(__dirname, file)
    const formatterModule:
      | { [name: string]: FormatterCallback | undefined }
      | undefined = require(formatterPath)
    const formatterName = `${fileInfo.name}Formatter`
    const formatterFn = formatterModule?.[formatterName]
    if (formatterFn) {
      map[fileInfo.name] = formatterFn
    }
    return map
  }, {})
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

export class Formatter extends EventEmitter {
  private HTMLHint!: typeof IHTMLHint
  private options!: { nocolor?: boolean }

  public getSupported(): string[] {
    return arrSupportedFormatters
  }

  public init(
    tmpHTMLHint: typeof IHTMLHint,
    tmpOptions: { nocolor?: boolean }
  ): void {
    this.HTMLHint = tmpHTMLHint
    this.options = tmpOptions
  }

  public setFormat(format: string): void {
    const formatHandel = mapFormatters[format]

    if (formatHandel === undefined) {
      console.log(
        chalk.red('No supported formatter, supported formatters: %s'),
        arrSupportedFormatters.join(', ')
      )
      process.exit(1)
    } else {
      formatHandel(formatter, this.HTMLHint, this.options)
    }
  }

  public emit(event: 'start'): boolean
  public emit(event: 'file', arg: FormatterFileEvent): boolean
  public emit(event: 'config', arg: FormatterConfigEvent): boolean
  public emit(event: 'end', arg: FormatterEndEvent): boolean
  public emit(
    event: string,
    arg?: FormatterFileEvent | FormatterConfigEvent | FormatterEndEvent
  ): boolean {
    return super.emit(event, arg)
  }

  public on(event: 'start', listener: () => void): this
  public on(event: 'file', listener: (event: FormatterFileEvent) => void): this
  public on(
    event: 'config',
    listener: (event: FormatterConfigEvent) => void
  ): this
  public on(event: 'end', listener: (event: FormatterEndEvent) => void): this
  public on(
    event: string,
    listener:
      | (() => void)
      | ((event: FormatterFileEvent) => void)
      | ((event: FormatterConfigEvent) => void)
      | ((event: FormatterEndEvent) => void)
  ): this {
    return super.on(event, listener)
  }
}

export const formatter: Formatter = new Formatter()
