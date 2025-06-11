"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    id: 'head-script-disabled',
    description: 'The <script> tag cannot be used in a <head> tag.',
    init(parser, reporter) {
        const reScript = /^(text\/javascript|application\/javascript)$/i;
        let isInHead = false;
        const onTagStart = (event) => {
            const mapAttrs = parser.getMapAttrs(event.attrs);
            const type = mapAttrs.type;
            const tagName = event.tagName.toLowerCase();
            if (tagName === 'head') {
                isInHead = true;
            }
            if (isInHead === true &&
                tagName === 'script' &&
                (!type || reScript.test(type) === true)) {
                reporter.warn('The <script> tag cannot be used in a <head> tag.', event.line, event.col, this, event.raw);
            }
        };
        const onTagEnd = (event) => {
            if (event.tagName.toLowerCase() === 'head') {
                parser.removeListener('tagstart', onTagStart);
                parser.removeListener('tagend', onTagEnd);
            }
        };
        parser.addListener('tagstart', onTagStart);
        parser.addListener('tagend', onTagEnd);
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZC1zY3JpcHQtZGlzYWJsZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29yZS9ydWxlcy9oZWFkLXNjcmlwdC1kaXNhYmxlZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBLGtCQUFlO0lBQ2IsRUFBRSxFQUFFLHNCQUFzQjtJQUMxQixXQUFXLEVBQUUsa0RBQWtEO0lBQy9ELElBQUksQ0FBQyxNQUFNLEVBQUUsUUFBUTtRQUNuQixNQUFNLFFBQVEsR0FBRywrQ0FBK0MsQ0FBQTtRQUNoRSxJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUE7UUFFcEIsTUFBTSxVQUFVLEdBQWEsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNyQyxNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTtZQUNoRCxNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFBO1lBQzFCLE1BQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUE7WUFFM0MsSUFBSSxPQUFPLEtBQUssTUFBTSxFQUFFLENBQUM7Z0JBQ3ZCLFFBQVEsR0FBRyxJQUFJLENBQUE7WUFDakIsQ0FBQztZQUVELElBQ0UsUUFBUSxLQUFLLElBQUk7Z0JBQ2pCLE9BQU8sS0FBSyxRQUFRO2dCQUNwQixDQUFDLENBQUMsSUFBSSxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLEVBQ3ZDLENBQUM7Z0JBQ0QsUUFBUSxDQUFDLElBQUksQ0FDWCxrREFBa0QsRUFDbEQsS0FBSyxDQUFDLElBQUksRUFDVixLQUFLLENBQUMsR0FBRyxFQUNULElBQUksRUFDSixLQUFLLENBQUMsR0FBRyxDQUNWLENBQUE7WUFDSCxDQUFDO1FBQ0gsQ0FBQyxDQUFBO1FBRUQsTUFBTSxRQUFRLEdBQWEsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNuQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEtBQUssTUFBTSxFQUFFLENBQUM7Z0JBQzNDLE1BQU0sQ0FBQyxjQUFjLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFBO2dCQUM3QyxNQUFNLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQTtZQUMzQyxDQUFDO1FBQ0gsQ0FBQyxDQUFBO1FBRUQsTUFBTSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUE7UUFDMUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFDeEMsQ0FBQztDQUNNLENBQUEifQ==