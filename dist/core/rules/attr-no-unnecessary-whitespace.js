"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    id: 'attr-no-unnecessary-whitespace',
    description: 'No spaces between attribute names and values.',
    init: function (parser, reporter, options) {
        var _this = this;
        var exceptions = Array.isArray(options) ? options : [];
        parser.addListener('tagstart', function (event) {
            var attrs = event.attrs;
            var col = event.col + event.tagName.length + 1;
            for (var i = 0; i < attrs.length; i++) {
                if (exceptions.indexOf(attrs[i].name) === -1) {
                    var match = /(\s*)=(\s*)/.exec(attrs[i].raw.trim());
                    if (match && (match[1].length !== 0 || match[2].length !== 0)) {
                        reporter.error("The attribute '" + attrs[i].name + "' must not have spaces between the name and value.", event.line, col + attrs[i].index, _this, attrs[i].raw);
                    }
                }
            }
        });
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXR0ci1uby11bm5lY2Vzc2FyeS13aGl0ZXNwYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvcmUvcnVsZXMvYXR0ci1uby11bm5lY2Vzc2FyeS13aGl0ZXNwYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsa0JBQWU7SUFDYixFQUFFLEVBQUUsZ0NBQWdDO0lBQ3BDLFdBQVcsRUFBRSwrQ0FBK0M7SUFDNUQsSUFBSSxFQUFKLFVBQUssTUFBTSxFQUFFLFFBQVEsRUFBRSxPQUFPO1FBQTlCLGlCQXNCQztRQXJCQyxJQUFNLFVBQVUsR0FBYSxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQTtRQUVsRSxNQUFNLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxVQUFDLEtBQUs7WUFDbkMsSUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQTtZQUN6QixJQUFNLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQTtZQUVoRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDckMsSUFBSSxVQUFVLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtvQkFDNUMsSUFBTSxLQUFLLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7b0JBQ3JELElBQUksS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsRUFBRTt3QkFDN0QsUUFBUSxDQUFDLEtBQUssQ0FDWixvQkFBa0IsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksdURBQW9ELEVBQ25GLEtBQUssQ0FBQyxJQUFJLEVBQ1YsR0FBRyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQ3BCLEtBQUksRUFDSixLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUNiLENBQUE7cUJBQ0Y7aUJBQ0Y7YUFDRjtRQUNILENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNNLENBQUEifQ==