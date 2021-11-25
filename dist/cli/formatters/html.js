"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var htmlFormatter = function (formatter) {
    formatter.on('end', function (event) {
        var fileContent = '<html>';
        fileContent += '<head><title>HTML Hint Violation Report</title></head>';
        fileContent += '<body>';
        fileContent += '<center><h2>Violation Report</h2></center>';
        fileContent += '<table border="1">';
        fileContent +=
            '<tr><th>Number#</th><th>File Name</th><th>Line Number</th><th>Message</th></tr>';
        var _loop_1 = function (file, messages) {
            fileContent += messages
                .map(function (_a, i) {
                var line = _a.line, message = _a.message;
                return "<tr><td>".concat(i + 1, "</td><td>").concat(file, "</td><td>").concat(line, "</td><td>").concat(message, "</td></tr>");
            })
                .join('');
        };
        for (var _i = 0, _a = event.arrAllMessages; _i < _a.length; _i++) {
            var _b = _a[_i], file = _b.file, messages = _b.messages;
            _loop_1(file, messages);
        }
        fileContent += '</table></body></html>';
        console.log(fileContent);
        (0, fs_1.writeFileSync)('report.html', fileContent);
    });
};
module.exports = htmlFormatter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHRtbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jbGkvZm9ybWF0dGVycy9odG1sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEseUJBQWtDO0FBR2xDLElBQU0sYUFBYSxHQUFzQixVQUFVLFNBQVM7SUFDMUQsU0FBUyxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsVUFBQyxLQUFLO1FBQ3hCLElBQUksV0FBVyxHQUFHLFFBQVEsQ0FBQTtRQUMxQixXQUFXLElBQUksd0RBQXdELENBQUE7UUFDdkUsV0FBVyxJQUFJLFFBQVEsQ0FBQTtRQUN2QixXQUFXLElBQUksNENBQTRDLENBQUE7UUFFM0QsV0FBVyxJQUFJLG9CQUFvQixDQUFBO1FBQ25DLFdBQVc7WUFDVCxpRkFBaUYsQ0FBQTtnQ0FFdEUsSUFBSSxFQUFFLFFBQVE7WUFDekIsV0FBVyxJQUFJLFFBQVE7aUJBQ3BCLEdBQUcsQ0FDRixVQUFDLEVBQWlCLEVBQUUsQ0FBQztvQkFBbEIsSUFBSSxVQUFBLEVBQUUsT0FBTyxhQUFBO2dCQUNkLE9BQUEsa0JBQ0UsQ0FBQyxHQUFHLENBQUMsc0JBQ0ssSUFBSSxzQkFBWSxJQUFJLHNCQUFZLE9BQU8sZUFBWTtZQUYvRCxDQUUrRCxDQUNsRTtpQkFDQSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7O1FBUmIsS0FBaUMsVUFBb0IsRUFBcEIsS0FBQSxLQUFLLENBQUMsY0FBYyxFQUFwQixjQUFvQixFQUFwQixJQUFvQjtZQUExQyxJQUFBLFdBQWtCLEVBQWhCLElBQUksVUFBQSxFQUFFLFFBQVEsY0FBQTtvQkFBZCxJQUFJLEVBQUUsUUFBUTtTQVMxQjtRQUVELFdBQVcsSUFBSSx3QkFBd0IsQ0FBQTtRQUN2QyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFBO1FBQ3hCLElBQUEsa0JBQWEsRUFBQyxhQUFhLEVBQUUsV0FBVyxDQUFDLENBQUE7SUFDM0MsQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDLENBQUE7QUFFRCxNQUFNLENBQUMsT0FBTyxHQUFHLGFBQWEsQ0FBQSJ9