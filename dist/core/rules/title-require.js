"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    id: 'title-require',
    description: '<title> must be present in <head> tag.',
    init(parser, reporter) {
        let headBegin = false;
        let hasTitle = false;
        let inTitle = false;
        let titleHasText = false;
        const onTagStart = (event) => {
            const tagName = event.tagName.toLowerCase();
            if (tagName === 'head') {
                headBegin = true;
            }
            else if (tagName === 'title' && headBegin) {
                hasTitle = true;
                inTitle = true;
                titleHasText = false;
            }
        };
        const onText = (event) => {
            if (inTitle && /\S/.test(event.raw)) {
                titleHasText = true;
            }
        };
        const onTagEnd = (event) => {
            const tagName = event.tagName.toLowerCase();
            if (hasTitle && tagName === 'title') {
                inTitle = false;
                if (!titleHasText) {
                    reporter.error('<title></title> must not be empty.', event.line, event.col, this, event.raw);
                }
            }
            else if (tagName === 'head') {
                if (hasTitle === false) {
                    reporter.error('<title> must be present in <head> tag.', event.line, event.col, this, event.raw);
                }
                parser.removeListener('tagstart', onTagStart);
                parser.removeListener('tagend', onTagEnd);
                parser.removeListener('text', onText);
            }
        };
        parser.addListener('tagstart', onTagStart);
        parser.addListener('tagend', onTagEnd);
        parser.addListener('text', onText);
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGl0bGUtcmVxdWlyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb3JlL3J1bGVzL3RpdGxlLXJlcXVpcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQSxrQkFBZTtJQUNiLEVBQUUsRUFBRSxlQUFlO0lBQ25CLFdBQVcsRUFBRSx3Q0FBd0M7SUFDckQsSUFBSSxDQUFDLE1BQU0sRUFBRSxRQUFRO1FBQ25CLElBQUksU0FBUyxHQUFHLEtBQUssQ0FBQTtRQUNyQixJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUE7UUFDcEIsSUFBSSxPQUFPLEdBQUcsS0FBSyxDQUFBO1FBQ25CLElBQUksWUFBWSxHQUFHLEtBQUssQ0FBQTtRQUV4QixNQUFNLFVBQVUsR0FBYSxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ3JDLE1BQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUE7WUFDM0MsSUFBSSxPQUFPLEtBQUssTUFBTSxFQUFFLENBQUM7Z0JBQ3ZCLFNBQVMsR0FBRyxJQUFJLENBQUE7WUFDbEIsQ0FBQztpQkFBTSxJQUFJLE9BQU8sS0FBSyxPQUFPLElBQUksU0FBUyxFQUFFLENBQUM7Z0JBQzVDLFFBQVEsR0FBRyxJQUFJLENBQUE7Z0JBQ2YsT0FBTyxHQUFHLElBQUksQ0FBQTtnQkFDZCxZQUFZLEdBQUcsS0FBSyxDQUFBO1lBQ3RCLENBQUM7UUFDSCxDQUFDLENBQUE7UUFJRCxNQUFNLE1BQU0sR0FBYSxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ2pDLElBQUksT0FBTyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7Z0JBQ3BDLFlBQVksR0FBRyxJQUFJLENBQUE7WUFDckIsQ0FBQztRQUNILENBQUMsQ0FBQTtRQUVELE1BQU0sUUFBUSxHQUFhLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDbkMsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQTtZQUMzQyxJQUFJLFFBQVEsSUFBSSxPQUFPLEtBQUssT0FBTyxFQUFFLENBQUM7Z0JBQ3BDLE9BQU8sR0FBRyxLQUFLLENBQUE7Z0JBQ2YsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO29CQUNsQixRQUFRLENBQUMsS0FBSyxDQUNaLG9DQUFvQyxFQUNwQyxLQUFLLENBQUMsSUFBSSxFQUNWLEtBQUssQ0FBQyxHQUFHLEVBQ1QsSUFBSSxFQUNKLEtBQUssQ0FBQyxHQUFHLENBQ1YsQ0FBQTtnQkFDSCxDQUFDO1lBQ0gsQ0FBQztpQkFBTSxJQUFJLE9BQU8sS0FBSyxNQUFNLEVBQUUsQ0FBQztnQkFDOUIsSUFBSSxRQUFRLEtBQUssS0FBSyxFQUFFLENBQUM7b0JBQ3ZCLFFBQVEsQ0FBQyxLQUFLLENBQ1osd0NBQXdDLEVBQ3hDLEtBQUssQ0FBQyxJQUFJLEVBQ1YsS0FBSyxDQUFDLEdBQUcsRUFDVCxJQUFJLEVBQ0osS0FBSyxDQUFDLEdBQUcsQ0FDVixDQUFBO2dCQUNILENBQUM7Z0JBRUQsTUFBTSxDQUFDLGNBQWMsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUE7Z0JBQzdDLE1BQU0sQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFBO2dCQUN6QyxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQTtZQUN2QyxDQUFDO1FBQ0gsQ0FBQyxDQUFBO1FBRUQsTUFBTSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUE7UUFDMUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUE7UUFDdEMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUE7SUFDcEMsQ0FBQztDQUNNLENBQUEifQ==