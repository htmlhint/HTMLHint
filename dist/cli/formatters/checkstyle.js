"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var xml = require("xml");
var checkstyleFormatter = function (formatter) {
    formatter.on('end', function (event) {
        var arrFiles = [];
        var arrAllMessages = event.arrAllMessages;
        arrAllMessages.forEach(function (fileInfo) {
            var arrMessages = fileInfo.messages;
            var arrErrors = [];
            arrMessages.forEach(function (message) {
                arrErrors.push({
                    error: {
                        _attr: {
                            line: message.line,
                            column: message.col,
                            severity: message.type,
                            message: message.message,
                            source: "htmlhint." + message.rule.id,
                        },
                    },
                });
            });
            arrFiles.push({
                file: __spreadArrays([
                    {
                        _attr: {
                            name: fileInfo.file,
                        },
                    }
                ], arrErrors),
            });
        });
        var objXml = {
            checkstyle: __spreadArrays([
                {
                    _attr: {
                        version: '4.3',
                    },
                }
            ], arrFiles),
        };
        console.log(xml(objXml, {
            declaration: true,
            indent: '    ',
        }));
    });
};
module.exports = checkstyleFormatter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tzdHlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jbGkvZm9ybWF0dGVycy9jaGVja3N0eWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLHlCQUEwQjtBQUkxQixJQUFNLG1CQUFtQixHQUFzQixVQUFVLFNBQVM7SUFDaEUsU0FBUyxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsVUFBQyxLQUFLO1FBQ3hCLElBQU0sUUFBUSxHQUFnQixFQUFFLENBQUE7UUFDaEMsSUFBTSxjQUFjLEdBQUcsS0FBSyxDQUFDLGNBQWMsQ0FBQTtRQUUzQyxjQUFjLENBQUMsT0FBTyxDQUFDLFVBQUMsUUFBUTtZQUM5QixJQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFBO1lBQ3JDLElBQU0sU0FBUyxHQUFnQixFQUFFLENBQUE7WUFFakMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxVQUFDLE9BQU87Z0JBQzFCLFNBQVMsQ0FBQyxJQUFJLENBQUM7b0JBQ2IsS0FBSyxFQUFFO3dCQUNMLEtBQUssRUFBRTs0QkFDTCxJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUk7NEJBQ2xCLE1BQU0sRUFBRSxPQUFPLENBQUMsR0FBRzs0QkFDbkIsUUFBUSxFQUFFLE9BQU8sQ0FBQyxJQUFJOzRCQUN0QixPQUFPLEVBQUUsT0FBTyxDQUFDLE9BQU87NEJBQ3hCLE1BQU0sRUFBRSxjQUFZLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBSTt5QkFDdEM7cUJBQ0Y7aUJBQ0YsQ0FBQyxDQUFBO1lBQ0osQ0FBQyxDQUFDLENBQUE7WUFFRixRQUFRLENBQUMsSUFBSSxDQUFDO2dCQUNaLElBQUk7b0JBQ0Y7d0JBQ0UsS0FBSyxFQUFFOzRCQUNMLElBQUksRUFBRSxRQUFRLENBQUMsSUFBSTt5QkFDcEI7cUJBQ0Y7bUJBQ0UsU0FBUyxDQUNiO2FBQ0YsQ0FBQyxDQUFBO1FBQ0osQ0FBQyxDQUFDLENBQUE7UUFFRixJQUFNLE1BQU0sR0FBYztZQUN4QixVQUFVO2dCQUNSO29CQUNFLEtBQUssRUFBRTt3QkFDTCxPQUFPLEVBQUUsS0FBSztxQkFDZjtpQkFDRjtlQUNFLFFBQVEsQ0FDWjtTQUNGLENBQUE7UUFFRCxPQUFPLENBQUMsR0FBRyxDQUNULEdBQUcsQ0FBQyxNQUFNLEVBQUU7WUFDVixXQUFXLEVBQUUsSUFBSTtZQUNqQixNQUFNLEVBQUUsTUFBTTtTQUNmLENBQUMsQ0FDSCxDQUFBO0lBQ0gsQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDLENBQUE7QUFFRCxNQUFNLENBQUMsT0FBTyxHQUFHLG1CQUFtQixDQUFBIn0=