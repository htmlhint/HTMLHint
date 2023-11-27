"use strict";
const xml = require("xml");
const checkstyleFormatter = function checkstyleFormatter(formatter) {
    formatter.on('end', (event) => {
        const arrFiles = [];
        const arrAllMessages = event.arrAllMessages;
        arrAllMessages.forEach((fileInfo) => {
            const arrMessages = fileInfo.messages;
            const arrErrors = [];
            arrMessages.forEach((message) => {
                arrErrors.push({
                    error: {
                        _attr: {
                            line: message.line,
                            column: message.col,
                            severity: message.type,
                            message: message.message,
                            source: `htmlhint.${message.rule.id}`,
                        },
                    },
                });
            });
            arrFiles.push({
                file: [
                    {
                        _attr: {
                            name: fileInfo.file,
                        },
                    },
                    ...arrErrors,
                ],
            });
        });
        const objXml = {
            checkstyle: [
                {
                    _attr: {
                        version: '4.3',
                    },
                },
                ...arrFiles,
            ],
        };
        console.log(xml(objXml, {
            declaration: true,
            indent: '    ',
        }));
    });
};
module.exports = checkstyleFormatter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tzdHlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jbGkvZm9ybWF0dGVycy9jaGVja3N0eWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwyQkFBMEI7QUFJMUIsTUFBTSxtQkFBbUIsR0FBc0IsU0FBUyxtQkFBbUIsQ0FDekUsU0FBUztJQUVULFNBQVMsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDNUIsTUFBTSxRQUFRLEdBQWdCLEVBQUUsQ0FBQTtRQUNoQyxNQUFNLGNBQWMsR0FBRyxLQUFLLENBQUMsY0FBYyxDQUFBO1FBRTNDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUNsQyxNQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFBO1lBQ3JDLE1BQU0sU0FBUyxHQUFnQixFQUFFLENBQUE7WUFFakMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO2dCQUM5QixTQUFTLENBQUMsSUFBSSxDQUFDO29CQUNiLEtBQUssRUFBRTt3QkFDTCxLQUFLLEVBQUU7NEJBQ0wsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJOzRCQUNsQixNQUFNLEVBQUUsT0FBTyxDQUFDLEdBQUc7NEJBQ25CLFFBQVEsRUFBRSxPQUFPLENBQUMsSUFBSTs0QkFDdEIsT0FBTyxFQUFFLE9BQU8sQ0FBQyxPQUFPOzRCQUN4QixNQUFNLEVBQUUsWUFBWSxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRTt5QkFDdEM7cUJBQ0Y7aUJBQ0YsQ0FBQyxDQUFBO1lBQ0osQ0FBQyxDQUFDLENBQUE7WUFFRixRQUFRLENBQUMsSUFBSSxDQUFDO2dCQUNaLElBQUksRUFBRTtvQkFDSjt3QkFDRSxLQUFLLEVBQUU7NEJBQ0wsSUFBSSxFQUFFLFFBQVEsQ0FBQyxJQUFJO3lCQUNwQjtxQkFDRjtvQkFDRCxHQUFHLFNBQVM7aUJBQ2I7YUFDRixDQUFDLENBQUE7UUFDSixDQUFDLENBQUMsQ0FBQTtRQUVGLE1BQU0sTUFBTSxHQUFjO1lBQ3hCLFVBQVUsRUFBRTtnQkFDVjtvQkFDRSxLQUFLLEVBQUU7d0JBQ0wsT0FBTyxFQUFFLEtBQUs7cUJBQ2Y7aUJBQ0Y7Z0JBQ0QsR0FBRyxRQUFRO2FBQ1o7U0FDRixDQUFBO1FBRUQsT0FBTyxDQUFDLEdBQUcsQ0FDVCxHQUFHLENBQUMsTUFBTSxFQUFFO1lBQ1YsV0FBVyxFQUFFLElBQUk7WUFDakIsTUFBTSxFQUFFLE1BQU07U0FDZixDQUFDLENBQ0gsQ0FBQTtJQUNILENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFBO0FBRUQsaUJBQVMsbUJBQW1CLENBQUEifQ==