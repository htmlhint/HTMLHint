import { HTMLParser, Reporter } from './core'

export interface Rule {
  id: string
  description: string
  link?: string
  init(parser: HTMLParser, reporter: Reporter, options: string | boolean): void
}

// TODO: not sure about the value `boolean | string`
export type Ruleset = { [ruleId: string]: boolean | string }

export const enum ReportType {
  error = 'error',
  warning = 'warning',
  info = 'info',
}

export interface Hint {
  type: ReportType
  message: string
  raw: string
  evidence: string
  line: number
  col: number
  rule: Rule
}
