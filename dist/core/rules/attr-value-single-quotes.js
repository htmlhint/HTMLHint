"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    id: 'attr-value-single-quotes',
    description: 'Attribute values must be in single quotes.',
    init(parser, reporter) {
        parser.addListener('tagstart', (event) => {
            const attrs = event.attrs;
            let attr;
            const col = event.col + event.tagName.length + 1;
            for (let i = 0, l = attrs.length; i < l; i++) {
                attr = attrs[i];
                if ((attr.value !== '' && attr.quote !== "'") ||
                    (attr.value === '' && attr.quote === '"')) {
                    reporter.error(`The value of attribute [ ${attr.name} ] must be in single quotes.`, event.line, col + attr.index, this, attr.raw);
                }
            }
        });
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXR0ci12YWx1ZS1zaW5nbGUtcXVvdGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvcmUvcnVsZXMvYXR0ci12YWx1ZS1zaW5nbGUtcXVvdGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsa0JBQWU7SUFDYixFQUFFLEVBQUUsMEJBQTBCO0lBQzlCLFdBQVcsRUFBRSw0Q0FBNEM7SUFDekQsSUFBSSxDQUFDLE1BQU0sRUFBRSxRQUFRO1FBQ25CLE1BQU0sQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDdkMsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQTtZQUN6QixJQUFJLElBQUksQ0FBQTtZQUNSLE1BQU0sR0FBRyxHQUFHLEtBQUssQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFBO1lBRWhELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQzVDLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUE7Z0JBRWYsSUFDRSxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssRUFBRSxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssR0FBRyxDQUFDO29CQUN6QyxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssRUFBRSxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssR0FBRyxDQUFDLEVBQ3pDO29CQUNBLFFBQVEsQ0FBQyxLQUFLLENBQ1osNEJBQTRCLElBQUksQ0FBQyxJQUFJLDhCQUE4QixFQUNuRSxLQUFLLENBQUMsSUFBSSxFQUNWLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxFQUNoQixJQUFJLEVBQ0osSUFBSSxDQUFDLEdBQUcsQ0FDVCxDQUFBO2lCQUNGO2FBQ0Y7UUFDSCxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FDTSxDQUFBIn0=