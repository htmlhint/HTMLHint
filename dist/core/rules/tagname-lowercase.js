"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    id: 'tagname-lowercase',
    description: 'All html element names must be in lowercase.',
    init: function (parser, reporter, options) {
        var _this = this;
        var exceptions = Array.isArray(options)
            ? options
            : [];
        parser.addListener('tagstart,tagend', function (event) {
            var tagName = event.tagName;
            if (exceptions.indexOf(tagName) === -1 &&
                tagName !== tagName.toLowerCase()) {
                reporter.error("The html element name of [ " + tagName + " ] must be in lowercase.", event.line, event.col, _this, event.raw);
            }
        });
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnbmFtZS1sb3dlcmNhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29yZS9ydWxlcy90YWduYW1lLWxvd2VyY2FzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLGtCQUFlO0lBQ2IsRUFBRSxFQUFFLG1CQUFtQjtJQUN2QixXQUFXLEVBQUUsOENBQThDO0lBQzNELElBQUksRUFBSixVQUFLLE1BQU0sRUFBRSxRQUFRLEVBQUUsT0FBTztRQUE5QixpQkFvQkM7UUFuQkMsSUFBTSxVQUFVLEdBQTRCLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO1lBQ2hFLENBQUMsQ0FBQyxPQUFPO1lBQ1QsQ0FBQyxDQUFDLEVBQUUsQ0FBQTtRQUVOLE1BQU0sQ0FBQyxXQUFXLENBQUMsaUJBQWlCLEVBQUUsVUFBQyxLQUFLO1lBQzFDLElBQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUE7WUFDN0IsSUFDRSxVQUFVLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbEMsT0FBTyxLQUFLLE9BQU8sQ0FBQyxXQUFXLEVBQUUsRUFDakM7Z0JBQ0EsUUFBUSxDQUFDLEtBQUssQ0FDWixnQ0FBOEIsT0FBTyw2QkFBMEIsRUFDL0QsS0FBSyxDQUFDLElBQUksRUFDVixLQUFLLENBQUMsR0FBRyxFQUNULEtBQUksRUFDSixLQUFLLENBQUMsR0FBRyxDQUNWLENBQUE7YUFDRjtRQUNILENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNNLENBQUEifQ==