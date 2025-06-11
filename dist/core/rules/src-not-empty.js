"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    id: 'src-not-empty',
    description: 'The src attribute of an img(script,link) must have a value.',
    init(parser, reporter) {
        parser.addListener('tagstart', (event) => {
            const tagName = event.tagName;
            const attrs = event.attrs;
            let attr;
            const col = event.col + tagName.length + 1;
            for (let i = 0, l = attrs.length; i < l; i++) {
                attr = attrs[i];
                if (((/^(img|script|embed|bgsound|iframe)$/.test(tagName) === true &&
                    attr.name === 'src') ||
                    (tagName === 'link' && attr.name === 'href') ||
                    (tagName === 'object' && attr.name === 'data')) &&
                    attr.value === '') {
                    reporter.error(`The attribute [ ${attr.name} ] of the tag [ ${tagName} ] must have a value.`, event.line, col + attr.index, this, attr.raw);
                }
            }
        });
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjLW5vdC1lbXB0eS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb3JlL3J1bGVzL3NyYy1ub3QtZW1wdHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSxrQkFBZTtJQUNiLEVBQUUsRUFBRSxlQUFlO0lBQ25CLFdBQVcsRUFBRSw2REFBNkQ7SUFDMUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxRQUFRO1FBQ25CLE1BQU0sQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDdkMsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQTtZQUM3QixNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFBO1lBQ3pCLElBQUksSUFBSSxDQUFBO1lBQ1IsTUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUcsR0FBRyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQTtZQUUxQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7Z0JBQzdDLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUE7Z0JBRWYsSUFDRSxDQUFDLENBQUMscUNBQXFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUk7b0JBQzVELElBQUksQ0FBQyxJQUFJLEtBQUssS0FBSyxDQUFDO29CQUNwQixDQUFDLE9BQU8sS0FBSyxNQUFNLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxNQUFNLENBQUM7b0JBQzVDLENBQUMsT0FBTyxLQUFLLFFBQVEsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLE1BQU0sQ0FBQyxDQUFDO29CQUNqRCxJQUFJLENBQUMsS0FBSyxLQUFLLEVBQUUsRUFDakIsQ0FBQztvQkFDRCxRQUFRLENBQUMsS0FBSyxDQUNaLG1CQUFtQixJQUFJLENBQUMsSUFBSSxtQkFBbUIsT0FBTyx1QkFBdUIsRUFDN0UsS0FBSyxDQUFDLElBQUksRUFDVixHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFDaEIsSUFBSSxFQUNKLElBQUksQ0FBQyxHQUFHLENBQ1QsQ0FBQTtnQkFDSCxDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNNLENBQUEifQ==