"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    id: 'href-abs-or-rel',
    description: 'An href attribute must be either absolute or relative.',
    init: function (parser, reporter, options) {
        var _this = this;
        var hrefMode = options === 'abs' ? 'absolute' : 'relative';
        parser.addListener('tagstart', function (event) {
            var attrs = event.attrs;
            var attr;
            var col = event.col + event.tagName.length + 1;
            for (var i = 0, l = attrs.length; i < l; i++) {
                attr = attrs[i];
                if (attr.name === 'href') {
                    if ((hrefMode === 'absolute' && /^\w+?:/.test(attr.value) === false) ||
                        (hrefMode === 'relative' &&
                            /^https?:\/\//.test(attr.value) === true)) {
                        reporter.warn("The value of the href attribute [ ".concat(attr.value, " ] must be ").concat(hrefMode, "."), event.line, col + attr.index, _this, attr.raw);
                    }
                    break;
                }
            }
        });
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHJlZi1hYnMtb3ItcmVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvcmUvcnVsZXMvaHJlZi1hYnMtb3ItcmVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsa0JBQWU7SUFDYixFQUFFLEVBQUUsaUJBQWlCO0lBQ3JCLFdBQVcsRUFBRSx3REFBd0Q7SUFDckUsSUFBSSxZQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsT0FBTztRQUE5QixpQkE2QkM7UUE1QkMsSUFBTSxRQUFRLEdBQUcsT0FBTyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUE7UUFFNUQsTUFBTSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsVUFBQyxLQUFLO1lBQ25DLElBQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUE7WUFDekIsSUFBSSxJQUFJLENBQUE7WUFDUixJQUFNLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQTtZQUVoRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUM1QyxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBO2dCQUVmLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxNQUFNLEVBQUU7b0JBQ3hCLElBQ0UsQ0FBQyxRQUFRLEtBQUssVUFBVSxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEtBQUssQ0FBQzt3QkFDaEUsQ0FBQyxRQUFRLEtBQUssVUFBVTs0QkFDdEIsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxDQUFDLEVBQzNDO3dCQUNBLFFBQVEsQ0FBQyxJQUFJLENBQ1gsNENBQXFDLElBQUksQ0FBQyxLQUFLLHdCQUFjLFFBQVEsTUFBRyxFQUN4RSxLQUFLLENBQUMsSUFBSSxFQUNWLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxFQUNoQixLQUFJLEVBQ0osSUFBSSxDQUFDLEdBQUcsQ0FDVCxDQUFBO3FCQUNGO29CQUNELE1BQUs7aUJBQ047YUFDRjtRQUNILENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNNLENBQUEifQ==