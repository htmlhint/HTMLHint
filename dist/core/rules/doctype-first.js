"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    id: 'doctype-first',
    description: 'Doctype must be declared first (comments and whitespace allowed before DOCTYPE).',
    init(parser, reporter) {
        let doctypeFound = false;
        let nonCommentContentBeforeDoctype = false;
        const allEvent = (event) => {
            if (event.type === 'start' ||
                (event.type === 'text' && /^\s*$/.test(event.raw))) {
                return;
            }
            if (doctypeFound) {
                return;
            }
            if (event.type === 'comment' &&
                event.long === false &&
                /^DOCTYPE\s+/i.test(event.content)) {
                doctypeFound = true;
                if (nonCommentContentBeforeDoctype) {
                    reporter.error('Doctype must be declared before any non-comment content.', event.line, event.col, this, event.raw);
                }
                return;
            }
            if (event.type === 'comment') {
                return;
            }
            nonCommentContentBeforeDoctype = true;
            reporter.error('Doctype must be declared before any non-comment content.', event.line, event.col, this, event.raw);
            parser.removeListener('all', allEvent);
        };
        parser.addListener('all', allEvent);
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jdHlwZS1maXJzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb3JlL3J1bGVzL2RvY3R5cGUtZmlyc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQSxrQkFBZTtJQUNiLEVBQUUsRUFBRSxlQUFlO0lBQ25CLFdBQVcsRUFDVCxrRkFBa0Y7SUFDcEYsSUFBSSxDQUFDLE1BQU0sRUFBRSxRQUFRO1FBQ25CLElBQUksWUFBWSxHQUFHLEtBQUssQ0FBQTtRQUN4QixJQUFJLDhCQUE4QixHQUFHLEtBQUssQ0FBQTtRQUUxQyxNQUFNLFFBQVEsR0FBYSxDQUFDLEtBQUssRUFBRSxFQUFFO1lBRW5DLElBQ0UsS0FBSyxDQUFDLElBQUksS0FBSyxPQUFPO2dCQUN0QixDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssTUFBTSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQ2xELENBQUM7Z0JBQ0QsT0FBTTtZQUNSLENBQUM7WUFHRCxJQUFJLFlBQVksRUFBRSxDQUFDO2dCQUNqQixPQUFNO1lBQ1IsQ0FBQztZQUdELElBQ0UsS0FBSyxDQUFDLElBQUksS0FBSyxTQUFTO2dCQUN4QixLQUFLLENBQUMsSUFBSSxLQUFLLEtBQUs7Z0JBQ3BCLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUNsQyxDQUFDO2dCQUNELFlBQVksR0FBRyxJQUFJLENBQUE7Z0JBQ25CLElBQUksOEJBQThCLEVBQUUsQ0FBQztvQkFFbkMsUUFBUSxDQUFDLEtBQUssQ0FDWiwwREFBMEQsRUFDMUQsS0FBSyxDQUFDLElBQUksRUFDVixLQUFLLENBQUMsR0FBRyxFQUNULElBQUksRUFDSixLQUFLLENBQUMsR0FBRyxDQUNWLENBQUE7Z0JBQ0gsQ0FBQztnQkFDRCxPQUFNO1lBQ1IsQ0FBQztZQUdELElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxTQUFTLEVBQUUsQ0FBQztnQkFDN0IsT0FBTTtZQUNSLENBQUM7WUFHRCw4QkFBOEIsR0FBRyxJQUFJLENBQUE7WUFHckMsUUFBUSxDQUFDLEtBQUssQ0FDWiwwREFBMEQsRUFDMUQsS0FBSyxDQUFDLElBQUksRUFDVixLQUFLLENBQUMsR0FBRyxFQUNULElBQUksRUFDSixLQUFLLENBQUMsR0FBRyxDQUNWLENBQUE7WUFHRCxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQTtRQUN4QyxDQUFDLENBQUE7UUFFRCxNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQTtJQUNyQyxDQUFDO0NBQ00sQ0FBQSJ9