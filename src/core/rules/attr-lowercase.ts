import { Rule } from '../types'

const svgIgnores = [
  'allowReorder',
  'attributeName',
  'attributeType',
  'autoReverse',
  'baseFrequency',
  'baseProfile',
  'calcMode',
  'clipPath',
  'clipPathUnits',
  'contentScriptType',
  'contentStyleType',
  'diffuseConstant',
  'edgeMode',
  'externalResourcesRequired',
  'filterRes',
  'filterUnits',
  'glyphRef',
  'gradientTransform',
  'gradientUnits',
  'kernelMatrix',
  'kernelUnitLength',
  'keyPoints',
  'keySplines',
  'keyTimes',
  'lengthAdjust',
  'limitingConeAngle',
  'markerHeight',
  'markerUnits',
  'markerWidth',
  'maskContentUnits',
  'maskUnits',
  'numOctaves',
  'onBlur',
  'onChange',
  'onClick',
  'onFocus',
  'onKeyUp',
  'onLoad',
  'pathLength',
  'patternContentUnits',
  'patternTransform',
  'patternUnits',
  'pointsAtX',
  'pointsAtY',
  'pointsAtZ',
  'preserveAlpha',
  'preserveAspectRatio',
  'primitiveUnits',
  'refX',
  'refY',
  'repeatCount',
  'repeatDur',
  'requiredExtensions',
  'requiredFeatures',
  'specularConstant',
  'specularExponent',
  'spreadMethod',
  'startOffset',
  'stdDeviation',
  'stitchTiles',
  'surfaceScale',
  'systemLanguage',
  'tableValues',
  'targetX',
  'targetY',
  'textLength',
  'viewBox',
  'viewTarget',
  'xChannelSelector',
  'yChannelSelector',
  'zoomAndPan',
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
  id: 'attr-lowercase',
  description: 'All attribute names must be in lowercase.',
  init(parser, reporter, options) {
    const exceptions = (Array.isArray(options) ? options : []).concat(
      svgIgnores
    )

    parser.addListener('tagstart', (event) => {
      const attrs = event.attrs
      let attr
      const col = event.col + event.tagName.length + 1

      for (let i = 0, l = attrs.length; i < l; i++) {
        attr = attrs[i]
        const attrName = attr.name

        if (
          !exceptions.find((exp) => testAgainstStringOrRegExp(attrName, exp)) &&
          attrName !== attrName.toLowerCase()
        ) {
          reporter.error(
            `The attribute name of [ ${attrName} ] must be in lowercase.`,
            event.line,
            col + attr.index,
            this,
            attr.raw
          )
        }
      }
    })
  },
} as Rule
