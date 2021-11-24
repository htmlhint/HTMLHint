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
                                message: "Found " + arrMessages.length + " errors",
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
                    testsuite: __spreadArrays([
                        {
                            _attr: {
                                name: 'HTMLHint Tests',
                                time: (event.time / 1000).toFixed(3),
                                tests: event.allFileCount,
                                failures: arrAllMessages.length,
                            },
                        }
                    ], arrTestcase),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianVuaXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY2xpL2Zvcm1hdHRlcnMvanVuaXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEseUJBQTBCO0FBSTFCLElBQU0sY0FBYyxHQUFzQixVQUFVLFNBQVMsRUFBRSxRQUFRO0lBQ3JFLFNBQVMsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLFVBQUMsS0FBSztRQUN4QixJQUFNLFdBQVcsR0FBZ0IsRUFBRSxDQUFBO1FBQ25DLElBQU0sY0FBYyxHQUFHLEtBQUssQ0FBQyxjQUFjLENBQUE7UUFFM0MsY0FBYyxDQUFDLE9BQU8sQ0FBQyxVQUFDLFFBQVE7WUFDOUIsSUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQTtZQUNyQyxJQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFBO1lBRTVDLFdBQVcsQ0FBQyxJQUFJLENBQUM7Z0JBQ2YsUUFBUSxFQUFFO29CQUNSO3dCQUNFLEtBQUssRUFBRTs0QkFDTCxJQUFJLEVBQUUsUUFBUSxDQUFDLElBQUk7NEJBQ25CLElBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzt5QkFDeEM7cUJBQ0Y7b0JBQ0Q7d0JBQ0UsT0FBTyxFQUFFOzRCQUNQLEtBQUssRUFBRTtnQ0FDTCxPQUFPLEVBQUUsV0FBUyxXQUFXLENBQUMsTUFBTSxZQUFTOzZCQUM5Qzs0QkFDRCxNQUFNLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7eUJBQzdCO3FCQUNGO2lCQUNGO2FBQ0YsQ0FBQyxDQUFBO1FBQ0osQ0FBQyxDQUFDLENBQUE7UUFFRixJQUFNLE1BQU0sR0FBYztZQUN4QixVQUFVLEVBQUU7Z0JBQ1Y7b0JBQ0UsU0FBUzt3QkFDUDs0QkFDRSxLQUFLLEVBQUU7Z0NBQ0wsSUFBSSxFQUFFLGdCQUFnQjtnQ0FDdEIsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dDQUNwQyxLQUFLLEVBQUUsS0FBSyxDQUFDLFlBQVk7Z0NBQ3pCLFFBQVEsRUFBRSxjQUFjLENBQUMsTUFBTTs2QkFDaEM7eUJBQ0Y7dUJBQ0UsV0FBVyxDQUNmO2lCQUNGO2FBQ0Y7U0FDRixDQUFBO1FBRUQsT0FBTyxDQUFDLEdBQUcsQ0FDVCxHQUFHLENBQUMsTUFBTSxFQUFFO1lBQ1YsV0FBVyxFQUFFLElBQUk7WUFDakIsTUFBTSxFQUFFLE1BQU07U0FDZixDQUFDLENBQ0gsQ0FBQTtJQUNILENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFBO0FBRUQsTUFBTSxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUEifQ==