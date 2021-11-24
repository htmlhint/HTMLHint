"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    id: 'head-script-disabled',
    description: 'The <script> tag cannot be used in a <head> tag.',
    init: function (parser, reporter) {
        var _this = this;
        var reScript = /^(text\/javascript|application\/javascript)$/i;
        var isInHead = false;
        var onTagStart = function (event) {
            var mapAttrs = parser.getMapAttrs(event.attrs);
            var type = mapAttrs.type;
            var tagName = event.tagName.toLowerCase();
            if (tagName === 'head') {
                isInHead = true;
            }
            if (isInHead === true &&
                tagName === 'script' &&
                (!type || reScript.test(type) === true)) {
                reporter.warn('The <script> tag cannot be used in a <head> tag.', event.line, event.col, _this, event.raw);
            }
        };
        var onTagEnd = function (event) {
            if (event.tagName.toLowerCase() === 'head') {
                parser.removeListener('tagstart', onTagStart);
                parser.removeListener('tagend', onTagEnd);
            }
        };
        parser.addListener('tagstart', onTagStart);
        parser.addListener('tagend', onTagEnd);
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZC1zY3JpcHQtZGlzYWJsZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29yZS9ydWxlcy9oZWFkLXNjcmlwdC1kaXNhYmxlZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBLGtCQUFlO0lBQ2IsRUFBRSxFQUFFLHNCQUFzQjtJQUMxQixXQUFXLEVBQUUsa0RBQWtEO0lBQy9ELElBQUksRUFBSixVQUFLLE1BQU0sRUFBRSxRQUFRO1FBQXJCLGlCQXFDQztRQXBDQyxJQUFNLFFBQVEsR0FBRywrQ0FBK0MsQ0FBQTtRQUNoRSxJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUE7UUFFcEIsSUFBTSxVQUFVLEdBQWEsVUFBQyxLQUFLO1lBQ2pDLElBQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFBO1lBQ2hELElBQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUE7WUFDMUIsSUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQTtZQUUzQyxJQUFJLE9BQU8sS0FBSyxNQUFNLEVBQUU7Z0JBQ3RCLFFBQVEsR0FBRyxJQUFJLENBQUE7YUFDaEI7WUFFRCxJQUNFLFFBQVEsS0FBSyxJQUFJO2dCQUNqQixPQUFPLEtBQUssUUFBUTtnQkFDcEIsQ0FBQyxDQUFDLElBQUksSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxFQUN2QztnQkFDQSxRQUFRLENBQUMsSUFBSSxDQUNYLGtEQUFrRCxFQUNsRCxLQUFLLENBQUMsSUFBSSxFQUNWLEtBQUssQ0FBQyxHQUFHLEVBQ1QsS0FBSSxFQUNKLEtBQUssQ0FBQyxHQUFHLENBQ1YsQ0FBQTthQUNGO1FBQ0gsQ0FBQyxDQUFBO1FBRUQsSUFBTSxRQUFRLEdBQWEsVUFBQyxLQUFLO1lBQy9CLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsS0FBSyxNQUFNLEVBQUU7Z0JBQzFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFBO2dCQUM3QyxNQUFNLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQTthQUMxQztRQUNILENBQUMsQ0FBQTtRQUVELE1BQU0sQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFBO1FBQzFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBQ3hDLENBQUM7Q0FDTSxDQUFBIn0=