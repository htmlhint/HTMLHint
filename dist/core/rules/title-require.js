"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    id: 'title-require',
    description: '<title> must be present in <head> tag.',
    init(parser, reporter) {
        let headBegin = false;
        let hasTitle = false;
        const onTagStart = (event) => {
            const tagName = event.tagName.toLowerCase();
            if (tagName === 'head') {
                headBegin = true;
            }
            else if (tagName === 'title' && headBegin) {
                hasTitle = true;
            }
        };
        const onTagEnd = (event) => {
            const tagName = event.tagName.toLowerCase();
            if (hasTitle && tagName === 'title') {
                const lastEvent = event.lastEvent;
                if (lastEvent.type !== 'text' ||
                    (lastEvent.type === 'text' && /^\s*$/.test(lastEvent.raw) === true)) {
                    reporter.error('<title></title> must not be empty.', event.line, event.col, this, event.raw);
                }
            }
            else if (tagName === 'head') {
                if (hasTitle === false) {
                    reporter.error('<title> must be present in <head> tag.', event.line, event.col, this, event.raw);
                }
                parser.removeListener('tagstart', onTagStart);
                parser.removeListener('tagend', onTagEnd);
            }
        };
        parser.addListener('tagstart', onTagStart);
        parser.addListener('tagend', onTagEnd);
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGl0bGUtcmVxdWlyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb3JlL3J1bGVzL3RpdGxlLXJlcXVpcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQSxrQkFBZTtJQUNiLEVBQUUsRUFBRSxlQUFlO0lBQ25CLFdBQVcsRUFBRSx3Q0FBd0M7SUFDckQsSUFBSSxDQUFDLE1BQU0sRUFBRSxRQUFRO1FBQ25CLElBQUksU0FBUyxHQUFHLEtBQUssQ0FBQTtRQUNyQixJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUE7UUFFcEIsTUFBTSxVQUFVLEdBQWEsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNyQyxNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFBO1lBQzNDLElBQUksT0FBTyxLQUFLLE1BQU0sRUFBRTtnQkFDdEIsU0FBUyxHQUFHLElBQUksQ0FBQTthQUNqQjtpQkFBTSxJQUFJLE9BQU8sS0FBSyxPQUFPLElBQUksU0FBUyxFQUFFO2dCQUMzQyxRQUFRLEdBQUcsSUFBSSxDQUFBO2FBQ2hCO1FBQ0gsQ0FBQyxDQUFBO1FBRUQsTUFBTSxRQUFRLEdBQWEsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNuQyxNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFBO1lBQzNDLElBQUksUUFBUSxJQUFJLE9BQU8sS0FBSyxPQUFPLEVBQUU7Z0JBR25DLE1BQU0sU0FBUyxHQUFVLEtBQUssQ0FBQyxTQUFTLENBQUE7Z0JBQ3hDLElBQ0UsU0FBUyxDQUFDLElBQUksS0FBSyxNQUFNO29CQUN6QixDQUFDLFNBQVMsQ0FBQyxJQUFJLEtBQUssTUFBTSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLElBQUksQ0FBQyxFQUNuRTtvQkFDQSxRQUFRLENBQUMsS0FBSyxDQUNaLG9DQUFvQyxFQUNwQyxLQUFLLENBQUMsSUFBSSxFQUNWLEtBQUssQ0FBQyxHQUFHLEVBQ1QsSUFBSSxFQUNKLEtBQUssQ0FBQyxHQUFHLENBQ1YsQ0FBQTtpQkFDRjthQUNGO2lCQUFNLElBQUksT0FBTyxLQUFLLE1BQU0sRUFBRTtnQkFDN0IsSUFBSSxRQUFRLEtBQUssS0FBSyxFQUFFO29CQUN0QixRQUFRLENBQUMsS0FBSyxDQUNaLHdDQUF3QyxFQUN4QyxLQUFLLENBQUMsSUFBSSxFQUNWLEtBQUssQ0FBQyxHQUFHLEVBQ1QsSUFBSSxFQUNKLEtBQUssQ0FBQyxHQUFHLENBQ1YsQ0FBQTtpQkFDRjtnQkFFRCxNQUFNLENBQUMsY0FBYyxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQTtnQkFDN0MsTUFBTSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUE7YUFDMUM7UUFDSCxDQUFDLENBQUE7UUFFRCxNQUFNLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQTtRQUMxQyxNQUFNLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQTtJQUN4QyxDQUFDO0NBQ00sQ0FBQSJ9