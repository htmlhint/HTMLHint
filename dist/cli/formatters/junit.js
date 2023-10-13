"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const xml = require("xml");
const junitFormatter = function junitFormatter(formatter, HTMLHint) {
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
        console.log(xml(objXml, {
            declaration: true,
            indent: '    ',
        }));
    });
};
exports.default = junitFormatter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianVuaXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY2xpL2Zvcm1hdHRlcnMvanVuaXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwyQkFBMEI7QUFJMUIsTUFBTSxjQUFjLEdBQXNCLFNBQVMsY0FBYyxDQUMvRCxTQUFTLEVBQ1QsUUFBUTtJQUVSLFNBQVMsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDNUIsTUFBTSxXQUFXLEdBQWdCLEVBQUUsQ0FBQTtRQUNuQyxNQUFNLGNBQWMsR0FBRyxLQUFLLENBQUMsY0FBYyxDQUFBO1FBRTNDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUNsQyxNQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFBO1lBQ3JDLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUE7WUFFNUMsV0FBVyxDQUFDLElBQUksQ0FBQztnQkFDZixRQUFRLEVBQUU7b0JBQ1I7d0JBQ0UsS0FBSyxFQUFFOzRCQUNMLElBQUksRUFBRSxRQUFRLENBQUMsSUFBSTs0QkFDbkIsSUFBSSxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO3lCQUN4QztxQkFDRjtvQkFDRDt3QkFDRSxPQUFPLEVBQUU7NEJBQ1AsS0FBSyxFQUFFO2dDQUNMLE9BQU8sRUFBRSxTQUFTLFdBQVcsQ0FBQyxNQUFNLFNBQVM7NkJBQzlDOzRCQUNELE1BQU0sRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQzt5QkFDN0I7cUJBQ0Y7aUJBQ0Y7YUFDRixDQUFDLENBQUE7UUFDSixDQUFDLENBQUMsQ0FBQTtRQUVGLE1BQU0sTUFBTSxHQUFjO1lBQ3hCLFVBQVUsRUFBRTtnQkFDVjtvQkFDRSxTQUFTLEVBQUU7d0JBQ1Q7NEJBQ0UsS0FBSyxFQUFFO2dDQUNMLElBQUksRUFBRSxnQkFBZ0I7Z0NBQ3RCLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQ0FDcEMsS0FBSyxFQUFFLEtBQUssQ0FBQyxZQUFZO2dDQUN6QixRQUFRLEVBQUUsY0FBYyxDQUFDLE1BQU07NkJBQ2hDO3lCQUNGO3dCQUNELEdBQUcsV0FBVztxQkFDZjtpQkFDRjthQUNGO1NBQ0YsQ0FBQTtRQUVELE9BQU8sQ0FBQyxHQUFHLENBQ1QsR0FBRyxDQUFDLE1BQU0sRUFBRTtZQUNWLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLE1BQU0sRUFBRSxNQUFNO1NBQ2YsQ0FBQyxDQUNILENBQUE7SUFDSCxDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQTtBQUVELGtCQUFlLGNBQWMsQ0FBQSJ9