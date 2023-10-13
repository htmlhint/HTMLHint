"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk = require("chalk");
const compactFormatter = function compactFormatter(formatter, HTMLHint, options) {
    const nocolor = options.nocolor;
    const chalkInstance = nocolor !== false ? new chalk.Instance({ level: 1 }) : chalk;
    formatter.on('file', (event) => {
        event.messages.forEach((message) => {
            console.log('%s: line %d, col %d, %s - %s (%s)', event.file, message.line, message.col, message.type, message.message, message.rule.id);
        });
    });
    formatter.on('end', (event) => {
        const allHintCount = event.allHintCount;
        if (allHintCount > 0) {
            console.log('');
            const message = '%d problems';
            console.log(nocolor ? message : chalkInstance.red(message), event.allHintCount);
        }
    });
};
exports.default = compactFormatter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGFjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jbGkvZm9ybWF0dGVycy9jb21wYWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0JBQThCO0FBRzlCLE1BQU0sZ0JBQWdCLEdBQXNCLFNBQVMsZ0JBQWdCLENBQ25FLFNBQVMsRUFDVCxRQUFRLEVBQ1IsT0FBTztJQUVQLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUE7SUFFL0IsTUFBTSxhQUFhLEdBQ2pCLE9BQU8sS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUE7SUFFOUQsU0FBUyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUM3QixLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ2pDLE9BQU8sQ0FBQyxHQUFHLENBQ1QsbUNBQW1DLEVBQ25DLEtBQUssQ0FBQyxJQUFJLEVBQ1YsT0FBTyxDQUFDLElBQUksRUFDWixPQUFPLENBQUMsR0FBRyxFQUNYLE9BQU8sQ0FBQyxJQUFJLEVBQ1osT0FBTyxDQUFDLE9BQU8sRUFDZixPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FDaEIsQ0FBQTtRQUNILENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQyxDQUFDLENBQUE7SUFFRixTQUFTLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO1FBQzVCLE1BQU0sWUFBWSxHQUFHLEtBQUssQ0FBQyxZQUFZLENBQUE7UUFDdkMsSUFBSSxZQUFZLEdBQUcsQ0FBQyxFQUFFO1lBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUE7WUFDZixNQUFNLE9BQU8sR0FBRyxhQUFhLENBQUE7WUFDN0IsT0FBTyxDQUFDLEdBQUcsQ0FDVCxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFDOUMsS0FBSyxDQUFDLFlBQVksQ0FDbkIsQ0FBQTtTQUNGO0lBQ0gsQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDLENBQUE7QUFFRCxrQkFBZSxnQkFBZ0IsQ0FBQSJ9