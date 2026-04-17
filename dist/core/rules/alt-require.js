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
            const col = event.col + tagName.length + 1;
            let selector;
            if (tagName === 'img' &&
                !('alt' in mapAttrs) &&
                ((_a = mapAttrs['aria-hidden']) === null || _a === void 0 ? void 0 : _a.trim().toLowerCase()) !== 'true') {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWx0LXJlcXVpcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29yZS9ydWxlcy9hbHQtcmVxdWlyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLGtCQUFlO0lBQ2IsRUFBRSxFQUFFLGFBQWE7SUFDakIsV0FBVyxFQUNULGdJQUFnSTtJQUNsSSxJQUFJLENBQUMsTUFBTSxFQUFFLFFBQVE7UUFDbkIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTs7WUFDdkMsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQTtZQUMzQyxNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTtZQUNoRCxNQUFNLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFBO1lBQzFDLElBQUksUUFBUSxDQUFBO1lBRVosSUFDRSxPQUFPLEtBQUssS0FBSztnQkFDakIsQ0FBQyxDQUFDLEtBQUssSUFBSSxRQUFRLENBQUM7Z0JBQ3BCLENBQUEsTUFBQSxRQUFRLENBQUMsYUFBYSxDQUFDLDBDQUFFLElBQUksR0FBRyxXQUFXLEVBQUUsTUFBSyxNQUFNLEVBQ3hELENBQUM7Z0JBQ0QsUUFBUSxDQUFDLElBQUksQ0FDWCxxREFBcUQsRUFDckQsS0FBSyxDQUFDLElBQUksRUFDVixHQUFHLEVBQ0gsSUFBSSxFQUNKLEtBQUssQ0FBQyxHQUFHLENBQ1YsQ0FBQTtZQUNILENBQUM7aUJBQU0sSUFDTCxDQUFDLE9BQU8sS0FBSyxNQUFNLElBQUksTUFBTSxJQUFJLFFBQVEsQ0FBQztnQkFDMUMsQ0FBQyxPQUFPLEtBQUssT0FBTyxJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxPQUFPLENBQUMsRUFDckQsQ0FBQztnQkFDRCxJQUFJLENBQUMsQ0FBQyxLQUFLLElBQUksUUFBUSxDQUFDLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDO29CQUNuRCxRQUFRLEdBQUcsT0FBTyxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQTtvQkFDbEUsUUFBUSxDQUFDLElBQUksQ0FDWCx3QkFBd0IsUUFBUSxxQkFBcUIsRUFDckQsS0FBSyxDQUFDLElBQUksRUFDVixHQUFHLEVBQ0gsSUFBSSxFQUNKLEtBQUssQ0FBQyxHQUFHLENBQ1YsQ0FBQTtnQkFDSCxDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNNLENBQUEifQ==