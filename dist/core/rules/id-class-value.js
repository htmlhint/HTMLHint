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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWQtY2xhc3MtdmFsdWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29yZS9ydWxlcy9pZC1jbGFzcy12YWx1ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLGtCQUFlO0lBQ2IsRUFBRSxFQUFFLGdCQUFnQjtJQUNwQixXQUFXLEVBQ1Qsa0VBQWtFO0lBQ3BFLElBQUksQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLE9BQU87UUFDNUIsTUFBTSxRQUFRLEdBQTZEO1lBQ3pFLFNBQVMsRUFBRTtnQkFDVCxLQUFLLEVBQUUsd0JBQXdCO2dCQUMvQixPQUFPLEVBQ0wsb0ZBQW9GO2FBQ3ZGO1lBQ0QsSUFBSSxFQUFFO2dCQUNKLEtBQUssRUFBRSx3QkFBd0I7Z0JBQy9CLE9BQU8sRUFDTCw2RUFBNkU7YUFDaEY7WUFDRCxJQUFJLEVBQUU7Z0JBQ0osS0FBSyxFQUFFLHVDQUF1QztnQkFDOUMsT0FBTyxFQUNMLGtFQUFrRTthQUNyRTtTQUNGLENBQUE7UUFDRCxJQUFJLElBQWtELENBQUE7UUFFdEQsSUFBSSxPQUFPLE9BQU8sS0FBSyxRQUFRLEVBQUUsQ0FBQztZQUNoQyxJQUFJLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQzFCLENBQUM7YUFBTSxDQUFDO1lBQ04sSUFBSSxHQUFHLE9BQTZDLENBQUE7UUFDdEQsQ0FBQztRQUVELElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUMzQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFBO1lBQ3RCLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUE7WUFFNUIsSUFBSSxDQUFDLENBQUMsS0FBSyxZQUFZLE1BQU0sQ0FBQyxFQUFFLENBQUM7Z0JBQy9CLEtBQUssR0FBRyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQTtZQUMzQixDQUFDO1lBRUQsTUFBTSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtnQkFDdkMsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQTtnQkFDekIsSUFBSSxJQUFJLENBQUE7Z0JBQ1IsTUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUE7Z0JBRWhELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztvQkFDL0MsSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQTtvQkFFZixJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEtBQUssSUFBSSxFQUFFLENBQUM7d0JBQ3JDLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssS0FBSyxFQUFFLENBQUM7NEJBQ3JDLFFBQVEsQ0FBQyxJQUFJLENBQ1gsT0FBTyxFQUNQLEtBQUssQ0FBQyxJQUFJLEVBQ1YsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQ2hCLElBQUksRUFDSixJQUFJLENBQUMsR0FBRyxDQUNULENBQUE7d0JBQ0gsQ0FBQztvQkFDSCxDQUFDO29CQUVELElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsS0FBSyxPQUFPLEVBQUUsQ0FBQzt3QkFDeEMsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUE7d0JBQ3pDLElBQUksVUFBVSxDQUFBO3dCQUVkLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQzs0QkFDbEQsVUFBVSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQTs0QkFDeEIsSUFBSSxVQUFVLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxLQUFLLEVBQUUsQ0FBQztnQ0FDbkQsUUFBUSxDQUFDLElBQUksQ0FDWCxPQUFPLEVBQ1AsS0FBSyxDQUFDLElBQUksRUFDVixHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFDaEIsSUFBSSxFQUNKLFVBQVUsQ0FDWCxDQUFBOzRCQUNILENBQUM7d0JBQ0gsQ0FBQztvQkFDSCxDQUFDO2dCQUNILENBQUM7WUFDSCxDQUFDLENBQUMsQ0FBQTtRQUNKLENBQUM7SUFDSCxDQUFDO0NBQ00sQ0FBQSJ9