import { HTMLParser } from './core'
import { ReportMessageCallback } from './reporter'

export interface Rule {
  id: string
  description: string
  link?: string
  init(
    parser: HTMLParser,
    reportMessageCallback: ReportMessageCallback,
    options: unknown
  ): void
}

export type RuleSeverity = 'off' | 'warn' | 'error'

export function isRuleSeverity(value: unknown): value is RuleSeverity {
  if (typeof value !== 'string') {
    return false
  }
  switch (value) {
    case 'off':
    case 'warn':
    case 'error':
      return true
    default:
      return false
  }
}

export type RuleConfig<Options = Record<string, unknown>> =
  | RuleSeverity
  | [RuleSeverity, Options | undefined]

export interface BaseRuleset {
  'alt-require'?: RuleConfig<never>
  'attr-lowercase'?: RuleConfig<{ exceptions: Array<string | RegExp> }>
  'attr-no-duplication'?: RuleConfig<never>
  'attr-no-unnecessary-whitespace'?: RuleConfig<{ exceptions: string[] }>
  'attr-sorted'?: RuleConfig<never>
  'attr-unsafe-chars'?: RuleConfig<never>
  'attr-value-double-quotes'?: RuleConfig<never>
  'attr-value-not-empty'?: RuleConfig<never>
  'attr-value-single-quotes'?: RuleConfig<never>
  'attr-whitespace'?: RuleConfig<{ exceptions: string[] }>
  'doctype-first'?: RuleConfig<never>
  'doctype-html5'?: RuleConfig<never>
  'head-script-disabled'?: RuleConfig<never>
  'href-abs-or-rel'?: RuleConfig<{ mode: 'absolute' | 'relative' }>
  'id-class-ad-disabled'?: RuleConfig<never>
  'id-class-value'?: RuleConfig<
    { mode: 'underline' | 'dash' | 'hump' } | { regId: RegExp; message: string }
  >
  'id-unique'?: RuleConfig<never>
  'inline-script-disabled'?: RuleConfig<never>
  'inline-style-disabled'?: RuleConfig<never>
  'input-requires-label'?: RuleConfig<never>
  'script-disabled'?: RuleConfig<never>
  'space-tab-mixed-disabled'?: RuleConfig<
    { mode: 'tab' } | { mode: 'space'; size?: number }
  >
  'spec-char-escape'?: RuleConfig<never>
  'src-not-empty'?: RuleConfig<never>
  'style-disabled'?: RuleConfig<never>
  'tag-pair'?: RuleConfig<never>
  'tag-self-close'?: RuleConfig<never>
  'tagname-lowercase'?: RuleConfig<{ exceptions: string[] }>
  'tagname-specialchars'?: RuleConfig<never>
  'tags-check'?: RuleConfig<{
    [tagName: string]: {
      selfclosing?: boolean
      redundantAttrs?: string[]
      attrsRequired?: string[]
      attrsOptional?: string[][]
    }
  }>
  'title-require'?: RuleConfig<never>
}

export interface CustomRuleset {
  [ruleId: string]: RuleConfig<unknown>
}

export type Ruleset = BaseRuleset & CustomRuleset

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
