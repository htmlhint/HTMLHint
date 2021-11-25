"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    id: 'attr-unsafe-chars',
    description: 'Attribute values cannot contain unsafe chars.',
    init: function (parser, reporter) {
        var _this = this;
        parser.addListener('tagstart', function (event) {
            var attrs = event.attrs;
            var attr;
            var col = event.col + event.tagName.length + 1;
            var regUnsafe = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/;
            var match;
            for (var i = 0, l = attrs.length; i < l; i++) {
                attr = attrs[i];
                match = regUnsafe.exec(attr.value);
                if (match !== null) {
                    var unsafeCode = escape(match[0])
                        .replace(/%u/, '\\u')
                        .replace(/%/, '\\x');
                    reporter.warn("The value of attribute [ ".concat(attr.name, " ] cannot contain an unsafe char [ ").concat(unsafeCode, " ]."), event.line, col + attr.index, _this, attr.raw);
                }
            }
        });
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXR0ci11bnNhZmUtY2hhcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29yZS9ydWxlcy9hdHRyLXVuc2FmZS1jaGFycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLGtCQUFlO0lBQ2IsRUFBRSxFQUFFLG1CQUFtQjtJQUN2QixXQUFXLEVBQUUsK0NBQStDO0lBQzVELElBQUksWUFBQyxNQUFNLEVBQUUsUUFBUTtRQUFyQixpQkE2QkM7UUE1QkMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsVUFBQyxLQUFLO1lBQ25DLElBQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUE7WUFDekIsSUFBSSxJQUFJLENBQUE7WUFDUixJQUFNLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQTtZQUVoRCxJQUFNLFNBQVMsR0FFYixzSkFBc0osQ0FBQTtZQUN4SixJQUFJLEtBQUssQ0FBQTtZQUVULEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQzVDLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUE7Z0JBQ2YsS0FBSyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO2dCQUVsQyxJQUFJLEtBQUssS0FBSyxJQUFJLEVBQUU7b0JBQ2xCLElBQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7eUJBQ2hDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDO3lCQUNwQixPQUFPLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFBO29CQUN0QixRQUFRLENBQUMsSUFBSSxDQUNYLG1DQUE0QixJQUFJLENBQUMsSUFBSSxnREFBc0MsVUFBVSxRQUFLLEVBQzFGLEtBQUssQ0FBQyxJQUFJLEVBQ1YsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQ2hCLEtBQUksRUFDSixJQUFJLENBQUMsR0FBRyxDQUNULENBQUE7aUJBQ0Y7YUFDRjtRQUNILENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNNLENBQUEifQ==