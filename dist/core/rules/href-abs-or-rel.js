"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    id: 'href-abs-or-rel',
    description: 'An href attribute must be either absolute or relative.',
    init(parser, reporter, options) {
        const hrefMode = options === 'abs' ? 'absolute' : 'relative';
        parser.addListener('tagstart', (event) => {
            const attrs = event.attrs;
            let attr;
            const col = event.col + event.tagName.length + 1;
            for (let i = 0, l = attrs.length; i < l; i++) {
                attr = attrs[i];
                if (attr.name === 'href') {
                    if ((hrefMode === 'absolute' && /^\w+?:/.test(attr.value) === false) ||
                        (hrefMode === 'relative' &&
                            /^https?:\/\//.test(attr.value) === true)) {
                        reporter.warn(`The value of the href attribute [ ${attr.value} ] must be ${hrefMode}.`, event.line, col + attr.index, this, attr.raw);
                    }
                    break;
                }
            }
        });
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHJlZi1hYnMtb3ItcmVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvcmUvcnVsZXMvaHJlZi1hYnMtb3ItcmVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsa0JBQWU7SUFDYixFQUFFLEVBQUUsaUJBQWlCO0lBQ3JCLFdBQVcsRUFBRSx3REFBd0Q7SUFDckUsSUFBSSxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsT0FBTztRQUM1QixNQUFNLFFBQVEsR0FBRyxPQUFPLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQTtRQUU1RCxNQUFNLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ3ZDLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUE7WUFDekIsSUFBSSxJQUFJLENBQUE7WUFDUixNQUFNLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQTtZQUVoRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUM1QyxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBO2dCQUVmLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxNQUFNLEVBQUU7b0JBQ3hCLElBQ0UsQ0FBQyxRQUFRLEtBQUssVUFBVSxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEtBQUssQ0FBQzt3QkFDaEUsQ0FBQyxRQUFRLEtBQUssVUFBVTs0QkFDdEIsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxDQUFDLEVBQzNDO3dCQUNBLFFBQVEsQ0FBQyxJQUFJLENBQ1gscUNBQXFDLElBQUksQ0FBQyxLQUFLLGNBQWMsUUFBUSxHQUFHLEVBQ3hFLEtBQUssQ0FBQyxJQUFJLEVBQ1YsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQ2hCLElBQUksRUFDSixJQUFJLENBQUMsR0FBRyxDQUNULENBQUE7cUJBQ0Y7b0JBQ0QsTUFBSztpQkFDTjthQUNGO1FBQ0gsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0NBQ00sQ0FBQSJ9