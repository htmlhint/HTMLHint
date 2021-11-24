"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    id: 'attr-no-duplication',
    description: 'Elements cannot have duplicate attributes.',
    init: function (parser, reporter) {
        var _this = this;
        parser.addListener('tagstart', function (event) {
            var attrs = event.attrs;
            var attr;
            var attrName;
            var col = event.col + event.tagName.length + 1;
            var mapAttrName = {};
            for (var i = 0, l = attrs.length; i < l; i++) {
                attr = attrs[i];
                attrName = attr.name;
                if (mapAttrName[attrName] === true) {
                    reporter.error("Duplicate of attribute name [ " + attr.name + " ] was found.", event.line, col + attr.index, _this, attr.raw);
                }
                mapAttrName[attrName] = true;
            }
        });
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXR0ci1uby1kdXBsaWNhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb3JlL3J1bGVzL2F0dHItbm8tZHVwbGljYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSxrQkFBZTtJQUNiLEVBQUUsRUFBRSxxQkFBcUI7SUFDekIsV0FBVyxFQUFFLDRDQUE0QztJQUN6RCxJQUFJLEVBQUosVUFBSyxNQUFNLEVBQUUsUUFBUTtRQUFyQixpQkF5QkM7UUF4QkMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsVUFBQyxLQUFLO1lBQ25DLElBQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUE7WUFDekIsSUFBSSxJQUFJLENBQUE7WUFDUixJQUFJLFFBQWdCLENBQUE7WUFDcEIsSUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUE7WUFFaEQsSUFBTSxXQUFXLEdBQWdDLEVBQUUsQ0FBQTtZQUVuRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUM1QyxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBO2dCQUNmLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFBO2dCQUVwQixJQUFJLFdBQVcsQ0FBQyxRQUFRLENBQUMsS0FBSyxJQUFJLEVBQUU7b0JBQ2xDLFFBQVEsQ0FBQyxLQUFLLENBQ1osbUNBQWlDLElBQUksQ0FBQyxJQUFJLGtCQUFlLEVBQ3pELEtBQUssQ0FBQyxJQUFJLEVBQ1YsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQ2hCLEtBQUksRUFDSixJQUFJLENBQUMsR0FBRyxDQUNULENBQUE7aUJBQ0Y7Z0JBQ0QsV0FBVyxDQUFDLFFBQVEsQ0FBQyxHQUFHLElBQUksQ0FBQTthQUM3QjtRQUNILENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNNLENBQUEifQ==