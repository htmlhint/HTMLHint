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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jdHlwZS1maXJzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb3JlL3J1bGVzL2RvY3R5cGUtZmlyc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQSxrQkFBZTtJQUNiLEVBQUUsRUFBRSxlQUFlO0lBQ25CLFdBQVcsRUFDVCxrRkFBa0Y7SUFDcEYsSUFBSSxDQUFDLE1BQU0sRUFBRSxRQUFRO1FBQ25CLElBQUksWUFBWSxHQUFHLEtBQUssQ0FBQTtRQUN4QixJQUFJLDhCQUE4QixHQUFHLEtBQUssQ0FBQTtRQUUxQyxNQUFNLFFBQVEsR0FBYSxDQUFDLEtBQUssRUFBRSxFQUFFO1lBRW5DLElBQ0UsS0FBSyxDQUFDLElBQUksS0FBSyxPQUFPO2dCQUN0QixDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssTUFBTSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQ2xEO2dCQUNBLE9BQU07YUFDUDtZQUdELElBQUksWUFBWSxFQUFFO2dCQUNoQixPQUFNO2FBQ1A7WUFHRCxJQUNFLEtBQUssQ0FBQyxJQUFJLEtBQUssU0FBUztnQkFDeEIsS0FBSyxDQUFDLElBQUksS0FBSyxLQUFLO2dCQUNwQixjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFDbEM7Z0JBQ0EsWUFBWSxHQUFHLElBQUksQ0FBQTtnQkFDbkIsSUFBSSw4QkFBOEIsRUFBRTtvQkFFbEMsUUFBUSxDQUFDLEtBQUssQ0FDWiwwREFBMEQsRUFDMUQsS0FBSyxDQUFDLElBQUksRUFDVixLQUFLLENBQUMsR0FBRyxFQUNULElBQUksRUFDSixLQUFLLENBQUMsR0FBRyxDQUNWLENBQUE7aUJBQ0Y7Z0JBQ0QsT0FBTTthQUNQO1lBR0QsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLFNBQVMsRUFBRTtnQkFDNUIsT0FBTTthQUNQO1lBR0QsOEJBQThCLEdBQUcsSUFBSSxDQUFBO1lBR3JDLFFBQVEsQ0FBQyxLQUFLLENBQ1osMERBQTBELEVBQzFELEtBQUssQ0FBQyxJQUFJLEVBQ1YsS0FBSyxDQUFDLEdBQUcsRUFDVCxJQUFJLEVBQ0osS0FBSyxDQUFDLEdBQUcsQ0FDVixDQUFBO1lBR0QsTUFBTSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUE7UUFDeEMsQ0FBQyxDQUFBO1FBRUQsTUFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFDckMsQ0FBQztDQUNNLENBQUEifQ==