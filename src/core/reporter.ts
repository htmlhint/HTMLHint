import { Hint, ReportType, Rule, Ruleset } from './types'

type ReportCallback = (
  message: string,
  line: number,
  col: number,
  rule: Rule,
  raw: string
) => void

export default class Reporter {
  public html: string
  public lines: string[]
  public brLen: number
  public ruleset: Ruleset
  public messages: Hint[]

  public error: ReportCallback
  public warn: ReportCallback
  public info: ReportCallback

  public constructor(html: string, ruleset: Ruleset) {
    this.html = html
    this.lines = html.split(/\r?\n/)
    const match = html.match(/\r?\n/)

    this.brLen = match !== null ? match[0].length : 0
    this.ruleset = ruleset
    this.messages = []

    // TODO: we should rewrite this and simply use function members
    // @ts-expect-error
    this.error = this.report.bind(this, 'error')
    // @ts-expect-error
    this.warn = this.report.bind(this, 'warning')
    // @ts-expect-error
    this.info = this.report.bind(this, 'info')
  }

  public report(
    type: ReportType,
    message: string,
    line: number,
    col: number,
    rule: Rule,
    raw: string
  ) {
    const lines = this.lines
    const brLen = this.brLen
    let evidence: string
    let evidenceLen: number

    for (let i = line - 1, lineCount = lines.length; i < lineCount; i++) {
      evidence = lines[i]
      evidenceLen = evidence.length
      if (col > evidenceLen && line < lineCount) {
        line++
        col -= evidenceLen
        if (col !== 1) {
          col -= brLen
        }
      } else {
        break
      }
    }

    this.messages.push({
      type: type,
      message: message,
      raw: raw,
      // @ts-expect-error
      evidence: evidence,
      line: line,
      col: col,
      rule: {
        id: rule.id,
        description: rule.description,
        link: `https://github.com/thedaviddias/HTMLHint/wiki/${rule.id}`,
      } as Rule,
    })
  }
}
