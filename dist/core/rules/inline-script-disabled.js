"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    id: 'inline-script-disabled',
    description: 'Inline script cannot be used.',
    init(parser, reporter) {
        parser.addListener('tagstart', (event) => {
            const attrs = event.attrs;
            let attr;
            const col = event.col + event.tagName.length + 1;
            let attrName;
            const reEvent = /^on(unload|message|submit|select|scroll|resize|mouseover|mouseout|mousemove|mouseleave|mouseenter|mousedown|load|keyup|keypress|keydown|focus|dblclick|click|change|blur|error)$/i;
            for (let i = 0, l = attrs.length; i < l; i++) {
                attr = attrs[i];
                attrName = attr.name.toLowerCase();
                if (reEvent.test(attrName) === true) {
                    reporter.warn(`Inline script [ ${attr.raw} ] cannot be used.`, event.line, col + attr.index, this, attr.raw);
                }
                else if (attrName === 'src' || attrName === 'href') {
                    if (/^\s*javascript:/i.test(attr.value)) {
                        reporter.warn(`Inline script [ ${attr.raw} ] cannot be used.`, event.line, col + attr.index, this, attr.raw);
                    }
                }
            }
        });
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5saW5lLXNjcmlwdC1kaXNhYmxlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb3JlL3J1bGVzL2lubGluZS1zY3JpcHQtZGlzYWJsZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSxrQkFBZTtJQUNiLEVBQUUsRUFBRSx3QkFBd0I7SUFDNUIsV0FBVyxFQUFFLCtCQUErQjtJQUM1QyxJQUFJLENBQUMsTUFBTSxFQUFFLFFBQVE7UUFDbkIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUN2QyxNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFBO1lBQ3pCLElBQUksSUFBSSxDQUFBO1lBQ1IsTUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUE7WUFDaEQsSUFBSSxRQUFRLENBQUE7WUFDWixNQUFNLE9BQU8sR0FDWCxtTEFBbUwsQ0FBQTtZQUVyTCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUM1QyxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBO2dCQUNmLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFBO2dCQUVsQyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssSUFBSSxFQUFFO29CQUNuQyxRQUFRLENBQUMsSUFBSSxDQUNYLG1CQUFtQixJQUFJLENBQUMsR0FBRyxvQkFBb0IsRUFDL0MsS0FBSyxDQUFDLElBQUksRUFDVixHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFDaEIsSUFBSSxFQUNKLElBQUksQ0FBQyxHQUFHLENBQ1QsQ0FBQTtpQkFDRjtxQkFBTSxJQUFJLFFBQVEsS0FBSyxLQUFLLElBQUksUUFBUSxLQUFLLE1BQU0sRUFBRTtvQkFDcEQsSUFBSSxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO3dCQUN2QyxRQUFRLENBQUMsSUFBSSxDQUNYLG1CQUFtQixJQUFJLENBQUMsR0FBRyxvQkFBb0IsRUFDL0MsS0FBSyxDQUFDLElBQUksRUFDVixHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFDaEIsSUFBSSxFQUNKLElBQUksQ0FBQyxHQUFHLENBQ1QsQ0FBQTtxQkFDRjtpQkFDRjthQUNGO1FBQ0gsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0NBQ00sQ0FBQSJ9