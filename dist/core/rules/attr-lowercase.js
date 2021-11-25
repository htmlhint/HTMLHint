"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function testAgainstStringOrRegExp(value, comparison) {
    if (comparison instanceof RegExp) {
        return comparison.test(value)
            ? { match: value, pattern: comparison }
            : false;
    }
    var firstComparisonChar = comparison[0];
    var lastComparisonChar = comparison[comparison.length - 1];
    var secondToLastComparisonChar = comparison[comparison.length - 2];
    var comparisonIsRegex = firstComparisonChar === '/' &&
        (lastComparisonChar === '/' ||
            (secondToLastComparisonChar === '/' && lastComparisonChar === 'i'));
    var hasCaseInsensitiveFlag = comparisonIsRegex && lastComparisonChar === 'i';
    if (comparisonIsRegex) {
        var valueMatches = hasCaseInsensitiveFlag
            ? new RegExp(comparison.slice(1, -2), 'i').test(value)
            : new RegExp(comparison.slice(1, -1)).test(value);
        return valueMatches;
    }
    return value === comparison;
}
exports.default = {
    id: 'attr-lowercase',
    description: 'All attribute names must be in lowercase.',
    init: function (parser, reporter, options) {
        var _this = this;
        var exceptions = Array.isArray(options) ? options : [];
        parser.addListener('tagstart', function (event) {
            var attrs = event.attrs;
            var attr;
            var col = event.col + event.tagName.length + 1;
            var _loop_1 = function (i, l) {
                attr = attrs[i];
                var attrName = attr.name;
                if (!exceptions.find(function (exp) { return testAgainstStringOrRegExp(attrName, exp); }) &&
                    attrName !== attrName.toLowerCase()) {
                    reporter.error("The attribute name of [ ".concat(attrName, " ] must be in lowercase."), event.line, col + attr.index, _this, attr.raw);
                }
            };
            for (var i = 0, l = attrs.length; i < l; i++) {
                _loop_1(i, l);
            }
        });
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXR0ci1sb3dlcmNhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29yZS9ydWxlcy9hdHRyLWxvd2VyY2FzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQVFBLFNBQVMseUJBQXlCLENBQUMsS0FBYSxFQUFFLFVBQTJCO0lBRTNFLElBQUksVUFBVSxZQUFZLE1BQU0sRUFBRTtRQUNoQyxPQUFPLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQzNCLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRTtZQUN2QyxDQUFDLENBQUMsS0FBSyxDQUFBO0tBQ1Y7SUFHRCxJQUFNLG1CQUFtQixHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUN6QyxJQUFNLGtCQUFrQixHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFBO0lBQzVELElBQU0sMEJBQTBCLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUE7SUFFcEUsSUFBTSxpQkFBaUIsR0FDckIsbUJBQW1CLEtBQUssR0FBRztRQUMzQixDQUFDLGtCQUFrQixLQUFLLEdBQUc7WUFDekIsQ0FBQywwQkFBMEIsS0FBSyxHQUFHLElBQUksa0JBQWtCLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQTtJQUV2RSxJQUFNLHNCQUFzQixHQUFHLGlCQUFpQixJQUFJLGtCQUFrQixLQUFLLEdBQUcsQ0FBQTtJQUc5RSxJQUFJLGlCQUFpQixFQUFFO1FBQ3JCLElBQU0sWUFBWSxHQUFHLHNCQUFzQjtZQUN6QyxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ3RELENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBRW5ELE9BQU8sWUFBWSxDQUFBO0tBQ3BCO0lBR0QsT0FBTyxLQUFLLEtBQUssVUFBVSxDQUFBO0FBQzdCLENBQUM7QUFFRCxrQkFBZTtJQUNiLEVBQUUsRUFBRSxnQkFBZ0I7SUFDcEIsV0FBVyxFQUFFLDJDQUEyQztJQUN4RCxJQUFJLFlBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxPQUFPO1FBQTlCLGlCQTBCQztRQXpCQyxJQUFNLFVBQVUsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQTtRQUV4RCxNQUFNLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxVQUFDLEtBQUs7WUFDbkMsSUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQTtZQUN6QixJQUFJLElBQUksQ0FBQTtZQUNSLElBQU0sR0FBRyxHQUFHLEtBQUssQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFBO29DQUV2QyxDQUFDLEVBQU0sQ0FBQztnQkFDZixJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBO2dCQUNmLElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUE7Z0JBRTFCLElBQ0UsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQUMsR0FBRyxJQUFLLE9BQUEseUJBQXlCLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxFQUF4QyxDQUF3QyxDQUFDO29CQUNuRSxRQUFRLEtBQUssUUFBUSxDQUFDLFdBQVcsRUFBRSxFQUNuQztvQkFDQSxRQUFRLENBQUMsS0FBSyxDQUNaLGtDQUEyQixRQUFRLDZCQUEwQixFQUM3RCxLQUFLLENBQUMsSUFBSSxFQUNWLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxFQUNoQixLQUFJLEVBQ0osSUFBSSxDQUFDLEdBQUcsQ0FDVCxDQUFBO2lCQUNGOztZQWZILEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFO3dCQUFuQyxDQUFDLEVBQU0sQ0FBQzthQWdCaEI7UUFDSCxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FDTSxDQUFBIn0=