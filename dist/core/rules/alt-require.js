"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    id: 'alt-require',
    description: 'The alt attribute of an <img> element must be present and alt attribute of area[href] and input[type=image] must have a value.',
    init(parser, reporter) {
        parser.addListener('tagstart', (event) => {
            const tagName = event.tagName.toLowerCase();
            const mapAttrs = parser.getMapAttrs(event.attrs);
            const col = event.col + tagName.length + 1;
            let selector;
            if (tagName === 'img' && !('alt' in mapAttrs)) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWx0LXJlcXVpcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29yZS9ydWxlcy9hbHQtcmVxdWlyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLGtCQUFlO0lBQ2IsRUFBRSxFQUFFLGFBQWE7SUFDakIsV0FBVyxFQUNULGdJQUFnSTtJQUNsSSxJQUFJLENBQUMsTUFBTSxFQUFFLFFBQVE7UUFDbkIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUN2QyxNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFBO1lBQzNDLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFBO1lBQ2hELE1BQU0sR0FBRyxHQUFHLEtBQUssQ0FBQyxHQUFHLEdBQUcsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUE7WUFDMUMsSUFBSSxRQUFRLENBQUE7WUFFWixJQUFJLE9BQU8sS0FBSyxLQUFLLElBQUksQ0FBQyxDQUFDLEtBQUssSUFBSSxRQUFRLENBQUMsRUFBRTtnQkFDN0MsUUFBUSxDQUFDLElBQUksQ0FDWCxxREFBcUQsRUFDckQsS0FBSyxDQUFDLElBQUksRUFDVixHQUFHLEVBQ0gsSUFBSSxFQUNKLEtBQUssQ0FBQyxHQUFHLENBQ1YsQ0FBQTthQUNGO2lCQUFNLElBQ0wsQ0FBQyxPQUFPLEtBQUssTUFBTSxJQUFJLE1BQU0sSUFBSSxRQUFRLENBQUM7Z0JBQzFDLENBQUMsT0FBTyxLQUFLLE9BQU8sSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssT0FBTyxDQUFDLEVBQ3JEO2dCQUNBLElBQUksQ0FBQyxDQUFDLEtBQUssSUFBSSxRQUFRLENBQUMsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFO29CQUNsRCxRQUFRLEdBQUcsT0FBTyxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQTtvQkFDbEUsUUFBUSxDQUFDLElBQUksQ0FDWCx3QkFBd0IsUUFBUSxxQkFBcUIsRUFDckQsS0FBSyxDQUFDLElBQUksRUFDVixHQUFHLEVBQ0gsSUFBSSxFQUNKLEtBQUssQ0FBQyxHQUFHLENBQ1YsQ0FBQTtpQkFDRjthQUNGO1FBQ0gsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0NBQ00sQ0FBQSJ9