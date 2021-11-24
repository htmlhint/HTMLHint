"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk = require("chalk");
var compactFormatter = function (formatter, HTMLHint, options) {
    var nocolor = options.nocolor;
    var chalkInstance = nocolor !== false ? new chalk.Instance({ level: 1 }) : chalk;
    formatter.on('file', function (event) {
        event.messages.forEach(function (message) {
            console.log('%s: line %d, col %d, %s - %s (%s)', event.file, message.line, message.col, message.type, message.message, message.rule.id);
        });
    });
    formatter.on('end', function (event) {
        var allHintCount = event.allHintCount;
        if (allHintCount > 0) {
            console.log('');
            var message = '%d problems';
            console.log(nocolor ? message : chalkInstance.red(message), event.allHintCount);
        }
    });
};
module.exports = compactFormatter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGFjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jbGkvZm9ybWF0dGVycy9jb21wYWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQThCO0FBRzlCLElBQU0sZ0JBQWdCLEdBQXNCLFVBQzFDLFNBQVMsRUFDVCxRQUFRLEVBQ1IsT0FBTztJQUVQLElBQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUE7SUFFL0IsSUFBTSxhQUFhLEdBQ2pCLE9BQU8sS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUE7SUFFOUQsU0FBUyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsVUFBQyxLQUFLO1FBQ3pCLEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQUMsT0FBTztZQUM3QixPQUFPLENBQUMsR0FBRyxDQUNULG1DQUFtQyxFQUNuQyxLQUFLLENBQUMsSUFBSSxFQUNWLE9BQU8sQ0FBQyxJQUFJLEVBQ1osT0FBTyxDQUFDLEdBQUcsRUFDWCxPQUFPLENBQUMsSUFBSSxFQUNaLE9BQU8sQ0FBQyxPQUFPLEVBQ2YsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQ2hCLENBQUE7UUFDSCxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUMsQ0FBQyxDQUFBO0lBRUYsU0FBUyxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsVUFBQyxLQUFLO1FBQ3hCLElBQU0sWUFBWSxHQUFHLEtBQUssQ0FBQyxZQUFZLENBQUE7UUFDdkMsSUFBSSxZQUFZLEdBQUcsQ0FBQyxFQUFFO1lBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUE7WUFDZixJQUFNLE9BQU8sR0FBRyxhQUFhLENBQUE7WUFDN0IsT0FBTyxDQUFDLEdBQUcsQ0FDVCxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFDOUMsS0FBSyxDQUFDLFlBQVksQ0FDbkIsQ0FBQTtTQUNGO0lBQ0gsQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDLENBQUE7QUFFRCxNQUFNLENBQUMsT0FBTyxHQUFHLGdCQUFnQixDQUFBIn0=