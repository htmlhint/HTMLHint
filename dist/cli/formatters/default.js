"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const defaultFormatter = function (formatter, HTMLHint, options) {
    const nocolor = !!options.nocolor;
    formatter.on('start', () => {
        console.log('');
    });
    formatter.on('config', (event) => {
        const configPath = event.configPath;
        console.log('   Config loaded: %s', nocolor ? configPath : chalk_1.default.cyan(configPath));
        console.log('');
    });
    formatter.on('file', (event) => {
        console.log(`   ${chalk_1.default.white(event.file)}`);
        const arrLogs = HTMLHint.format(event.messages, {
            colors: !nocolor,
            indent: 6,
        });
        arrLogs.forEach((str) => {
            console.log(str);
        });
        console.log('');
    });
    formatter.on('end', (event) => {
        const allFileCount = event.allFileCount;
        const allHintCount = event.allHintCount;
        const allHintFileCount = event.allHintFileCount;
        const time = event.time;
        let message;
        if (allHintCount > 0) {
            message = 'Scanned %d files, found %d errors in %d files (%d ms)';
            console.log(nocolor ? message : chalk_1.default.red(message), allFileCount, allHintCount, allHintFileCount, time);
        }
        else {
            message = 'Scanned %d files, no errors found (%d ms).';
            console.log(nocolor ? message : chalk_1.default.green(message), allFileCount, time);
        }
    });
};
module.exports = defaultFormatter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jbGkvZm9ybWF0dGVycy9kZWZhdWx0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0RBQXlCO0FBR3pCLE1BQU0sZ0JBQWdCLEdBQXNCLFVBQzFDLFNBQVMsRUFDVCxRQUFRLEVBQ1IsT0FBTztJQUVQLE1BQU0sT0FBTyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFBO0lBRWpDLFNBQVMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTtRQUN6QixPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFBO0lBQ2pCLENBQUMsQ0FBQyxDQUFBO0lBRUYsU0FBUyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUUvQixNQUFNLFVBQVUsR0FBRyxLQUFLLENBQUMsVUFBVyxDQUFBO1FBQ3BDLE9BQU8sQ0FBQyxHQUFHLENBQ1Qsc0JBQXNCLEVBQ3RCLE9BQU8sQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxlQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUM5QyxDQUFBO1FBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUNqQixDQUFDLENBQUMsQ0FBQTtJQUVGLFNBQVMsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDN0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLGVBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUU1QyxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUU7WUFDOUMsTUFBTSxFQUFFLENBQUMsT0FBTztZQUNoQixNQUFNLEVBQUUsQ0FBQztTQUNWLENBQUMsQ0FBQTtRQUVGLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ2xCLENBQUMsQ0FBQyxDQUFBO1FBRUYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUNqQixDQUFDLENBQUMsQ0FBQTtJQUVGLFNBQVMsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDNUIsTUFBTSxZQUFZLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQTtRQUN2QyxNQUFNLFlBQVksR0FBRyxLQUFLLENBQUMsWUFBWSxDQUFBO1FBQ3ZDLE1BQU0sZ0JBQWdCLEdBQUcsS0FBSyxDQUFDLGdCQUFnQixDQUFBO1FBQy9DLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUE7UUFDdkIsSUFBSSxPQUFPLENBQUE7UUFFWCxJQUFJLFlBQVksR0FBRyxDQUFDLEVBQUU7WUFDcEIsT0FBTyxHQUFHLHVEQUF1RCxDQUFBO1lBQ2pFLE9BQU8sQ0FBQyxHQUFHLENBQ1QsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLGVBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQ3RDLFlBQVksRUFDWixZQUFZLEVBQ1osZ0JBQWdCLEVBQ2hCLElBQUksQ0FDTCxDQUFBO1NBQ0Y7YUFBTTtZQUNMLE9BQU8sR0FBRyw0Q0FBNEMsQ0FBQTtZQUN0RCxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxlQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQTtTQUMxRTtJQUNILENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFBO0FBRUQsTUFBTSxDQUFDLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQSJ9