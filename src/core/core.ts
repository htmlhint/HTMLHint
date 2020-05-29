import HTMLParser from './htmlparser'
import Reporter from './reporter'
import * as HTMLRules from './rules'
import { Hint, Rule, Ruleset } from './types'

export interface FormatOptions {
  colors?: boolean
  indent?: number
}

class HTMLHintCore {
  public rules: { [id: string]: Rule } = {}
  public defaultRuleset: Ruleset = {
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

  public addRule(rule: Rule) {
    this.rules[rule.id] = rule
  }

  public verify(html: string, ruleset: Ruleset = this.defaultRuleset) {
    if (Object.keys(ruleset).length === 0) {
      ruleset = this.defaultRuleset
    }

    // parse inline ruleset
    html = html.replace(
      /^\s*<!--\s*htmlhint\s+([^\r\n]+?)\s*-->/i,
      (all, strRuleset) => {
        strRuleset.replace(
          /(?:^|,)\s*([^:,]+)\s*(?:\:\s*([^,\s]+))?/g,
          // TODO: this part is a bit wired
          // @ts-expect-error
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
    let rule: Rule

    for (const id in ruleset) {
      rule = rules[id]
      if (rule !== undefined && ruleset[id] !== false) {
        rule.init(parser, reporter, ruleset[id])
      }
    }

    parser.parse(html)

    return reporter.messages
  }

  public format(arrMessages: Hint[], options: FormatOptions = {}) {
    const arrLogs: string[] = []
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
        evidence = `...${evidence}`
        leftCol -= 3
      }
      if (rightCol < evidenceCount) {
        evidence += '...'
      }

      // show evidence
      arrLogs.push(
        `${colors.white + repeatStr(indent)}L${line} |${
          colors.grey
        }${evidence}${colors.reset}`
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
        `${
          colors.white +
          repeatStr(indent) +
          repeatStr(String(line).length + 3 + pointCol)
        }^ ${colors.red}${hint.message} (${hint.rule.id})${colors.reset}`
      )
    })

    return arrLogs
  }
}

// repeat string
function repeatStr(n: number, str?: string) {
  return new Array(n + 1).join(str || ' ')
}

export const HTMLHint = new HTMLHintCore()

Object.keys(HTMLRules).forEach((key) => {
  // TODO: need a fix
  // @ts-expect-error
  HTMLHint.addRule(HTMLRules[key])
})

export { HTMLRules, Reporter, HTMLParser }
