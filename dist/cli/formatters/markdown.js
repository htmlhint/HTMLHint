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
            arrToc.push("   - [" + filePath + "](#" + filePath + ")");
            arrContents.push("<a name=\"" + filePath + "\" />");
            arrContents.push("# " + filePath);
            arrContents.push('');
            arrContents.push("Found " + errorCount + " errors, " + warningCount + " warnings");
            var arrLogs = HTMLHint.format(arrMessages);
            arrContents.push('');
            arrLogs.forEach(function (log) {
                arrContents.push("    " + log);
            });
            arrContents.push('');
        });
        console.log(arrToc.join('\r\n') + "\r\n");
        console.log(arrContents.join('\r\n'));
    });
};
module.exports = markdownFormatter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY2xpL2Zvcm1hdHRlcnMvbWFya2Rvd24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSxJQUFNLGlCQUFpQixHQUFzQixVQUFVLFNBQVMsRUFBRSxRQUFRO0lBQ3hFLFNBQVMsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLFVBQUMsS0FBSztRQUN4QixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBRXBCLElBQU0sTUFBTSxHQUFhLEVBQUUsQ0FBQTtRQUMzQixJQUFNLFdBQVcsR0FBYSxFQUFFLENBQUE7UUFDaEMsSUFBTSxjQUFjLEdBQUcsS0FBSyxDQUFDLGNBQWMsQ0FBQTtRQUUzQyxjQUFjLENBQUMsT0FBTyxDQUFDLFVBQUMsUUFBUTtZQUM5QixJQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFBO1lBQzlCLElBQU0sV0FBVyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUE7WUFDckMsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFBO1lBQ2xCLElBQUksWUFBWSxHQUFHLENBQUMsQ0FBQTtZQUVwQixXQUFXLENBQUMsT0FBTyxDQUFDLFVBQUMsT0FBTztnQkFDMUIsSUFBSSxPQUFPLENBQUMsSUFBSSxLQUFLLE9BQU8sRUFBRTtvQkFDNUIsVUFBVSxFQUFFLENBQUE7aUJBQ2I7cUJBQU07b0JBQ0wsWUFBWSxFQUFFLENBQUE7aUJBQ2Y7WUFDSCxDQUFDLENBQUMsQ0FBQTtZQUVGLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBUyxRQUFRLFdBQU0sUUFBUSxNQUFHLENBQUMsQ0FBQTtZQUMvQyxXQUFXLENBQUMsSUFBSSxDQUFDLGVBQVksUUFBUSxVQUFNLENBQUMsQ0FBQTtZQUM1QyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQUssUUFBVSxDQUFDLENBQUE7WUFDakMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQTtZQUNwQixXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVMsVUFBVSxpQkFBWSxZQUFZLGNBQVcsQ0FBQyxDQUFBO1lBRXhFLElBQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUE7WUFDNUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQTtZQUNwQixPQUFPLENBQUMsT0FBTyxDQUFDLFVBQUMsR0FBRztnQkFDbEIsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFPLEdBQUssQ0FBQyxDQUFBO1lBQ2hDLENBQUMsQ0FBQyxDQUFBO1lBQ0YsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUN0QixDQUFDLENBQUMsQ0FBQTtRQUVGLE9BQU8sQ0FBQyxHQUFHLENBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBTSxDQUFDLENBQUE7UUFDekMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUE7SUFDdkMsQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDLENBQUE7QUFFRCxNQUFNLENBQUMsT0FBTyxHQUFHLGlCQUFpQixDQUFBIn0=