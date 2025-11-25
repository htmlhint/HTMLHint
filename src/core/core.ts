import HTMLParser from './htmlparser'
import Reporter from './reporter'
import * as HTMLRules from './rules'
import { Hint, Rule, Ruleset, DisabledRulesMap } from './types'

export interface FormatOptions {
  colors?: boolean
  indent?: number
}

class HTMLHintCore {
  public rules: { [id: string]: Rule } = {}
  public readonly defaultRuleset: Ruleset = {
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
      (all, strRuleset: string) => {
        // For example:
        // all is '<!-- htmlhint alt-require:true-->'
        // strRuleset is 'alt-require:true'
        strRuleset.replace(
          /(?:^|,)\s*([^:,]+)\s*(?:\:\s*([^,\s]+))?/g,
          (all, ruleId: string, value: string | undefined) => {
            // For example:
            // all is 'alt-require:true'
            // ruleId is 'alt-require'
            // value is 'true'

            ruleset[ruleId] =
              value !== undefined && value.length > 0 ? JSON.parse(value) : true

            return ''
          }
        )

        return ''
      }
    )

    // Parse disable/enable comments
    const disabledRulesMap = this.parseDisableComments(html)

    const parser = new HTMLParser()
    const reporter = new Reporter(html, ruleset, disabledRulesMap)

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

  private parseDisableComments(html: string): DisabledRulesMap {
    const disabledRulesMap: DisabledRulesMap = {}
    const lines = html.split(/\r?\n/)
    const regComment =
      /<!--\s*htmlhint-(disable|enable)(?:-next-line)?(?:\s+([^\r\n]+?))?\s*-->/gi

    // Find all disable/enable comments and their positions
    const comments: Array<{
      line: number
      command: string
      isNextLine: boolean
      rulesStr?: string
    }> = []

    let match: RegExpExecArray | null
    while ((match = regComment.exec(html)) !== null) {
      // Calculate line number from match position
      const beforeMatch = html.substring(0, match.index)
      const lineNumber = beforeMatch.split(/\r?\n/).length
      const command = match[1].toLowerCase()
      const isNextLine = match[0].includes('-next-line')
      const rulesStr = match[2]?.trim()

      comments.push({
        line: lineNumber,
        command,
        isNextLine,
        rulesStr,
      })
    }

    // Process comments in order
    let currentDisabledRules: Set<string> | null = null
    let isAllDisabled = false

    for (let i = 0; i < lines.length; i++) {
      const line = i + 1

      // Check if there's a comment on this line
      const commentOnLine = comments.find((c) => c.line === line)
      if (commentOnLine) {
        if (commentOnLine.command === 'disable') {
          if (commentOnLine.isNextLine) {
            // htmlhint-disable-next-line
            const nextLine = line + 1
            if (commentOnLine.rulesStr) {
              // Specific rules disabled
              const rules = commentOnLine.rulesStr
                .split(/\s+/)
                .filter((r) => r.length > 0)
              if (!disabledRulesMap[nextLine]) {
                disabledRulesMap[nextLine] = {}
              }
              if (!disabledRulesMap[nextLine].rules) {
                disabledRulesMap[nextLine].rules = new Set()
              }
              rules.forEach((r) => disabledRulesMap[nextLine].rules!.add(r))
            } else {
              // All rules disabled
              if (!disabledRulesMap[nextLine]) {
                disabledRulesMap[nextLine] = {}
              }
              disabledRulesMap[nextLine].all = true
            }
          } else {
            // htmlhint-disable
            if (commentOnLine.rulesStr) {
              // Specific rules disabled
              const rules = commentOnLine.rulesStr
                .split(/\s+/)
                .filter((r) => r.length > 0)
              currentDisabledRules = new Set(rules)
              isAllDisabled = false
            } else {
              // All rules disabled
              currentDisabledRules = null
              isAllDisabled = true
            }
          }
        } else if (commentOnLine.command === 'enable') {
          // htmlhint-enable
          currentDisabledRules = null
          isAllDisabled = false
        }
      }

      // Apply current disable state to this line (if not already set by next-line)
      if (currentDisabledRules !== null || isAllDisabled) {
        if (!disabledRulesMap[line]) {
          disabledRulesMap[line] = {}
        }
        // Don't override if already set by next-line comment
        if (isAllDisabled && disabledRulesMap[line].all !== true) {
          disabledRulesMap[line].all = true
        } else if (currentDisabledRules) {
          if (!disabledRulesMap[line].rules) {
            disabledRulesMap[line].rules = new Set()
          }
          currentDisabledRules.forEach((r) =>
            disabledRulesMap[line].rules!.add(r)
          )
        }
      }
    }

    return disabledRulesMap
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

Object.values(HTMLRules).forEach((rule) => {
  HTMLHint.addRule(rule)
})

export { HTMLRules, Reporter, HTMLParser }
