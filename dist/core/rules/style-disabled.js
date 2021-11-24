"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    id: 'style-disabled',
    description: '<style> tags cannot be used.',
    init: function (parser, reporter) {
        var _this = this;
        parser.addListener('tagstart', function (event) {
            if (event.tagName.toLowerCase() === 'style') {
                reporter.warn('The <style> tag cannot be used.', event.line, event.col, _this, event.raw);
            }
        });
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGUtZGlzYWJsZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29yZS9ydWxlcy9zdHlsZS1kaXNhYmxlZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLGtCQUFlO0lBQ2IsRUFBRSxFQUFFLGdCQUFnQjtJQUNwQixXQUFXLEVBQUUsOEJBQThCO0lBQzNDLElBQUksWUFBQyxNQUFNLEVBQUUsUUFBUTtRQUFyQixpQkFZQztRQVhDLE1BQU0sQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLFVBQUMsS0FBSztZQUNuQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEtBQUssT0FBTyxFQUFFO2dCQUMzQyxRQUFRLENBQUMsSUFBSSxDQUNYLGlDQUFpQyxFQUNqQyxLQUFLLENBQUMsSUFBSSxFQUNWLEtBQUssQ0FBQyxHQUFHLEVBQ1QsS0FBSSxFQUNKLEtBQUssQ0FBQyxHQUFHLENBQ1YsQ0FBQTthQUNGO1FBQ0gsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0NBQ00sQ0FBQSJ9