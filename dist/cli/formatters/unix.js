"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk = require("chalk");
const unixFormatter = function unixFormatter(formatter, HTMLHint, options) {
    const nocolor = options.nocolor;
    const chalkInstance = nocolor !== false ? new chalk.Instance({ level: 1 }) : chalk;
    formatter.on('file', (event) => {
        event.messages.forEach((message) => {
            console.log([
                event.file,
                message.line,
                message.col,
                ` ${message.message} [${message.type}/${message.rule.id}]`,
            ].join(':'));
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
exports.default = unixFormatter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5peC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jbGkvZm9ybWF0dGVycy91bml4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0JBQThCO0FBRzlCLE1BQU0sYUFBYSxHQUFzQixTQUFTLGFBQWEsQ0FDN0QsU0FBUyxFQUNULFFBQVEsRUFDUixPQUFPO0lBRVAsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQTtJQUUvQixNQUFNLGFBQWEsR0FDakIsT0FBTyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQTtJQUU5RCxTQUFTLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO1FBQzdCLEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDakMsT0FBTyxDQUFDLEdBQUcsQ0FDVDtnQkFDRSxLQUFLLENBQUMsSUFBSTtnQkFDVixPQUFPLENBQUMsSUFBSTtnQkFDWixPQUFPLENBQUMsR0FBRztnQkFDWCxJQUFJLE9BQU8sQ0FBQyxPQUFPLEtBQUssT0FBTyxDQUFDLElBQUksSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRzthQUMzRCxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FDWixDQUFBO1FBQ0gsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDLENBQUMsQ0FBQTtJQUVGLFNBQVMsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDNUIsTUFBTSxZQUFZLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQTtRQUN2QyxJQUFJLFlBQVksR0FBRyxDQUFDLEVBQUU7WUFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQTtZQUNmLE1BQU0sT0FBTyxHQUFHLGFBQWEsQ0FBQTtZQUM3QixPQUFPLENBQUMsR0FBRyxDQUNULE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUM5QyxLQUFLLENBQUMsWUFBWSxDQUNuQixDQUFBO1NBQ0Y7SUFDSCxDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQTtBQUVELGtCQUFlLGFBQWEsQ0FBQSJ9