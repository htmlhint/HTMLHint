import { Hint, ReportType, Rule, Ruleset } from './types'

export default class Reporter {
  public html: string
  public lines: string[]
  public brLen: number
  public ruleset: Ruleset
  public messages: Hint[]

  public constructor(html: string, ruleset: Ruleset) {
    this.html = html
    this.lines = html.split(/\r?\n/)
    const match = html.match(/\r?\n/)

    this.brLen = match !== null ? match[0].length : 0
    this.ruleset = ruleset
    this.messages = []
  }

  public info(
    message: string,
    line: number,
    col: number,
    rule: Rule,
    raw: string
  ): void {
    this.report(ReportType.info, message, line, col, rule, raw)
  }

  public warn(
    message: string,
    line: number,
    col: number,
    rule: Rule,
    raw: string
  ): void {
    this.report(ReportType.warning, message, line, col, rule, raw)
  }

  public error(
    message: string,
    line: number,
    col: number,
    rule: Rule,
    raw: string
  ): void {
    this.report(ReportType.error, message, line, col, rule, raw)
  }

  private report(
    type: ReportType,
    message: string,
    line: number,
    col: number,
    rule: Rule,
    raw: string
  ) {
    const lines = this.lines
    const brLen = this.brLen
    let evidence = ''
    let evidenceLen = 0

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
