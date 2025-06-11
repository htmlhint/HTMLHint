"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk = require("chalk");
const unixFormatter = function (formatter, HTMLHint, options) {
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
module.exports = unixFormatter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5peC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jbGkvZm9ybWF0dGVycy91bml4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0JBQThCO0FBRzlCLE1BQU0sYUFBYSxHQUFzQixVQUN2QyxTQUFTLEVBQ1QsUUFBUSxFQUNSLE9BQU87SUFFUCxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFBO0lBRS9CLE1BQU0sYUFBYSxHQUNqQixPQUFPLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFBO0lBRTlELFNBQVMsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDN0IsS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUNqQyxPQUFPLENBQUMsR0FBRyxDQUNUO2dCQUNFLEtBQUssQ0FBQyxJQUFJO2dCQUNWLE9BQU8sQ0FBQyxJQUFJO2dCQUNaLE9BQU8sQ0FBQyxHQUFHO2dCQUNYLElBQUksT0FBTyxDQUFDLE9BQU8sS0FBSyxPQUFPLENBQUMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHO2FBQzNELENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUNaLENBQUE7UUFDSCxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUMsQ0FBQyxDQUFBO0lBRUYsU0FBUyxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUM1QixNQUFNLFlBQVksR0FBRyxLQUFLLENBQUMsWUFBWSxDQUFBO1FBQ3ZDLElBQUksWUFBWSxHQUFHLENBQUMsRUFBRSxDQUFDO1lBQ3JCLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUE7WUFDZixNQUFNLE9BQU8sR0FBRyxhQUFhLENBQUE7WUFDN0IsT0FBTyxDQUFDLEdBQUcsQ0FDVCxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFDOUMsS0FBSyxDQUFDLFlBQVksQ0FDbkIsQ0FBQTtRQUNILENBQUM7SUFDSCxDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQTtBQUVELE1BQU0sQ0FBQyxPQUFPLEdBQUcsYUFBYSxDQUFBIn0=