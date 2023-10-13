"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const xml_1 = __importDefault(require("xml"));
const checkstyleFormatter = function (formatter) {
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
        console.log((0, xml_1.default)(objXml, {
            declaration: true,
            indent: '    ',
        }));
    });
};
module.exports = checkstyleFormatter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tzdHlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jbGkvZm9ybWF0dGVycy9jaGVja3N0eWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsOENBQXFCO0FBSXJCLE1BQU0sbUJBQW1CLEdBQXNCLFVBQVUsU0FBUztJQUNoRSxTQUFTLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO1FBQzVCLE1BQU0sUUFBUSxHQUFnQixFQUFFLENBQUE7UUFDaEMsTUFBTSxjQUFjLEdBQUcsS0FBSyxDQUFDLGNBQWMsQ0FBQTtRQUUzQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDbEMsTUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQTtZQUNyQyxNQUFNLFNBQVMsR0FBZ0IsRUFBRSxDQUFBO1lBRWpDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtnQkFDOUIsU0FBUyxDQUFDLElBQUksQ0FBQztvQkFDYixLQUFLLEVBQUU7d0JBQ0wsS0FBSyxFQUFFOzRCQUNMLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSTs0QkFDbEIsTUFBTSxFQUFFLE9BQU8sQ0FBQyxHQUFHOzRCQUNuQixRQUFRLEVBQUUsT0FBTyxDQUFDLElBQUk7NEJBQ3RCLE9BQU8sRUFBRSxPQUFPLENBQUMsT0FBTzs0QkFDeEIsTUFBTSxFQUFFLFlBQVksT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUU7eUJBQ3RDO3FCQUNGO2lCQUNGLENBQUMsQ0FBQTtZQUNKLENBQUMsQ0FBQyxDQUFBO1lBRUYsUUFBUSxDQUFDLElBQUksQ0FBQztnQkFDWixJQUFJLEVBQUU7b0JBQ0o7d0JBQ0UsS0FBSyxFQUFFOzRCQUNMLElBQUksRUFBRSxRQUFRLENBQUMsSUFBSTt5QkFDcEI7cUJBQ0Y7b0JBQ0QsR0FBRyxTQUFTO2lCQUNiO2FBQ0YsQ0FBQyxDQUFBO1FBQ0osQ0FBQyxDQUFDLENBQUE7UUFFRixNQUFNLE1BQU0sR0FBYztZQUN4QixVQUFVLEVBQUU7Z0JBQ1Y7b0JBQ0UsS0FBSyxFQUFFO3dCQUNMLE9BQU8sRUFBRSxLQUFLO3FCQUNmO2lCQUNGO2dCQUNELEdBQUcsUUFBUTthQUNaO1NBQ0YsQ0FBQTtRQUVELE9BQU8sQ0FBQyxHQUFHLENBQ1QsSUFBQSxhQUFHLEVBQUMsTUFBTSxFQUFFO1lBQ1YsV0FBVyxFQUFFLElBQUk7WUFDakIsTUFBTSxFQUFFLE1BQU07U0FDZixDQUFDLENBQ0gsQ0FBQTtJQUNILENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFBO0FBRUQsTUFBTSxDQUFDLE9BQU8sR0FBRyxtQkFBbUIsQ0FBQSJ9