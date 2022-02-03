"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    id: 'doctype-first',
    description: 'Doctype must be declared first.',
    init(parser, reporter) {
        const allEvent = (event) => {
            if (event.type === 'start' ||
                (event.type === 'text' && /^\s*$/.test(event.raw))) {
                return;
            }
            if ((event.type !== 'comment' && event.long === false) ||
                /^DOCTYPE\s+/i.test(event.content) === false) {
                reporter.error('Doctype must be declared first.', event.line, event.col, this, event.raw);
            }
            parser.removeListener('all', allEvent);
        };
        parser.addListener('all', allEvent);
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jdHlwZS1maXJzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb3JlL3J1bGVzL2RvY3R5cGUtZmlyc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQSxrQkFBZTtJQUNiLEVBQUUsRUFBRSxlQUFlO0lBQ25CLFdBQVcsRUFBRSxpQ0FBaUM7SUFDOUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxRQUFRO1FBQ25CLE1BQU0sUUFBUSxHQUFhLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDbkMsSUFDRSxLQUFLLENBQUMsSUFBSSxLQUFLLE9BQU87Z0JBQ3RCLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxNQUFNLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsRUFDbEQ7Z0JBQ0EsT0FBTTthQUNQO1lBRUQsSUFDRSxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssU0FBUyxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssS0FBSyxDQUFDO2dCQUNsRCxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxLQUFLLEVBQzVDO2dCQUNBLFFBQVEsQ0FBQyxLQUFLLENBQ1osaUNBQWlDLEVBQ2pDLEtBQUssQ0FBQyxJQUFJLEVBQ1YsS0FBSyxDQUFDLEdBQUcsRUFDVCxJQUFJLEVBQ0osS0FBSyxDQUFDLEdBQUcsQ0FDVixDQUFBO2FBQ0Y7WUFFRCxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQTtRQUN4QyxDQUFDLENBQUE7UUFFRCxNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQTtJQUNyQyxDQUFDO0NBQ00sQ0FBQSJ9