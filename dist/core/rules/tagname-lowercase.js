"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    id: 'tagname-lowercase',
    description: 'All html element names must be in lowercase.',
    init(parser, reporter, options) {
        const exceptions = (Array.isArray(options) ? options : []).concat(svgTagNameIgnores);
        parser.addListener('tagstart,tagend', (event) => {
            const tagName = event.tagName;
            if (!exceptions.find((exp) => testAgainstStringOrRegExp(tagName, exp)) &&
                tagName !== tagName.toLowerCase()) {
                reporter.error(`The html element name of [ ${tagName} ] must be in lowercase.`, event.line, event.col, this, event.raw);
            }
        });
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnbmFtZS1sb3dlcmNhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29yZS9ydWxlcy90YWduYW1lLWxvd2VyY2FzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLE1BQU0saUJBQWlCLEdBQUc7SUFDeEIsZUFBZTtJQUNmLGtCQUFrQjtJQUNsQixVQUFVO0lBQ1YsU0FBUztJQUNULGVBQWU7SUFDZixxQkFBcUI7SUFDckIsYUFBYTtJQUNiLGtCQUFrQjtJQUNsQixtQkFBbUI7SUFDbkIsbUJBQW1CO0lBQ25CLGdCQUFnQjtJQUNoQixjQUFjO0lBQ2QsU0FBUztJQUNULFNBQVM7SUFDVCxTQUFTO0lBQ1QsU0FBUztJQUNULFNBQVM7SUFDVCxnQkFBZ0I7SUFDaEIsU0FBUztJQUNULFNBQVM7SUFDVCxhQUFhO0lBQ2IsY0FBYztJQUNkLFVBQVU7SUFDVixjQUFjO0lBQ2Qsb0JBQW9CO0lBQ3BCLGFBQWE7SUFDYixRQUFRO0lBQ1IsY0FBYztJQUNkLGVBQWU7SUFDZixnQkFBZ0I7SUFDaEIsZ0JBQWdCO0lBQ2hCLFVBQVU7Q0FDWCxDQUFBO0FBUUQsU0FBUyx5QkFBeUIsQ0FBQyxLQUFhLEVBQUUsVUFBMkI7SUFFM0UsSUFBSSxVQUFVLFlBQVksTUFBTSxFQUFFLENBQUM7UUFDakMsT0FBTyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUMzQixDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUU7WUFDdkMsQ0FBQyxDQUFDLEtBQUssQ0FBQTtJQUNYLENBQUM7SUFHRCxNQUFNLG1CQUFtQixHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUN6QyxNQUFNLGtCQUFrQixHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFBO0lBQzVELE1BQU0sMEJBQTBCLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUE7SUFFcEUsTUFBTSxpQkFBaUIsR0FDckIsbUJBQW1CLEtBQUssR0FBRztRQUMzQixDQUFDLGtCQUFrQixLQUFLLEdBQUc7WUFDekIsQ0FBQywwQkFBMEIsS0FBSyxHQUFHLElBQUksa0JBQWtCLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQTtJQUV2RSxNQUFNLHNCQUFzQixHQUFHLGlCQUFpQixJQUFJLGtCQUFrQixLQUFLLEdBQUcsQ0FBQTtJQUc5RSxJQUFJLGlCQUFpQixFQUFFLENBQUM7UUFDdEIsTUFBTSxZQUFZLEdBQUcsc0JBQXNCO1lBQ3pDLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDdEQsQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7UUFFbkQsT0FBTyxZQUFZLENBQUE7SUFDckIsQ0FBQztJQUdELE9BQU8sS0FBSyxLQUFLLFVBQVUsQ0FBQTtBQUM3QixDQUFDO0FBRUQsa0JBQWU7SUFDYixFQUFFLEVBQUUsbUJBQW1CO0lBQ3ZCLFdBQVcsRUFBRSw4Q0FBOEM7SUFDM0QsSUFBSSxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsT0FBTztRQUM1QixNQUFNLFVBQVUsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUMvRCxpQkFBaUIsQ0FDbEIsQ0FBQTtRQUVELE1BQU0sQ0FBQyxXQUFXLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUM5QyxNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFBO1lBQzdCLElBQ0UsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQ2xFLE9BQU8sS0FBSyxPQUFPLENBQUMsV0FBVyxFQUFFLEVBQ2pDLENBQUM7Z0JBQ0QsUUFBUSxDQUFDLEtBQUssQ0FDWiw4QkFBOEIsT0FBTywwQkFBMEIsRUFDL0QsS0FBSyxDQUFDLElBQUksRUFDVixLQUFLLENBQUMsR0FBRyxFQUNULElBQUksRUFDSixLQUFLLENBQUMsR0FBRyxDQUNWLENBQUE7WUFDSCxDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0NBQ00sQ0FBQSJ9