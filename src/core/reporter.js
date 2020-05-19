class Reporter {
  constructor(html, ruleset) {
    this.html = html
    this.lines = html.split(/\r?\n/)
    const match = html.match(/\r?\n/)

    this.brLen = match !== null ? match[0].length : 0
    this.ruleset = ruleset
    this.messages = []

    this.error = this.report.bind(this, 'error')
    this.warn = this.report.bind(this, 'warning')
    this.info = this.report.bind(this, 'info')
  }

  report(type, message, line, col, rule, raw) {
    const lines = this.lines
    const brLen = this.brLen
    let evidence
    let evidenceLen

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
      },
    })
  }
}

export default Reporter
