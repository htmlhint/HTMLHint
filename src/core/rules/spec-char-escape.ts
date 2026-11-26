import { Rule } from '../types'

function parseEntityNames(table: string): string[] {
  // The tables can annotate exact spellings after #.
  return table.replace(/#.*$/gm, '').trim().split(/\s+/)
}

// Name subsets adapted from the WHATWG HTML Standard (CC BY 4.0).
// https://html.spec.whatwg.org/multipage/named-characters.html
// Only these names can be decoded without a semicolon.
// cspell:disable
const legacyNames = parseEntityNames(`
AElig AMP Aacute Acirc Agrave Aring Atilde Auml COPY Ccedil ETH Eacute
Ecirc Egrave Euml GT Iacute Icirc Igrave Iuml LT Ntilde Oacute Ocirc
Ograve Oslash Otilde Ouml QUOT REG THORN Uacute Ucirc Ugrave Uuml Yacute
aacute acirc acute aelig agrave amp aring atilde auml brvbar ccedil cedil
cent copy curren deg divide eacute ecirc egrave eth euml frac12 frac14 # codespell:ignore curren
frac34 gt iacute icirc iexcl igrave iquest iuml laquo lt macr micro middot
nbsp not ntilde oacute ocirc ograve ordf ordm oslash otilde ouml para
plusmn pound quot raquo reg sect shy sup1 sup2 sup3 szlig thorn times
uacute ucirc ugrave uml uuml yacute yen yuml
`)

// Only complete names that start with a legacy name can override its match.
const longerNames = parseEntityNames(`
centerdot copysr divideontimes gtcc gtcir gtdot gtlPar gtquest gtrapprox
gtrarr gtrdot gtreqless gtreqqless gtrless gtrsim ltcc ltcir ltdot lthree
ltimes ltlarr ltquest ltrPar ltri ltrie ltrif notin notinE notindot # codespell:ignore notin
notinva notinvb notinvc notni notniva notnivb notnivc parallel timesb
timesbar timesd
`)
// cspell:enable

const legacyPrefix = new RegExp(`^(?:${legacyNames.join('|')})`)
const completeNames = new Set([...legacyNames, ...longerNames])
const rawTextElement =
  /^(?:iframe|noembed|noframes|plaintext|script|style|xmp)$/i

function isUnterminatedReference(reference: string): boolean {
  const terminated = reference.endsWith(';')
  if (reference.startsWith('&#')) {
    return !terminated
  }

  // A complete longer name takes precedence over its legacy prefix.
  const name = reference.slice(1, terminated ? -1 : undefined)
  return legacyPrefix.test(name) && !(terminated && completeNames.has(name))
}

export default {
  id: 'spec-char-escape',
  description: 'Special characters must be escaped.',
  init(parser, reporter) {
    let rawTextTag = ''
    parser.addListener('tagstart', ({ tagName, attrs }) => {
      if (rawTextTag || !rawTextElement.test(tagName)) {
        return
      }

      const name = tagName.toLowerCase()
      const type = attrs.find((attr) => attr.name === 'type')?.value
      // HTMLHint parses AngularJS script templates as HTML.
      if (name === 'script' && type?.includes('text/ng-template')) {
        return
      }

      rawTextTag = name
    })
    parser.addListener('tagend', ({ tagName }) => {
      if (rawTextTag !== 'plaintext' && rawTextTag === tagName.toLowerCase()) {
        rawTextTag = ''
      }
    })

    parser.addListener('text', (event) => {
      const raw = event.raw
      const reSpecChar =
        /[<>]|&(?:#[xX][\dA-Fa-f]+|#\d+|[A-Za-z][A-Za-z0-9]*);?/g
      let match

      while ((match = reSpecChar.exec(raw))) {
        let message = `Special characters must be escaped : [ ${match[0]} ].`
        if (match[0].startsWith('&')) {
          if (rawTextTag || !isUnterminatedReference(match[0])) {
            continue
          }
          message = 'Character references must end with a semicolon.'
        }
        const fixedPos = parser.fixPos(event, match.index)
        reporter.error(message, fixedPos.line, fixedPos.col, this, raw)
      }
    })
  },
} as Rule
