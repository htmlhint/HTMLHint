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
        console.log("   " + chalk.white(event.file));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jbGkvZm9ybWF0dGVycy9kZWZhdWx0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQThCO0FBRzlCLElBQU0sZ0JBQWdCLEdBQXNCLFVBQzFDLFNBQVMsRUFDVCxRQUFRLEVBQ1IsT0FBTztJQUVQLElBQU0sT0FBTyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFBO0lBRWpDLFNBQVMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFO1FBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUE7SUFDakIsQ0FBQyxDQUFDLENBQUE7SUFFRixTQUFTLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxVQUFDLEtBQUs7UUFFM0IsSUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLFVBQVcsQ0FBQTtRQUNwQyxPQUFPLENBQUMsR0FBRyxDQUNULHNCQUFzQixFQUN0QixPQUFPLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FDOUMsQ0FBQTtRQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUE7SUFDakIsQ0FBQyxDQUFDLENBQUE7SUFFRixTQUFTLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxVQUFDLEtBQUs7UUFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFNLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBRyxDQUFDLENBQUE7UUFFNUMsSUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFO1lBQzlDLE1BQU0sRUFBRSxDQUFDLE9BQU87WUFDaEIsTUFBTSxFQUFFLENBQUM7U0FDVixDQUFDLENBQUE7UUFFRixPQUFPLENBQUMsT0FBTyxDQUFDLFVBQUMsR0FBRztZQUNsQixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ2xCLENBQUMsQ0FBQyxDQUFBO1FBRUYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUNqQixDQUFDLENBQUMsQ0FBQTtJQUVGLFNBQVMsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLFVBQUMsS0FBSztRQUN4QixJQUFNLFlBQVksR0FBRyxLQUFLLENBQUMsWUFBWSxDQUFBO1FBQ3ZDLElBQU0sWUFBWSxHQUFHLEtBQUssQ0FBQyxZQUFZLENBQUE7UUFDdkMsSUFBTSxnQkFBZ0IsR0FBRyxLQUFLLENBQUMsZ0JBQWdCLENBQUE7UUFDL0MsSUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQTtRQUN2QixJQUFJLE9BQU8sQ0FBQTtRQUVYLElBQUksWUFBWSxHQUFHLENBQUMsRUFBRTtZQUNwQixPQUFPLEdBQUcsdURBQXVELENBQUE7WUFDakUsT0FBTyxDQUFDLEdBQUcsQ0FDVCxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFDdEMsWUFBWSxFQUNaLFlBQVksRUFDWixnQkFBZ0IsRUFDaEIsSUFBSSxDQUNMLENBQUE7U0FDRjthQUFNO1lBQ0wsT0FBTyxHQUFHLDRDQUE0QyxDQUFBO1lBQ3RELE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUUsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFBO1NBQzFFO0lBQ0gsQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDLENBQUE7QUFFRCxNQUFNLENBQUMsT0FBTyxHQUFHLGdCQUFnQixDQUFBIn0=