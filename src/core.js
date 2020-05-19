import HTMLParser from './htmlparser'
import Reporter from './reporter'
import * as HTMLRules from './rules'

class HTMLHintCore {
  constructor() {
    this.rules = {}
    this.defaultRuleset = {
      'tagname-lowercase': true,
      'attr-lowercase': true,
      'attr-value-double-quotes': true,
      'doctype-first': true,
      'tag-pair': true,
      'spec-char-escape': true,
      'id-unique': true,
      'src-not-empty': true,
      'attr-no-duplication': true,
      'title-require': true,
    }
  }

  addRule(rule) {
    this.rules[rule.id] = rule
  }

  verify(html, ruleset) {
    if (ruleset === undefined || Object.keys(ruleset).length === 0) {
      ruleset = this.defaultRuleset
    }

    // parse inline ruleset
    html = html.replace(
      /^\s*<!--\s*htmlhint\s+([^\r\n]+?)\s*-->/i,
      (all, strRuleset) => {
        if (ruleset === undefined) {
          ruleset = {}
        }

        strRuleset.replace(
          // eslint-disable-next-line no-useless-escape
          /(?:^|,)\s*([^:,]+)\s*(?:\:\s*([^,\s]+))?/g,
          (all, key, value) => {
            if (value === 'false') {
              value = false
            } else if (value === 'true') {
              value = true
            }
            ruleset[key] = value === undefined ? true : value
          }
        )

        return ''
      }
    )

    const parser = new HTMLParser()
    const reporter = new Reporter(html, ruleset)

    const rules = this.rules
    let rule

    for (const id in ruleset) {
      rule = rules[id]
      if (rule !== undefined && ruleset[id] !== false) {
        rule.init(parser, reporter, ruleset[id])
      }
    }

    parser.parse(html)

    return reporter.messages
  }

  format(arrMessages, options) {
    options = options || {}
    const arrLogs = []
    const colors = {
      white: '',
      grey: '',
      red: '',
      reset: '',
    }

    if (options.colors) {
      colors.white = '\x1b[37m'
      colors.grey = '\x1b[90m'
      colors.red = '\x1b[31m'
      colors.reset = '\x1b[39m'
    }

    const indent = options.indent || 0

    arrMessages.forEach((hint) => {
      const leftWindow = 40
      const rightWindow = leftWindow + 20
      let evidence = hint.evidence
      const line = hint.line
      const col = hint.col
      const evidenceCount = evidence.length
      let leftCol = col > leftWindow + 1 ? col - leftWindow : 1
      let rightCol =
        evidence.length > col + rightWindow ? col + rightWindow : evidenceCount

      if (col < leftWindow + 1) {
        rightCol += leftWindow - col + 1
      }

      evidence = evidence.replace(/\t/g, ' ').substring(leftCol - 1, rightCol)

      // add ...
      if (leftCol > 1) {
        evidence = '...' + evidence
        leftCol -= 3
      }
      if (rightCol < evidenceCount) {
        evidence += '...'
      }

      // show evidence
      arrLogs.push(
        colors.white +
          repeatStr(indent) +
          'L' +
          line +
          ' |' +
          colors.grey +
          evidence +
          colors.reset
      )

      // show pointer & message
      let pointCol = col - leftCol
      // add double byte character
      // eslint-disable-next-line no-control-regex
      const match = evidence.substring(0, pointCol).match(/[^\u0000-\u00ff]/g)
      if (match !== null) {
        pointCol += match.length
      }

      arrLogs.push(
        colors.white +
          repeatStr(indent) +
          repeatStr(String(line).length + 3 + pointCol) +
          '^ ' +
          colors.red +
          hint.message +
          ' (' +
          hint.rule.id +
          ')' +
          colors.reset
      )
    })

    return arrLogs
  }
}

// repeat string
function repeatStr(n, str) {
  return new Array(n + 1).join(str || ' ')
}

const HTMLHint = new HTMLHintCore()

Object.keys(HTMLRules).forEach((key) => {
  HTMLHint.addRule(HTMLRules[key])
})

export { HTMLRules, Reporter, HTMLParser, HTMLHint }
