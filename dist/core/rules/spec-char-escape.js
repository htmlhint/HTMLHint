"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    id: 'spec-char-escape',
    description: 'Special characters must be escaped.',
    init(parser, reporter) {
        parser.addListener('text', (event) => {
            const raw = event.raw;
            const reSpecChar = /([<>])/g;
            let match;
            while ((match = reSpecChar.exec(raw))) {
                const fixedPos = parser.fixPos(event, match.index);
                reporter.error(`Special characters must be escaped : [ ${match[0]} ].`, fixedPos.line, fixedPos.col, this, event.raw);
            }
        });
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BlYy1jaGFyLWVzY2FwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb3JlL3J1bGVzL3NwZWMtY2hhci1lc2NhcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSxrQkFBZTtJQUNiLEVBQUUsRUFBRSxrQkFBa0I7SUFDdEIsV0FBVyxFQUFFLHFDQUFxQztJQUNsRCxJQUFJLENBQUMsTUFBTSxFQUFFLFFBQVE7UUFDbkIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNuQyxNQUFNLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFBO1lBQ3JCLE1BQU0sVUFBVSxHQUFHLFNBQVMsQ0FBQTtZQUM1QixJQUFJLEtBQUssQ0FBQTtZQUVULE9BQU8sQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUM7Z0JBQ3RDLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTtnQkFDbEQsUUFBUSxDQUFDLEtBQUssQ0FDWiwwQ0FBMEMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQ3ZELFFBQVEsQ0FBQyxJQUFJLEVBQ2IsUUFBUSxDQUFDLEdBQUcsRUFDWixJQUFJLEVBQ0osS0FBSyxDQUFDLEdBQUcsQ0FDVixDQUFBO1lBQ0gsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNNLENBQUEifQ==