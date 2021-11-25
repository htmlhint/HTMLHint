"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    id: 'tagname-specialchars',
    description: 'All special characters must be escaped.',
    init: function (parser, reporter) {
        var _this = this;
        var specialchars = /[^a-zA-Z0-9\-:_]/;
        parser.addListener('tagstart,tagend', function (event) {
            var tagName = event.tagName;
            if (specialchars.test(tagName)) {
                reporter.error("The html element name of [ ".concat(tagName, " ] contains special character."), event.line, event.col, _this, event.raw);
            }
        });
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnbmFtZS1zcGVjaWFsY2hhcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29yZS9ydWxlcy90YWduYW1lLXNwZWNpYWxjaGFycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLGtCQUFlO0lBQ2IsRUFBRSxFQUFFLHNCQUFzQjtJQUMxQixXQUFXLEVBQUUseUNBQXlDO0lBQ3RELElBQUksWUFBQyxNQUFNLEVBQUUsUUFBUTtRQUFyQixpQkFlQztRQWRDLElBQU0sWUFBWSxHQUFHLGtCQUFrQixDQUFBO1FBRXZDLE1BQU0sQ0FBQyxXQUFXLENBQUMsaUJBQWlCLEVBQUUsVUFBQyxLQUFLO1lBQzFDLElBQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUE7WUFDN0IsSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUM5QixRQUFRLENBQUMsS0FBSyxDQUNaLHFDQUE4QixPQUFPLG1DQUFnQyxFQUNyRSxLQUFLLENBQUMsSUFBSSxFQUNWLEtBQUssQ0FBQyxHQUFHLEVBQ1QsS0FBSSxFQUNKLEtBQUssQ0FBQyxHQUFHLENBQ1YsQ0FBQTthQUNGO1FBQ0gsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0NBQ00sQ0FBQSJ9