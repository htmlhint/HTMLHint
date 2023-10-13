"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const xml_1 = __importDefault(require("xml"));
const junitFormatter = function (formatter, HTMLHint) {
    formatter.on('end', (event) => {
        const arrTestcase = [];
        const arrAllMessages = event.arrAllMessages;
        arrAllMessages.forEach((fileInfo) => {
            const arrMessages = fileInfo.messages;
            const arrLogs = HTMLHint.format(arrMessages);
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
                                message: `Found ${arrMessages.length} errors`,
                            },
                            _cdata: arrLogs.join('\r\n'),
                        },
                    },
                ],
            });
        });
        const objXml = {
            testsuites: [
                {
                    testsuite: [
                        {
                            _attr: {
                                name: 'HTMLHint Tests',
                                time: (event.time / 1000).toFixed(3),
                                tests: event.allFileCount,
                                failures: arrAllMessages.length,
                            },
                        },
                        ...arrTestcase,
                    ],
                },
            ],
        };
        console.log((0, xml_1.default)(objXml, {
            declaration: true,
            indent: '    ',
        }));
    });
};
module.exports = junitFormatter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianVuaXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY2xpL2Zvcm1hdHRlcnMvanVuaXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw4Q0FBcUI7QUFJckIsTUFBTSxjQUFjLEdBQXNCLFVBQVUsU0FBUyxFQUFFLFFBQVE7SUFDckUsU0FBUyxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUM1QixNQUFNLFdBQVcsR0FBZ0IsRUFBRSxDQUFBO1FBQ25DLE1BQU0sY0FBYyxHQUFHLEtBQUssQ0FBQyxjQUFjLENBQUE7UUFFM0MsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQ2xDLE1BQU0sV0FBVyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUE7WUFDckMsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQTtZQUU1QyxXQUFXLENBQUMsSUFBSSxDQUFDO2dCQUNmLFFBQVEsRUFBRTtvQkFDUjt3QkFDRSxLQUFLLEVBQUU7NEJBQ0wsSUFBSSxFQUFFLFFBQVEsQ0FBQyxJQUFJOzRCQUNuQixJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7eUJBQ3hDO3FCQUNGO29CQUNEO3dCQUNFLE9BQU8sRUFBRTs0QkFDUCxLQUFLLEVBQUU7Z0NBQ0wsT0FBTyxFQUFFLFNBQVMsV0FBVyxDQUFDLE1BQU0sU0FBUzs2QkFDOUM7NEJBQ0QsTUFBTSxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO3lCQUM3QjtxQkFDRjtpQkFDRjthQUNGLENBQUMsQ0FBQTtRQUNKLENBQUMsQ0FBQyxDQUFBO1FBRUYsTUFBTSxNQUFNLEdBQWM7WUFDeEIsVUFBVSxFQUFFO2dCQUNWO29CQUNFLFNBQVMsRUFBRTt3QkFDVDs0QkFDRSxLQUFLLEVBQUU7Z0NBQ0wsSUFBSSxFQUFFLGdCQUFnQjtnQ0FDdEIsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dDQUNwQyxLQUFLLEVBQUUsS0FBSyxDQUFDLFlBQVk7Z0NBQ3pCLFFBQVEsRUFBRSxjQUFjLENBQUMsTUFBTTs2QkFDaEM7eUJBQ0Y7d0JBQ0QsR0FBRyxXQUFXO3FCQUNmO2lCQUNGO2FBQ0Y7U0FDRixDQUFBO1FBRUQsT0FBTyxDQUFDLEdBQUcsQ0FDVCxJQUFBLGFBQUcsRUFBQyxNQUFNLEVBQUU7WUFDVixXQUFXLEVBQUUsSUFBSTtZQUNqQixNQUFNLEVBQUUsTUFBTTtTQUNmLENBQUMsQ0FDSCxDQUFBO0lBQ0gsQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDLENBQUE7QUFFRCxNQUFNLENBQUMsT0FBTyxHQUFHLGNBQWMsQ0FBQSJ9