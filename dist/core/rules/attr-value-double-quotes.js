"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    id: 'attr-value-double-quotes',
    description: 'Attribute values must be in double quotes.',
    init: function (parser, reporter) {
        var _this = this;
        parser.addListener('tagstart', function (event) {
            var attrs = event.attrs;
            var attr;
            var col = event.col + event.tagName.length + 1;
            for (var i = 0, l = attrs.length; i < l; i++) {
                attr = attrs[i];
                if ((attr.value !== '' && attr.quote !== '"') ||
                    (attr.value === '' && attr.quote === "'")) {
                    reporter.error("The value of attribute [ " + attr.name + " ] must be in double quotes.", event.line, col + attr.index, _this, attr.raw);
                }
            }
        });
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXR0ci12YWx1ZS1kb3VibGUtcXVvdGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvcmUvcnVsZXMvYXR0ci12YWx1ZS1kb3VibGUtcXVvdGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsa0JBQWU7SUFDYixFQUFFLEVBQUUsMEJBQTBCO0lBQzlCLFdBQVcsRUFBRSw0Q0FBNEM7SUFDekQsSUFBSSxZQUFDLE1BQU0sRUFBRSxRQUFRO1FBQXJCLGlCQXVCQztRQXRCQyxNQUFNLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxVQUFDLEtBQUs7WUFDbkMsSUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQTtZQUN6QixJQUFJLElBQUksQ0FBQTtZQUNSLElBQU0sR0FBRyxHQUFHLEtBQUssQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFBO1lBRWhELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQzVDLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUE7Z0JBRWYsSUFDRSxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssRUFBRSxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssR0FBRyxDQUFDO29CQUN6QyxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssRUFBRSxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssR0FBRyxDQUFDLEVBQ3pDO29CQUNBLFFBQVEsQ0FBQyxLQUFLLENBQ1osOEJBQTRCLElBQUksQ0FBQyxJQUFJLGlDQUE4QixFQUNuRSxLQUFLLENBQUMsSUFBSSxFQUNWLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxFQUNoQixLQUFJLEVBQ0osSUFBSSxDQUFDLEdBQUcsQ0FDVCxDQUFBO2lCQUNGO2FBQ0Y7UUFDSCxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FDTSxDQUFBIn0=