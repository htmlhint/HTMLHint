"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    id: 'id-unique',
    description: 'The value of id attributes must be unique.',
    init: function (parser, reporter) {
        var _this = this;
        var mapIdCount = {};
        parser.addListener('tagstart', function (event) {
            var attrs = event.attrs;
            var attr;
            var id;
            var col = event.col + event.tagName.length + 1;
            for (var i = 0, l = attrs.length; i < l; i++) {
                attr = attrs[i];
                if (attr.name.toLowerCase() === 'id') {
                    id = attr.value;
                    if (id) {
                        if (mapIdCount[id] === undefined) {
                            mapIdCount[id] = 1;
                        }
                        else {
                            mapIdCount[id]++;
                        }
                        if (mapIdCount[id] > 1) {
                            reporter.error("The id value [ ".concat(id, " ] must be unique."), event.line, col + attr.index, _this, attr.raw);
                        }
                    }
                    break;
                }
            }
        });
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWQtdW5pcXVlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvcmUvcnVsZXMvaWQtdW5pcXVlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsa0JBQWU7SUFDYixFQUFFLEVBQUUsV0FBVztJQUNmLFdBQVcsRUFBRSw0Q0FBNEM7SUFDekQsSUFBSSxFQUFKLFVBQUssTUFBTSxFQUFFLFFBQVE7UUFBckIsaUJBb0NDO1FBbkNDLElBQU0sVUFBVSxHQUE2QixFQUFFLENBQUE7UUFFL0MsTUFBTSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsVUFBQyxLQUFLO1lBQ25DLElBQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUE7WUFDekIsSUFBSSxJQUFJLENBQUE7WUFDUixJQUFJLEVBQUUsQ0FBQTtZQUNOLElBQU0sR0FBRyxHQUFHLEtBQUssQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFBO1lBRWhELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQzVDLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUE7Z0JBRWYsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxLQUFLLElBQUksRUFBRTtvQkFDcEMsRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUE7b0JBRWYsSUFBSSxFQUFFLEVBQUU7d0JBQ04sSUFBSSxVQUFVLENBQUMsRUFBRSxDQUFDLEtBQUssU0FBUyxFQUFFOzRCQUNoQyxVQUFVLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFBO3lCQUNuQjs2QkFBTTs0QkFDTCxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQTt5QkFDakI7d0JBRUQsSUFBSSxVQUFVLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFOzRCQUN0QixRQUFRLENBQUMsS0FBSyxDQUNaLHlCQUFrQixFQUFFLHVCQUFvQixFQUN4QyxLQUFLLENBQUMsSUFBSSxFQUNWLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxFQUNoQixLQUFJLEVBQ0osSUFBSSxDQUFDLEdBQUcsQ0FDVCxDQUFBO3lCQUNGO3FCQUNGO29CQUNELE1BQUs7aUJBQ047YUFDRjtRQUNILENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNNLENBQUEifQ==