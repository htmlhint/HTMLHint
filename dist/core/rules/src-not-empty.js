"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    id: 'src-not-empty',
    description: 'The src attribute of an img(script,link) must have a value.',
    init: function (parser, reporter) {
        var _this = this;
        parser.addListener('tagstart', function (event) {
            var tagName = event.tagName;
            var attrs = event.attrs;
            var attr;
            var col = event.col + tagName.length + 1;
            for (var i = 0, l = attrs.length; i < l; i++) {
                attr = attrs[i];
                if (((/^(img|script|embed|bgsound|iframe)$/.test(tagName) === true &&
                    attr.name === 'src') ||
                    (tagName === 'link' && attr.name === 'href') ||
                    (tagName === 'object' && attr.name === 'data')) &&
                    attr.value === '') {
                    reporter.error("The attribute [ " + attr.name + " ] of the tag [ " + tagName + " ] must have a value.", event.line, col + attr.index, _this, attr.raw);
                }
            }
        });
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjLW5vdC1lbXB0eS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb3JlL3J1bGVzL3NyYy1ub3QtZW1wdHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSxrQkFBZTtJQUNiLEVBQUUsRUFBRSxlQUFlO0lBQ25CLFdBQVcsRUFBRSw2REFBNkQ7SUFDMUUsSUFBSSxZQUFDLE1BQU0sRUFBRSxRQUFRO1FBQXJCLGlCQTJCQztRQTFCQyxNQUFNLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxVQUFDLEtBQUs7WUFDbkMsSUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQTtZQUM3QixJQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFBO1lBQ3pCLElBQUksSUFBSSxDQUFBO1lBQ1IsSUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUcsR0FBRyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQTtZQUUxQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUM1QyxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBO2dCQUVmLElBQ0UsQ0FBQyxDQUFDLHFDQUFxQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxJQUFJO29CQUM1RCxJQUFJLENBQUMsSUFBSSxLQUFLLEtBQUssQ0FBQztvQkFDcEIsQ0FBQyxPQUFPLEtBQUssTUFBTSxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssTUFBTSxDQUFDO29CQUM1QyxDQUFDLE9BQU8sS0FBSyxRQUFRLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxNQUFNLENBQUMsQ0FBQztvQkFDakQsSUFBSSxDQUFDLEtBQUssS0FBSyxFQUFFLEVBQ2pCO29CQUNBLFFBQVEsQ0FBQyxLQUFLLENBQ1oscUJBQW1CLElBQUksQ0FBQyxJQUFJLHdCQUFtQixPQUFPLDBCQUF1QixFQUM3RSxLQUFLLENBQUMsSUFBSSxFQUNWLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxFQUNoQixLQUFJLEVBQ0osSUFBSSxDQUFDLEdBQUcsQ0FDVCxDQUFBO2lCQUNGO2FBQ0Y7UUFDSCxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FDTSxDQUFBIn0=