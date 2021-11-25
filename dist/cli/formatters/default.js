"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk = require("chalk");
var defaultFormatter = function (formatter, HTMLHint, options) {
    var nocolor = !!options.nocolor;
    formatter.on('start', function () {
        console.log('');
    });
    formatter.on('config', function (event) {
        var configPath = event.configPath;
        console.log('   Config loaded: %s', nocolor ? configPath : chalk.cyan(configPath));
        console.log('');
    });
    formatter.on('file', function (event) {
        console.log("   ".concat(chalk.white(event.file)));
        var arrLogs = HTMLHint.format(event.messages, {
            colors: !nocolor,
            indent: 6,
        });
        arrLogs.forEach(function (str) {
            console.log(str);
        });
        console.log('');
    });
    formatter.on('end', function (event) {
        var allFileCount = event.allFileCount;
        var allHintCount = event.allHintCount;
        var allHintFileCount = event.allHintFileCount;
        var time = event.time;
        var message;
        if (allHintCount > 0) {
            message = 'Scanned %d files, found %d errors in %d files (%d ms)';
            console.log(nocolor ? message : chalk.red(message), allFileCount, allHintCount, allHintFileCount, time);
        }
        else {
            message = 'Scanned %d files, no errors found (%d ms).';
            console.log(nocolor ? message : chalk.green(message), allFileCount, time);
        }
    });
};
module.exports = defaultFormatter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jbGkvZm9ybWF0dGVycy9kZWZhdWx0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQThCO0FBRzlCLElBQU0sZ0JBQWdCLEdBQXNCLFVBQzFDLFNBQVMsRUFDVCxRQUFRLEVBQ1IsT0FBTztJQUVQLElBQU0sT0FBTyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFBO0lBRWpDLFNBQVMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFO1FBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUE7SUFDakIsQ0FBQyxDQUFDLENBQUE7SUFFRixTQUFTLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxVQUFDLEtBQUs7UUFFM0IsSUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLFVBQVcsQ0FBQTtRQUNwQyxPQUFPLENBQUMsR0FBRyxDQUNULHNCQUFzQixFQUN0QixPQUFPLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FDOUMsQ0FBQTtRQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUE7SUFDakIsQ0FBQyxDQUFDLENBQUE7SUFFRixTQUFTLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxVQUFDLEtBQUs7UUFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFNLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFFLENBQUMsQ0FBQTtRQUU1QyxJQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUU7WUFDOUMsTUFBTSxFQUFFLENBQUMsT0FBTztZQUNoQixNQUFNLEVBQUUsQ0FBQztTQUNWLENBQUMsQ0FBQTtRQUVGLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBQyxHQUFHO1lBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDbEIsQ0FBQyxDQUFDLENBQUE7UUFFRixPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFBO0lBQ2pCLENBQUMsQ0FBQyxDQUFBO0lBRUYsU0FBUyxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsVUFBQyxLQUFLO1FBQ3hCLElBQU0sWUFBWSxHQUFHLEtBQUssQ0FBQyxZQUFZLENBQUE7UUFDdkMsSUFBTSxZQUFZLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQTtRQUN2QyxJQUFNLGdCQUFnQixHQUFHLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQTtRQUMvQyxJQUFNLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFBO1FBQ3ZCLElBQUksT0FBTyxDQUFBO1FBRVgsSUFBSSxZQUFZLEdBQUcsQ0FBQyxFQUFFO1lBQ3BCLE9BQU8sR0FBRyx1REFBdUQsQ0FBQTtZQUNqRSxPQUFPLENBQUMsR0FBRyxDQUNULE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUN0QyxZQUFZLEVBQ1osWUFBWSxFQUNaLGdCQUFnQixFQUNoQixJQUFJLENBQ0wsQ0FBQTtTQUNGO2FBQU07WUFDTCxPQUFPLEdBQUcsNENBQTRDLENBQUE7WUFDdEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUE7U0FDMUU7SUFDSCxDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQTtBQUVELE1BQU0sQ0FBQyxPQUFPLEdBQUcsZ0JBQWdCLENBQUEifQ==