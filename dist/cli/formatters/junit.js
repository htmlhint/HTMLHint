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
var junitFormatter = function (formatter, HTMLHint) {
    formatter.on('end', function (event) {
        var arrTestcase = [];
        var arrAllMessages = event.arrAllMessages;
        arrAllMessages.forEach(function (fileInfo) {
            var arrMessages = fileInfo.messages;
            var arrLogs = HTMLHint.format(arrMessages);
            arrTestcase.push({
                testcase: [
                    {
                        _attr: {
                            name: fileInfo.file,
                            time: (fileInfo.time / 1000).toFixed(3),
                        },
                    },
                    {
                        failure: {
                            _attr: {
                                message: "Found ".concat(arrMessages.length, " errors"),
                            },
                            _cdata: arrLogs.join('\r\n'),
                        },
                    },
                ],
            });
        });
        var objXml = {
            testsuites: [
                {
                    testsuite: __spreadArray([
                        {
                            _attr: {
                                name: 'HTMLHint Tests',
                                time: (event.time / 1000).toFixed(3),
                                tests: event.allFileCount,
                                failures: arrAllMessages.length,
                            },
                        }
                    ], arrTestcase, true),
                },
            ],
        };
        console.log(xml(objXml, {
            declaration: true,
            indent: '    ',
        }));
    });
};
module.exports = junitFormatter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianVuaXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY2xpL2Zvcm1hdHRlcnMvanVuaXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSx5QkFBMEI7QUFJMUIsSUFBTSxjQUFjLEdBQXNCLFVBQVUsU0FBUyxFQUFFLFFBQVE7SUFDckUsU0FBUyxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsVUFBQyxLQUFLO1FBQ3hCLElBQU0sV0FBVyxHQUFnQixFQUFFLENBQUE7UUFDbkMsSUFBTSxjQUFjLEdBQUcsS0FBSyxDQUFDLGNBQWMsQ0FBQTtRQUUzQyxjQUFjLENBQUMsT0FBTyxDQUFDLFVBQUMsUUFBUTtZQUM5QixJQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFBO1lBQ3JDLElBQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUE7WUFFNUMsV0FBVyxDQUFDLElBQUksQ0FBQztnQkFDZixRQUFRLEVBQUU7b0JBQ1I7d0JBQ0UsS0FBSyxFQUFFOzRCQUNMLElBQUksRUFBRSxRQUFRLENBQUMsSUFBSTs0QkFDbkIsSUFBSSxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO3lCQUN4QztxQkFDRjtvQkFDRDt3QkFDRSxPQUFPLEVBQUU7NEJBQ1AsS0FBSyxFQUFFO2dDQUNMLE9BQU8sRUFBRSxnQkFBUyxXQUFXLENBQUMsTUFBTSxZQUFTOzZCQUM5Qzs0QkFDRCxNQUFNLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7eUJBQzdCO3FCQUNGO2lCQUNGO2FBQ0YsQ0FBQyxDQUFBO1FBQ0osQ0FBQyxDQUFDLENBQUE7UUFFRixJQUFNLE1BQU0sR0FBYztZQUN4QixVQUFVLEVBQUU7Z0JBQ1Y7b0JBQ0UsU0FBUzt3QkFDUDs0QkFDRSxLQUFLLEVBQUU7Z0NBQ0wsSUFBSSxFQUFFLGdCQUFnQjtnQ0FDdEIsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dDQUNwQyxLQUFLLEVBQUUsS0FBSyxDQUFDLFlBQVk7Z0NBQ3pCLFFBQVEsRUFBRSxjQUFjLENBQUMsTUFBTTs2QkFDaEM7eUJBQ0Y7dUJBQ0UsV0FBVyxPQUNmO2lCQUNGO2FBQ0Y7U0FDRixDQUFBO1FBRUQsT0FBTyxDQUFDLEdBQUcsQ0FDVCxHQUFHLENBQUMsTUFBTSxFQUFFO1lBQ1YsV0FBVyxFQUFFLElBQUk7WUFDakIsTUFBTSxFQUFFLE1BQU07U0FDZixDQUFDLENBQ0gsQ0FBQTtJQUNILENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFBO0FBRUQsTUFBTSxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUEifQ==