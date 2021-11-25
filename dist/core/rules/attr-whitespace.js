"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    id: 'attr-whitespace',
    description: 'All attributes should be separated by only one space and not have leading/trailing whitespace.',
    init: function (parser, reporter, options) {
        var _this = this;
        var exceptions = Array.isArray(options)
            ? options
            : [];
        parser.addListener('tagstart', function (event) {
            var attrs = event.attrs;
            var attr;
            var col = event.col + event.tagName.length + 1;
            attrs.forEach(function (elem) {
                attr = elem;
                var attrName = elem.name;
                if (exceptions.indexOf(attrName) !== -1) {
                    return;
                }
                if (elem.value.trim() !== elem.value) {
                    reporter.error("The attributes of [ ".concat(attrName, " ] must not have trailing whitespace."), event.line, col + attr.index, _this, attr.raw);
                }
                if (elem.value.replace(/ +(?= )/g, '') !== elem.value) {
                    reporter.error("The attributes of [ ".concat(attrName, " ] must be separated by only one space."), event.line, col + attr.index, _this, attr.raw);
                }
            });
        });
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXR0ci13aGl0ZXNwYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvcmUvcnVsZXMvYXR0ci13aGl0ZXNwYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsa0JBQWU7SUFDYixFQUFFLEVBQUUsaUJBQWlCO0lBQ3JCLFdBQVcsRUFDVCxnR0FBZ0c7SUFDbEcsSUFBSSxFQUFKLFVBQUssTUFBTSxFQUFFLFFBQVEsRUFBRSxPQUFPO1FBQTlCLGlCQXdDQztRQXZDQyxJQUFNLFVBQVUsR0FBNEIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7WUFDaEUsQ0FBQyxDQUFDLE9BQU87WUFDVCxDQUFDLENBQUMsRUFBRSxDQUFBO1FBRU4sTUFBTSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsVUFBQyxLQUFLO1lBQ25DLElBQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUE7WUFDekIsSUFBSSxJQUFJLENBQUE7WUFDUixJQUFNLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQTtZQUVoRCxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBSTtnQkFDakIsSUFBSSxHQUFHLElBQUksQ0FBQTtnQkFDWCxJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFBO2dCQUUxQixJQUFJLFVBQVUsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7b0JBQ3ZDLE9BQU07aUJBQ1A7Z0JBR0QsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ3BDLFFBQVEsQ0FBQyxLQUFLLENBQ1osOEJBQXVCLFFBQVEsMENBQXVDLEVBQ3RFLEtBQUssQ0FBQyxJQUFJLEVBQ1YsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQ2hCLEtBQUksRUFDSixJQUFJLENBQUMsR0FBRyxDQUNULENBQUE7aUJBQ0Y7Z0JBRUQsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLEtBQUssSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDckQsUUFBUSxDQUFDLEtBQUssQ0FDWiw4QkFBdUIsUUFBUSw0Q0FBeUMsRUFDeEUsS0FBSyxDQUFDLElBQUksRUFDVixHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFDaEIsS0FBSSxFQUNKLElBQUksQ0FBQyxHQUFHLENBQ1QsQ0FBQTtpQkFDRjtZQUNILENBQUMsQ0FBQyxDQUFBO1FBQ0osQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0NBQ00sQ0FBQSJ9