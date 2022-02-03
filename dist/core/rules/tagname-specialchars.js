"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    id: 'tagname-specialchars',
    description: 'All special characters must be escaped.',
    init(parser, reporter) {
        const specialchars = /[^a-zA-Z0-9\-:_]/;
        parser.addListener('tagstart,tagend', (event) => {
            const tagName = event.tagName;
            if (specialchars.test(tagName)) {
                reporter.error(`The html element name of [ ${tagName} ] contains special character.`, event.line, event.col, this, event.raw);
            }
        });
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnbmFtZS1zcGVjaWFsY2hhcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29yZS9ydWxlcy90YWduYW1lLXNwZWNpYWxjaGFycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLGtCQUFlO0lBQ2IsRUFBRSxFQUFFLHNCQUFzQjtJQUMxQixXQUFXLEVBQUUseUNBQXlDO0lBQ3RELElBQUksQ0FBQyxNQUFNLEVBQUUsUUFBUTtRQUNuQixNQUFNLFlBQVksR0FBRyxrQkFBa0IsQ0FBQTtRQUV2QyxNQUFNLENBQUMsV0FBVyxDQUFDLGlCQUFpQixFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDOUMsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQTtZQUM3QixJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQzlCLFFBQVEsQ0FBQyxLQUFLLENBQ1osOEJBQThCLE9BQU8sZ0NBQWdDLEVBQ3JFLEtBQUssQ0FBQyxJQUFJLEVBQ1YsS0FBSyxDQUFDLEdBQUcsRUFDVCxJQUFJLEVBQ0osS0FBSyxDQUFDLEdBQUcsQ0FDVixDQUFBO2FBQ0Y7UUFDSCxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FDTSxDQUFBIn0=