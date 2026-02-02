import { Rule } from '../types'

const svgTagNameIgnores = [
  'animateMotion',
  'animateTransform',
  'clipPath',
  'feBlend',
  'feColorMatrix',
  'feComponentTransfer',
  'feComposite',
  'feConvolveMatrix',
  'feDiffuseLighting',
  'feDisplacementMap',
  'feDistantLight',
  'feDropShadow',
  'feFlood',
  'feFuncA',
  'feFuncB',
  'feFuncG',
  'feFuncR',
  'feGaussianBlur',
  'feImage',
  'feMerge',
  'feMergeNode',
  'feMorphology',
  'feOffset',
  'fePointLight',
  'feSpecularLighting',
  'feSpotLight',
  'feTile',
  'feTurbulence',
  'foreignObject',
  'linearGradient',
  'radialGradient',
  'textPath',
]

/**
 * testAgainstStringOrRegExp
 *
 * @param value string to test
 * @param comparison raw string or regex string
 */
function testAgainstStringOrRegExp(value: string, comparison: string | RegExp) {
  // If it's a RegExp, test directly
  if (comparison instanceof RegExp) {
    return comparison.test(value)
      ? { match: value, pattern: comparison }
      : false
  }

  // Check if it's RegExp in a string
  const firstComparisonChar = comparison[0]
  const lastComparisonChar = comparison[comparison.length - 1]
  const secondToLastComparisonChar = comparison[comparison.length - 2]

  const comparisonIsRegex =
    firstComparisonChar === '/' &&
    (lastComparisonChar === '/' ||
      (secondToLastComparisonChar === '/' && lastComparisonChar === 'i'))

  const hasCaseInsensitiveFlag = comparisonIsRegex && lastComparisonChar === 'i'

  // If so, create a new RegExp from it
  if (comparisonIsRegex) {
    const valueMatches = hasCaseInsensitiveFlag
      ? new RegExp(comparison.slice(1, -2), 'i').test(value)
      : new RegExp(comparison.slice(1, -1)).test(value)

    return valueMatches
  }

  // Otherwise, it's a string. Do a strict comparison
  return value === comparison
}

export default {
  id: 'tagname-lowercase',
  description: 'All html element names must be in lowercase.',
  init(parser, reporter, options) {
    const exceptions = (Array.isArray(options) ? options : []).concat(
      svgTagNameIgnores
    )

    parser.addListener('tagstart,tagend', (event) => {
      const tagName = event.tagName
      if (
        !exceptions.find((exp) => testAgainstStringOrRegExp(tagName, exp)) &&
        tagName !== tagName.toLowerCase()
      ) {
        reporter.error(
          `The html element name of [ ${tagName} ] must be in lowercase.`,
          event.line,
          event.col,
          this,
          event.raw
        )
      }
    })
  },
} as Rule
