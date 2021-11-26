"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    id: 'id-class-value',
    description: 'The id and class attribute values must meet the specified rules.',
    init(parser, reporter, options) {
        const arrRules = {
            underline: {
                regId: /^[a-z\d]+(_[a-z\d]+)*$/,
                message: 'The id and class attribute values must be in lowercase and split by an underscore.',
            },
            dash: {
                regId: /^[a-z\d]+(-[a-z\d]+)*$/,
                message: 'The id and class attribute values must be in lowercase and split by a dash.',
            },
            hump: {
                regId: /^[a-z][a-zA-Z\d]*([A-Z][a-zA-Z\d]*)*$/,
                message: 'The id and class attribute values must meet the camelCase style.',
            },
        };
        let rule;
        if (typeof options === 'string') {
            rule = arrRules[options];
        }
        else {
            rule = options;
        }
        if (typeof rule === 'object' && rule.regId) {
            let regId = rule.regId;
            const message = rule.message;
            if (!(regId instanceof RegExp)) {
                regId = new RegExp(regId);
            }
            parser.addListener('tagstart', (event) => {
                const attrs = event.attrs;
                let attr;
                const col = event.col + event.tagName.length + 1;
                for (let i = 0, l1 = attrs.length; i < l1; i++) {
                    attr = attrs[i];
                    if (attr.name.toLowerCase() === 'id') {
                        if (regId.test(attr.value) === false) {
                            reporter.warn(message, event.line, col + attr.index, this, attr.raw);
                        }
                    }
                    if (attr.name.toLowerCase() === 'class') {
                        const arrClass = attr.value.split(/\s+/g);
                        let classValue;
                        for (let j = 0, l2 = arrClass.length; j < l2; j++) {
                            classValue = arrClass[j];
                            if (classValue && regId.test(classValue) === false) {
                                reporter.warn(message, event.line, col + attr.index, this, classValue);
                            }
                        }
                    }
                }
            });
        }
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWQtY2xhc3MtdmFsdWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29yZS9ydWxlcy9pZC1jbGFzcy12YWx1ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLGtCQUFlO0lBQ2IsRUFBRSxFQUFFLGdCQUFnQjtJQUNwQixXQUFXLEVBQ1Qsa0VBQWtFO0lBQ3BFLElBQUksQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLE9BQU87UUFDNUIsTUFBTSxRQUFRLEdBQTZEO1lBQ3pFLFNBQVMsRUFBRTtnQkFDVCxLQUFLLEVBQUUsd0JBQXdCO2dCQUMvQixPQUFPLEVBQ0wsb0ZBQW9GO2FBQ3ZGO1lBQ0QsSUFBSSxFQUFFO2dCQUNKLEtBQUssRUFBRSx3QkFBd0I7Z0JBQy9CLE9BQU8sRUFDTCw2RUFBNkU7YUFDaEY7WUFDRCxJQUFJLEVBQUU7Z0JBQ0osS0FBSyxFQUFFLHVDQUF1QztnQkFDOUMsT0FBTyxFQUNMLGtFQUFrRTthQUNyRTtTQUNGLENBQUE7UUFDRCxJQUFJLElBQWtELENBQUE7UUFFdEQsSUFBSSxPQUFPLE9BQU8sS0FBSyxRQUFRLEVBQUU7WUFDL0IsSUFBSSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQTtTQUN6QjthQUFNO1lBQ0wsSUFBSSxHQUFHLE9BQTZDLENBQUE7U0FDckQ7UUFFRCxJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQzFDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUE7WUFDdEIsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQTtZQUU1QixJQUFJLENBQUMsQ0FBQyxLQUFLLFlBQVksTUFBTSxDQUFDLEVBQUU7Z0JBQzlCLEtBQUssR0FBRyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQTthQUMxQjtZQUVELE1BQU0sQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7Z0JBQ3ZDLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUE7Z0JBQ3pCLElBQUksSUFBSSxDQUFBO2dCQUNSLE1BQU0sR0FBRyxHQUFHLEtBQUssQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFBO2dCQUVoRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUM5QyxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBO29CQUVmLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsS0FBSyxJQUFJLEVBQUU7d0JBQ3BDLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssS0FBSyxFQUFFOzRCQUNwQyxRQUFRLENBQUMsSUFBSSxDQUNYLE9BQU8sRUFDUCxLQUFLLENBQUMsSUFBSSxFQUNWLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxFQUNoQixJQUFJLEVBQ0osSUFBSSxDQUFDLEdBQUcsQ0FDVCxDQUFBO3lCQUNGO3FCQUNGO29CQUVELElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsS0FBSyxPQUFPLEVBQUU7d0JBQ3ZDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFBO3dCQUN6QyxJQUFJLFVBQVUsQ0FBQTt3QkFFZCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFOzRCQUNqRCxVQUFVLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFBOzRCQUN4QixJQUFJLFVBQVUsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEtBQUssRUFBRTtnQ0FDbEQsUUFBUSxDQUFDLElBQUksQ0FDWCxPQUFPLEVBQ1AsS0FBSyxDQUFDLElBQUksRUFDVixHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFDaEIsSUFBSSxFQUNKLFVBQVUsQ0FDWCxDQUFBOzZCQUNGO3lCQUNGO3FCQUNGO2lCQUNGO1lBQ0gsQ0FBQyxDQUFDLENBQUE7U0FDSDtJQUNILENBQUM7Q0FDTSxDQUFBIn0=