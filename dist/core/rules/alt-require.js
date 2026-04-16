"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    id: 'alt-require',
    description: 'The alt attribute of an <img> element must be present and alt attribute of area[href] and input[type=image] must have a value.',
    init(parser, reporter) {
        parser.addListener('tagstart', (event) => {
            var _a;
            const tagName = event.tagName.toLowerCase();
            const mapAttrs = parser.getMapAttrs(event.attrs);
            const isAriaHidden = ((_a = mapAttrs['aria-hidden']) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === 'true';
            const col = event.col + tagName.length + 1;
            let selector;
            if (tagName === 'img' && !('alt' in mapAttrs) && !isAriaHidden) {
                reporter.warn('An alt attribute must be present on <img> elements.', event.line, col, this, event.raw);
            }
            else if ((tagName === 'area' && 'href' in mapAttrs) ||
                (tagName === 'input' && mapAttrs['type'] === 'image')) {
                if (!('alt' in mapAttrs) || mapAttrs['alt'] === '') {
                    selector = tagName === 'area' ? 'area[href]' : 'input[type=image]';
                    reporter.warn(`The alt attribute of ${selector} must have a value.`, event.line, col, this, event.raw);
                }
            }
        });
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWx0LXJlcXVpcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29yZS9ydWxlcy9hbHQtcmVxdWlyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLGtCQUFlO0lBQ2IsRUFBRSxFQUFFLGFBQWE7SUFDakIsV0FBVyxFQUNULGdJQUFnSTtJQUNsSSxJQUFJLENBQUMsTUFBTSxFQUFFLFFBQVE7UUFDbkIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTs7WUFDdkMsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQTtZQUMzQyxNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTtZQUNoRCxNQUFNLFlBQVksR0FBRyxDQUFBLE1BQUEsUUFBUSxDQUFDLGFBQWEsQ0FBQywwQ0FBRSxXQUFXLEVBQUUsTUFBSyxNQUFNLENBQUE7WUFDdEUsTUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUcsR0FBRyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQTtZQUMxQyxJQUFJLFFBQVEsQ0FBQTtZQUVaLElBQUksT0FBTyxLQUFLLEtBQUssSUFBSSxDQUFDLENBQUMsS0FBSyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7Z0JBQy9ELFFBQVEsQ0FBQyxJQUFJLENBQ1gscURBQXFELEVBQ3JELEtBQUssQ0FBQyxJQUFJLEVBQ1YsR0FBRyxFQUNILElBQUksRUFDSixLQUFLLENBQUMsR0FBRyxDQUNWLENBQUE7WUFDSCxDQUFDO2lCQUFNLElBQ0wsQ0FBQyxPQUFPLEtBQUssTUFBTSxJQUFJLE1BQU0sSUFBSSxRQUFRLENBQUM7Z0JBQzFDLENBQUMsT0FBTyxLQUFLLE9BQU8sSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssT0FBTyxDQUFDLEVBQ3JELENBQUM7Z0JBQ0QsSUFBSSxDQUFDLENBQUMsS0FBSyxJQUFJLFFBQVEsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQztvQkFDbkQsUUFBUSxHQUFHLE9BQU8sS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsbUJBQW1CLENBQUE7b0JBQ2xFLFFBQVEsQ0FBQyxJQUFJLENBQ1gsd0JBQXdCLFFBQVEscUJBQXFCLEVBQ3JELEtBQUssQ0FBQyxJQUFJLEVBQ1YsR0FBRyxFQUNILElBQUksRUFDSixLQUFLLENBQUMsR0FBRyxDQUNWLENBQUE7Z0JBQ0gsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FDTSxDQUFBIn0=