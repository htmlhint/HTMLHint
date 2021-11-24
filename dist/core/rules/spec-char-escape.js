"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    id: 'spec-char-escape',
    description: 'Special characters must be escaped.',
    init: function (parser, reporter) {
        var _this = this;
        parser.addListener('text', function (event) {
            var raw = event.raw;
            var reSpecChar = /([<>])|( \& )/g;
            var match;
            while ((match = reSpecChar.exec(raw))) {
                var fixedPos = parser.fixPos(event, match.index);
                reporter.error("Special characters must be escaped : [ " + match[0] + " ].", fixedPos.line, fixedPos.col, _this, event.raw);
            }
        });
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BlYy1jaGFyLWVzY2FwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb3JlL3J1bGVzL3NwZWMtY2hhci1lc2NhcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSxrQkFBZTtJQUNiLEVBQUUsRUFBRSxrQkFBa0I7SUFDdEIsV0FBVyxFQUFFLHFDQUFxQztJQUNsRCxJQUFJLFlBQUMsTUFBTSxFQUFFLFFBQVE7UUFBckIsaUJBa0JDO1FBakJDLE1BQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLFVBQUMsS0FBSztZQUMvQixJQUFNLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFBO1lBRXJCLElBQU0sVUFBVSxHQUFHLGdCQUFnQixDQUFBO1lBQ25DLElBQUksS0FBSyxDQUFBO1lBRVQsT0FBTyxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7Z0JBQ3JDLElBQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTtnQkFDbEQsUUFBUSxDQUFDLEtBQUssQ0FDWiw0Q0FBMEMsS0FBSyxDQUFDLENBQUMsQ0FBQyxRQUFLLEVBQ3ZELFFBQVEsQ0FBQyxJQUFJLEVBQ2IsUUFBUSxDQUFDLEdBQUcsRUFDWixLQUFJLEVBQ0osS0FBSyxDQUFDLEdBQUcsQ0FDVixDQUFBO2FBQ0Y7UUFDSCxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FDTSxDQUFBIn0=