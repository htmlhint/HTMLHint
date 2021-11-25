"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
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
                            source: "htmlhint.".concat(message.rule.id),
                        },
                    },
                });
            });
            arrFiles.push({
                file: __spreadArray([
                    {
                        _attr: {
                            name: fileInfo.file,
                        },
                    }
                ], arrErrors, true),
            });
        });
        var objXml = {
            checkstyle: __spreadArray([
                {
                    _attr: {
                        version: '4.3',
                    },
                }
            ], arrFiles, true),
        };
        console.log(xml(objXml, {
            declaration: true,
            indent: '    ',
        }));
    });
};
module.exports = checkstyleFormatter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tzdHlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jbGkvZm9ybWF0dGVycy9jaGVja3N0eWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEseUJBQTBCO0FBSTFCLElBQU0sbUJBQW1CLEdBQXNCLFVBQVUsU0FBUztJQUNoRSxTQUFTLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxVQUFDLEtBQUs7UUFDeEIsSUFBTSxRQUFRLEdBQWdCLEVBQUUsQ0FBQTtRQUNoQyxJQUFNLGNBQWMsR0FBRyxLQUFLLENBQUMsY0FBYyxDQUFBO1FBRTNDLGNBQWMsQ0FBQyxPQUFPLENBQUMsVUFBQyxRQUFRO1lBQzlCLElBQU0sV0FBVyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUE7WUFDckMsSUFBTSxTQUFTLEdBQWdCLEVBQUUsQ0FBQTtZQUVqQyxXQUFXLENBQUMsT0FBTyxDQUFDLFVBQUMsT0FBTztnQkFDMUIsU0FBUyxDQUFDLElBQUksQ0FBQztvQkFDYixLQUFLLEVBQUU7d0JBQ0wsS0FBSyxFQUFFOzRCQUNMLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSTs0QkFDbEIsTUFBTSxFQUFFLE9BQU8sQ0FBQyxHQUFHOzRCQUNuQixRQUFRLEVBQUUsT0FBTyxDQUFDLElBQUk7NEJBQ3RCLE9BQU8sRUFBRSxPQUFPLENBQUMsT0FBTzs0QkFDeEIsTUFBTSxFQUFFLG1CQUFZLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFFO3lCQUN0QztxQkFDRjtpQkFDRixDQUFDLENBQUE7WUFDSixDQUFDLENBQUMsQ0FBQTtZQUVGLFFBQVEsQ0FBQyxJQUFJLENBQUM7Z0JBQ1osSUFBSTtvQkFDRjt3QkFDRSxLQUFLLEVBQUU7NEJBQ0wsSUFBSSxFQUFFLFFBQVEsQ0FBQyxJQUFJO3lCQUNwQjtxQkFDRjttQkFDRSxTQUFTLE9BQ2I7YUFDRixDQUFDLENBQUE7UUFDSixDQUFDLENBQUMsQ0FBQTtRQUVGLElBQU0sTUFBTSxHQUFjO1lBQ3hCLFVBQVU7Z0JBQ1I7b0JBQ0UsS0FBSyxFQUFFO3dCQUNMLE9BQU8sRUFBRSxLQUFLO3FCQUNmO2lCQUNGO2VBQ0UsUUFBUSxPQUNaO1NBQ0YsQ0FBQTtRQUVELE9BQU8sQ0FBQyxHQUFHLENBQ1QsR0FBRyxDQUFDLE1BQU0sRUFBRTtZQUNWLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLE1BQU0sRUFBRSxNQUFNO1NBQ2YsQ0FBQyxDQUNILENBQUE7SUFDSCxDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQTtBQUVELE1BQU0sQ0FBQyxPQUFPLEdBQUcsbUJBQW1CLENBQUEifQ==