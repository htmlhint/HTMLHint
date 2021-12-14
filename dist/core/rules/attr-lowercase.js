"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
];
function testAgainstStringOrRegExp(value, comparison) {
    if (comparison instanceof RegExp) {
        return comparison.test(value)
            ? { match: value, pattern: comparison }
            : false;
    }
    const firstComparisonChar = comparison[0];
    const lastComparisonChar = comparison[comparison.length - 1];
    const secondToLastComparisonChar = comparison[comparison.length - 2];
    const comparisonIsRegex = firstComparisonChar === '/' &&
        (lastComparisonChar === '/' ||
            (secondToLastComparisonChar === '/' && lastComparisonChar === 'i'));
    const hasCaseInsensitiveFlag = comparisonIsRegex && lastComparisonChar === 'i';
    if (comparisonIsRegex) {
        const valueMatches = hasCaseInsensitiveFlag
            ? new RegExp(comparison.slice(1, -2), 'i').test(value)
            : new RegExp(comparison.slice(1, -1)).test(value);
        return valueMatches;
    }
    return value === comparison;
}
exports.default = {
    id: 'attr-lowercase',
    description: 'All attribute names must be in lowercase.',
    init(parser, reporter, options) {
        const exceptions = (Array.isArray(options) ? options : []).concat(svgIgnores);
        parser.addListener('tagstart', (event) => {
            const attrs = event.attrs;
            let attr;
            const col = event.col + event.tagName.length + 1;
            for (let i = 0, l = attrs.length; i < l; i++) {
                attr = attrs[i];
                const attrName = attr.name;
                if (!exceptions.find((exp) => testAgainstStringOrRegExp(attrName, exp)) &&
                    attrName !== attrName.toLowerCase()) {
                    reporter.error(`The attribute name of [ ${attrName} ] must be in lowercase.`, event.line, col + attr.index, this, attr.raw);
                }
            }
        });
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXR0ci1sb3dlcmNhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29yZS9ydWxlcy9hdHRyLWxvd2VyY2FzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLE1BQU0sVUFBVSxHQUFHO0lBQ2pCLGNBQWM7SUFDZCxlQUFlO0lBQ2YsZUFBZTtJQUNmLGFBQWE7SUFDYixlQUFlO0lBQ2YsYUFBYTtJQUNiLFVBQVU7SUFDVixVQUFVO0lBQ1YsZUFBZTtJQUNmLG1CQUFtQjtJQUNuQixrQkFBa0I7SUFDbEIsaUJBQWlCO0lBQ2pCLFVBQVU7SUFDViwyQkFBMkI7SUFDM0IsV0FBVztJQUNYLGFBQWE7SUFDYixVQUFVO0lBQ1YsbUJBQW1CO0lBQ25CLGVBQWU7SUFDZixjQUFjO0lBQ2Qsa0JBQWtCO0lBQ2xCLFdBQVc7SUFDWCxZQUFZO0lBQ1osVUFBVTtJQUNWLGNBQWM7SUFDZCxtQkFBbUI7SUFDbkIsY0FBYztJQUNkLGFBQWE7SUFDYixhQUFhO0lBQ2Isa0JBQWtCO0lBQ2xCLFdBQVc7SUFDWCxZQUFZO0lBQ1osUUFBUTtJQUNSLFVBQVU7SUFDVixTQUFTO0lBQ1QsU0FBUztJQUNULFNBQVM7SUFDVCxRQUFRO0lBQ1IsWUFBWTtJQUNaLHFCQUFxQjtJQUNyQixrQkFBa0I7SUFDbEIsY0FBYztJQUNkLFdBQVc7SUFDWCxXQUFXO0lBQ1gsV0FBVztJQUNYLGVBQWU7SUFDZixxQkFBcUI7SUFDckIsZ0JBQWdCO0lBQ2hCLE1BQU07SUFDTixNQUFNO0lBQ04sYUFBYTtJQUNiLFdBQVc7SUFDWCxvQkFBb0I7SUFDcEIsa0JBQWtCO0lBQ2xCLGtCQUFrQjtJQUNsQixrQkFBa0I7SUFDbEIsY0FBYztJQUNkLGFBQWE7SUFDYixjQUFjO0lBQ2QsYUFBYTtJQUNiLGNBQWM7SUFDZCxnQkFBZ0I7SUFDaEIsYUFBYTtJQUNiLFNBQVM7SUFDVCxTQUFTO0lBQ1QsWUFBWTtJQUNaLFNBQVM7SUFDVCxZQUFZO0lBQ1osa0JBQWtC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