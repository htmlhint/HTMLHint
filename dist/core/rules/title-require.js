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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGl0bGUtcmVxdWlyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb3JlL3J1bGVzL3RpdGxlLXJlcXVpcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQSxrQkFBZTtJQUNiLEVBQUUsRUFBRSxlQUFlO0lBQ25CLFdBQVcsRUFBRSx3Q0FBd0M7SUFDckQsSUFBSSxDQUFDLE1BQU0sRUFBRSxRQUFRO1FBQ25CLElBQUksU0FBUyxHQUFHLEtBQUssQ0FBQTtRQUNyQixJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUE7UUFFcEIsTUFBTSxVQUFVLEdBQWEsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNyQyxNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFBO1lBQzNDLElBQUksT0FBTyxLQUFLLE1BQU0sRUFBRSxDQUFDO2dCQUN2QixTQUFTLEdBQUcsSUFBSSxDQUFBO1lBQ2xCLENBQUM7aUJBQU0sSUFBSSxPQUFPLEtBQUssT0FBTyxJQUFJLFNBQVMsRUFBRSxDQUFDO2dCQUM1QyxRQUFRLEdBQUcsSUFBSSxDQUFBO1lBQ2pCLENBQUM7UUFDSCxDQUFDLENBQUE7UUFFRCxNQUFNLFFBQVEsR0FBYSxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ25DLE1BQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUE7WUFDM0MsSUFBSSxRQUFRLElBQUksT0FBTyxLQUFLLE9BQU8sRUFBRSxDQUFDO2dCQUdwQyxNQUFNLFNBQVMsR0FBVSxLQUFLLENBQUMsU0FBUyxDQUFBO2dCQUN4QyxJQUNFLFNBQVMsQ0FBQyxJQUFJLEtBQUssTUFBTTtvQkFDekIsQ0FBQyxTQUFTLENBQUMsSUFBSSxLQUFLLE1BQU0sSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsS0FBSyxJQUFJLENBQUMsRUFDbkUsQ0FBQztvQkFDRCxRQUFRLENBQUMsS0FBSyxDQUNaLG9DQUFvQyxFQUNwQyxLQUFLLENBQUMsSUFBSSxFQUNWLEtBQUssQ0FBQyxHQUFHLEVBQ1QsSUFBSSxFQUNKLEtBQUssQ0FBQyxHQUFHLENBQ1YsQ0FBQTtnQkFDSCxDQUFDO1lBQ0gsQ0FBQztpQkFBTSxJQUFJLE9BQU8sS0FBSyxNQUFNLEVBQUUsQ0FBQztnQkFDOUIsSUFBSSxRQUFRLEtBQUssS0FBSyxFQUFFLENBQUM7b0JBQ3ZCLFFBQVEsQ0FBQyxLQUFLLENBQ1osd0NBQXdDLEVBQ3hDLEtBQUssQ0FBQyxJQUFJLEVBQ1YsS0FBSyxDQUFDLEdBQUcsRUFDVCxJQUFJLEVBQ0osS0FBSyxDQUFDLEdBQUcsQ0FDVixDQUFBO2dCQUNILENBQUM7Z0JBRUQsTUFBTSxDQUFDLGNBQWMsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUE7Z0JBQzdDLE1BQU0sQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFBO1lBQzNDLENBQUM7UUFDSCxDQUFDLENBQUE7UUFFRCxNQUFNLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQTtRQUMxQyxNQUFNLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQTtJQUN4QyxDQUFDO0NBQ00sQ0FBQSJ9