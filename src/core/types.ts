import { HTMLParser, Reporter } from './core'

export interface Rule {
  id: string
  description: string
  link?: string
  init(parser: HTMLParser, reporter: Reporter, options: unknown): void
}

export interface Ruleset {
  'tags-check'?: {
    [prop: string]: Record<string, unknown>
  }
  // There may be other unknown rules
  [ruleId: string]: unknown
}

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
