"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var markdownFormatter = function (formatter, HTMLHint) {
    formatter.on('end', function (event) {
        console.log('# TOC');
        var arrToc = [];
        var arrContents = [];
        var arrAllMessages = event.arrAllMessages;
        arrAllMessages.forEach(function (fileInfo) {
            var filePath = fileInfo.file;
            var arrMessages = fileInfo.messages;
            var errorCount = 0;
            var warningCount = 0;
            arrMessages.forEach(function (message) {
                if (message.type === 'error') {
                    errorCount++;
                }
                else {
                    warningCount++;
                }
            });
            arrToc.push("   - [".concat(filePath, "](#").concat(filePath, ")"));
            arrContents.push("<a name=\"".concat(filePath, "\" />"));
            arrContents.push("# ".concat(filePath));
            arrContents.push('');
            arrContents.push("Found ".concat(errorCount, " errors, ").concat(warningCount, " warnings"));
            var arrLogs = HTMLHint.format(arrMessages);
            arrContents.push('');
            arrLogs.forEach(function (log) {
                arrContents.push("    ".concat(log));
            });
            arrContents.push('');
        });
        console.log("".concat(arrToc.join('\r\n'), "\r\n"));
        console.log(arrContents.join('\r\n'));
    });
};
module.exports = markdownFormatter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY2xpL2Zvcm1hdHRlcnMvbWFya2Rvd24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSxJQUFNLGlCQUFpQixHQUFzQixVQUFVLFNBQVMsRUFBRSxRQUFRO0lBQ3hFLFNBQVMsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLFVBQUMsS0FBSztRQUN4QixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBRXBCLElBQU0sTUFBTSxHQUFhLEVBQUUsQ0FBQTtRQUMzQixJQUFNLFdBQVcsR0FBYSxFQUFFLENBQUE7UUFDaEMsSUFBTSxjQUFjLEdBQUcsS0FBSyxDQUFDLGNBQWMsQ0FBQTtRQUUzQyxjQUFjLENBQUMsT0FBTyxDQUFDLFVBQUMsUUFBUTtZQUM5QixJQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFBO1lBQzlCLElBQU0sV0FBVyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUE7WUFDckMsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFBO1lBQ2xCLElBQUksWUFBWSxHQUFHLENBQUMsQ0FBQTtZQUVwQixXQUFXLENBQUMsT0FBTyxDQUFDLFVBQUMsT0FBTztnQkFDMUIsSUFBSSxPQUFPLENBQUMsSUFBSSxLQUFLLE9BQU8sRUFBRTtvQkFDNUIsVUFBVSxFQUFFLENBQUE7aUJBQ2I7cUJBQU07b0JBQ0wsWUFBWSxFQUFFLENBQUE7aUJBQ2Y7WUFDSCxDQUFDLENBQUMsQ0FBQTtZQUVGLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQVMsUUFBUSxnQkFBTSxRQUFRLE1BQUcsQ0FBQyxDQUFBO1lBQy9DLFdBQVcsQ0FBQyxJQUFJLENBQUMsb0JBQVksUUFBUSxVQUFNLENBQUMsQ0FBQTtZQUM1QyxXQUFXLENBQUMsSUFBSSxDQUFDLFlBQUssUUFBUSxDQUFFLENBQUMsQ0FBQTtZQUNqQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO1lBQ3BCLFdBQVcsQ0FBQyxJQUFJLENBQUMsZ0JBQVMsVUFBVSxzQkFBWSxZQUFZLGNBQVcsQ0FBQyxDQUFBO1lBRXhFLElBQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUE7WUFDNUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQTtZQUNwQixPQUFPLENBQUMsT0FBTyxDQUFDLFVBQUMsR0FBRztnQkFDbEIsV0FBVyxDQUFDLElBQUksQ0FBQyxjQUFPLEdBQUcsQ0FBRSxDQUFDLENBQUE7WUFDaEMsQ0FBQyxDQUFDLENBQUE7WUFDRixXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQ3RCLENBQUMsQ0FBQyxDQUFBO1FBRUYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQU0sQ0FBQyxDQUFBO1FBQ3pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFBO0lBQ3ZDLENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFBO0FBRUQsTUFBTSxDQUFDLE9BQU8sR0FBRyxpQkFBaUIsQ0FBQSJ9