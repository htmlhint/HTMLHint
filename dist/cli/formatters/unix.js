"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk = require("chalk");
var unixFormatter = function (formatter, HTMLHint, options) {
    var nocolor = options.nocolor;
    var chalkInstance = nocolor !== false ? new chalk.Instance({ level: 1 }) : chalk;
    formatter.on('file', function (event) {
        event.messages.forEach(function (message) {
            console.log([
                event.file,
                message.line,
                message.col,
                " ".concat(message.message, " [").concat(message.type, "/").concat(message.rule.id, "]"),
            ].join(':'));
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
module.exports = unixFormatter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5peC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jbGkvZm9ybWF0dGVycy91bml4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQThCO0FBRzlCLElBQU0sYUFBYSxHQUFzQixVQUN2QyxTQUFTLEVBQ1QsUUFBUSxFQUNSLE9BQU87SUFFUCxJQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFBO0lBRS9CLElBQU0sYUFBYSxHQUNqQixPQUFPLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFBO0lBRTlELFNBQVMsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLFVBQUMsS0FBSztRQUN6QixLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFDLE9BQU87WUFDN0IsT0FBTyxDQUFDLEdBQUcsQ0FDVDtnQkFDRSxLQUFLLENBQUMsSUFBSTtnQkFDVixPQUFPLENBQUMsSUFBSTtnQkFDWixPQUFPLENBQUMsR0FBRztnQkFDWCxXQUFJLE9BQU8sQ0FBQyxPQUFPLGVBQUssT0FBTyxDQUFDLElBQUksY0FBSSxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBRzthQUMzRCxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FDWixDQUFBO1FBQ0gsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDLENBQUMsQ0FBQTtJQUVGLFNBQVMsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLFVBQUMsS0FBSztRQUN4QixJQUFNLFlBQVksR0FBRyxLQUFLLENBQUMsWUFBWSxDQUFBO1FBQ3ZDLElBQUksWUFBWSxHQUFHLENBQUMsRUFBRTtZQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFBO1lBQ2YsSUFBTSxPQUFPLEdBQUcsYUFBYSxDQUFBO1lBQzdCLE9BQU8sQ0FBQyxHQUFHLENBQ1QsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQzlDLEtBQUssQ0FBQyxZQUFZLENBQ25CLENBQUE7U0FDRjtJQUNILENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFBO0FBRUQsTUFBTSxDQUFDLE9BQU8sR0FBRyxhQUFhLENBQUEifQ==