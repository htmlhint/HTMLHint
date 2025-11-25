import { Hint, ReportType, Rule, Ruleset, DisabledRulesMap } from './types'

export default class Reporter {
  public html: string
  public lines: string[]
  public brLen: number
  public ruleset: Ruleset
  public messages: Hint[]
  private disabledRulesMap: DisabledRulesMap

  public constructor(
    html: string,
    ruleset: Ruleset,
    disabledRulesMap: DisabledRulesMap = {}
  ) {
    this.html = html
    this.lines = html.split(/\r?\n/)
    const match = /\r?\n/.exec(html)

    this.brLen = match !== null ? match[0].length : 0
    this.ruleset = ruleset
    this.messages = []
    this.disabledRulesMap = disabledRulesMap
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
    // Check if rule is disabled for this line
    const lineDisabled = this.disabledRulesMap[line]
    if (lineDisabled) {
      if (lineDisabled.all === true) {
        // All rules disabled for this line
        return
      }
      if (lineDisabled.rules && lineDisabled.rules.has(rule.id)) {
        // This specific rule is disabled for this line
        return
      }
    }

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
        link: `https://htmlhint.com/rules/${rule.id}`,
      } as Rule,
    })
  }
}
