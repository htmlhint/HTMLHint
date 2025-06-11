"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    id: 'attr-whitespace',
    description: 'All attributes should be separated by only one space and not have leading/trailing whitespace.',
    init(parser, reporter, options) {
        const exceptions = Array.isArray(options)
            ? options
            : [];
        parser.addListener('tagstart', (event) => {
            const attrs = event.attrs;
            let attr;
            const col = event.col + event.tagName.length + 1;
            attrs.forEach((elem) => {
                attr = elem;
                const attrName = elem.name;
                if (exceptions.indexOf(attrName) !== -1) {
                    return;
                }
                if (elem.value.trim() !== elem.value) {
                    reporter.error(`The attributes of [ ${attrName} ] must not have leading or trailing whitespace.`, event.line, col + attr.index, this, attr.raw);
                }
                if (elem.value.replace(/ +(?= )/g, '') !== elem.value) {
                    reporter.error(`The attributes of [ ${attrName} ] must be separated by only one space.`, event.line, col + attr.index, this, attr.raw);
                }
            });
        });
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXR0ci13aGl0ZXNwYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvcmUvcnVsZXMvYXR0ci13aGl0ZXNwYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsa0JBQWU7SUFDYixFQUFFLEVBQUUsaUJBQWlCO0lBQ3JCLFdBQVcsRUFDVCxnR0FBZ0c7SUFDbEcsSUFBSSxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsT0FBTztRQUM1QixNQUFNLFVBQVUsR0FBNEIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7WUFDaEUsQ0FBQyxDQUFDLE9BQU87WUFDVCxDQUFDLENBQUMsRUFBRSxDQUFBO1FBRU4sTUFBTSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUN2QyxNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFBO1lBQ3pCLElBQUksSUFBSSxDQUFBO1lBQ1IsTUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUE7WUFFaEQsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUNyQixJQUFJLEdBQUcsSUFBSSxDQUFBO2dCQUNYLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUE7Z0JBRTFCLElBQUksVUFBVSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDO29CQUN4QyxPQUFNO2dCQUNSLENBQUM7Z0JBR0QsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFDckMsUUFBUSxDQUFDLEtBQUssQ0FDWix1QkFBdUIsUUFBUSxrREFBa0QsRUFDakYsS0FBSyxDQUFDLElBQUksRUFDVixHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFDaEIsSUFBSSxFQUNKLElBQUksQ0FBQyxHQUFHLENBQ1QsQ0FBQTtnQkFDSCxDQUFDO2dCQUVELElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxLQUFLLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFDdEQsUUFBUSxDQUFDLEtBQUssQ0FDWix1QkFBdUIsUUFBUSx5Q0FBeUMsRUFDeEUsS0FBSyxDQUFDLElBQUksRUFDVixHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFDaEIsSUFBSSxFQUNKLElBQUksQ0FBQyxHQUFHLENBQ1QsQ0FBQTtnQkFDSCxDQUFDO1lBQ0gsQ0FBQyxDQUFDLENBQUE7UUFDSixDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FDTSxDQUFBIn0=