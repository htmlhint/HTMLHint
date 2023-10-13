"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const htmlFormatter = function htmlFormatter(formatter) {
    formatter.on('end', (event) => {
        let fileContent = '<html>';
        fileContent += '<head><title>HTML Hint Violation Report</title></head>';
        fileContent += '<body>';
        fileContent += '<center><h2>Violation Report</h2></center>';
        fileContent += '<table border="1">';
        fileContent +=
            '<tr><th>Number#</th><th>File Name</th><th>Line Number</th><th>Message</th></tr>';
        for (const { file, messages } of event.arrAllMessages) {
            fileContent += messages
                .map(({ line, message }, i) => `<tr><td>${i + 1}</td><td>${file}</td><td>${line}</td><td>${message}</td></tr>`)
                .join('');
        }
        fileContent += '</table></body></html>';
        console.log(fileContent);
        (0, fs_1.writeFileSync)('report.html', fileContent);
    });
};
exports.default = htmlFormatter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHRtbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jbGkvZm9ybWF0dGVycy9odG1sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkJBQWtDO0FBR2xDLE1BQU0sYUFBYSxHQUFzQixTQUFTLGFBQWEsQ0FBQyxTQUFTO0lBQ3ZFLFNBQVMsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDNUIsSUFBSSxXQUFXLEdBQUcsUUFBUSxDQUFBO1FBQzFCLFdBQVcsSUFBSSx3REFBd0QsQ0FBQTtRQUN2RSxXQUFXLElBQUksUUFBUSxDQUFBO1FBQ3ZCLFdBQVcsSUFBSSw0Q0FBNEMsQ0FBQTtRQUUzRCxXQUFXLElBQUksb0JBQW9CLENBQUE7UUFDbkMsV0FBVztZQUNULGlGQUFpRixDQUFBO1FBRW5GLEtBQUssTUFBTSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxLQUFLLENBQUMsY0FBYyxFQUFFO1lBQ3JELFdBQVcsSUFBSSxRQUFRO2lCQUNwQixHQUFHLENBQ0YsQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUN2QixXQUNFLENBQUMsR0FBRyxDQUNOLFlBQVksSUFBSSxZQUFZLElBQUksWUFBWSxPQUFPLFlBQVksQ0FDbEU7aUJBQ0EsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO1NBQ1o7UUFFRCxXQUFXLElBQUksd0JBQXdCLENBQUE7UUFDdkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQTtRQUN4QixJQUFBLGtCQUFhLEVBQUMsYUFBYSxFQUFFLFdBQVcsQ0FBQyxDQUFBO0lBQzNDLENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFBO0FBRUQsa0JBQWUsYUFBYSxDQUFBIn0=