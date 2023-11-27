"use strict";
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
module.exports = htmlFormatter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHRtbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jbGkvZm9ybWF0dGVycy9odG1sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwyQkFBa0M7QUFHbEMsTUFBTSxhQUFhLEdBQXNCLFNBQVMsYUFBYSxDQUFDLFNBQVM7SUFDdkUsU0FBUyxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUM1QixJQUFJLFdBQVcsR0FBRyxRQUFRLENBQUE7UUFDMUIsV0FBVyxJQUFJLHdEQUF3RCxDQUFBO1FBQ3ZFLFdBQVcsSUFBSSxRQUFRLENBQUE7UUFDdkIsV0FBVyxJQUFJLDRDQUE0QyxDQUFBO1FBRTNELFdBQVcsSUFBSSxvQkFBb0IsQ0FBQTtRQUNuQyxXQUFXO1lBQ1QsaUZBQWlGLENBQUE7UUFFbkYsS0FBSyxNQUFNLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEtBQUssQ0FBQyxjQUFjLEVBQUU7WUFDckQsV0FBVyxJQUFJLFFBQVE7aUJBQ3BCLEdBQUcsQ0FDRixDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQ3ZCLFdBQ0UsQ0FBQyxHQUFHLENBQ04sWUFBWSxJQUFJLFlBQVksSUFBSSxZQUFZLE9BQU8sWUFBWSxDQUNsRTtpQkFDQSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7U0FDWjtRQUVELFdBQVcsSUFBSSx3QkFBd0IsQ0FBQTtRQUN2QyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFBO1FBQ3hCLElBQUEsa0JBQWEsRUFBQyxhQUFhLEVBQUUsV0FBVyxDQUFDLENBQUE7SUFDM0MsQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDLENBQUE7QUFFRCxpQkFBUyxhQUFhLENBQUEifQ==