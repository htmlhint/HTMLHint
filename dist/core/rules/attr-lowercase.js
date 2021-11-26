"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        const exceptions = Array.isArray(options) ? options : [];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXR0ci1sb3dlcmNhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29yZS9ydWxlcy9hdHRyLWxvd2VyY2FzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQVFBLFNBQVMseUJBQXlCLENBQUMsS0FBYSxFQUFFLFVBQTJCO0lBRTNFLElBQUksVUFBVSxZQUFZLE1BQU0sRUFBRTtRQUNoQyxPQUFPLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQzNCLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRTtZQUN2QyxDQUFDLENBQUMsS0FBSyxDQUFBO0tBQ1Y7SUFHRCxNQUFNLG1CQUFtQixHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUN6QyxNQUFNLGtCQUFrQixHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFBO0lBQzVELE1BQU0sMEJBQTBCLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUE7SUFFcEUsTUFBTSxpQkFBaUIsR0FDckIsbUJBQW1CLEtBQUssR0FBRztRQUMzQixDQUFDLGtCQUFrQixLQUFLLEdBQUc7WUFDekIsQ0FBQywwQkFBMEIsS0FBSyxHQUFHLElBQUksa0JBQWtCLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQTtJQUV2RSxNQUFNLHNCQUFzQixHQUFHLGlCQUFpQixJQUFJLGtCQUFrQixLQUFLLEdBQUcsQ0FBQTtJQUc5RSxJQUFJLGlCQUFpQixFQUFFO1FBQ3JCLE1BQU0sWUFBWSxHQUFHLHNCQUFzQjtZQUN6QyxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ3RELENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBRW5ELE9BQU8sWUFBWSxDQUFBO0tBQ3BCO0lBR0QsT0FBTyxLQUFLLEtBQUssVUFBVSxDQUFBO0FBQzdCLENBQUM7QUFFRCxrQkFBZTtJQUNiLEVBQUUsRUFBRSxnQkFBZ0I7SUFDcEIsV0FBVyxFQUFFLDJDQUEyQztJQUN4RCxJQUFJLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxPQUFPO1FBQzVCLE1BQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFBO1FBRXhELE1BQU0sQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDdkMsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQTtZQUN6QixJQUFJLElBQUksQ0FBQTtZQUNSLE1BQU0sR0FBRyxHQUFHLEtBQUssQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFBO1lBRWhELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQzVDLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUE7Z0JBQ2YsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQTtnQkFFMUIsSUFDRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLHlCQUF5QixDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztvQkFDbkUsUUFBUSxLQUFLLFFBQVEsQ0FBQyxXQUFXLEVBQUUsRUFDbkM7b0JBQ0EsUUFBUSxDQUFDLEtBQUssQ0FDWiwyQkFBMkIsUUFBUSwwQkFBMEIsRUFDN0QsS0FBSyxDQUFDLElBQUksRUFDVixHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFDaEIsSUFBSSxFQUNKLElBQUksQ0FBQyxHQUFHLENBQ1QsQ0FBQTtpQkFDRjthQUNGO1FBQ0gsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0NBQ00sQ0FBQSJ9