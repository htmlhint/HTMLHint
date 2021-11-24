"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    id: 'id-class-value',
    description: 'The id and class attribute values must meet the specified rules.',
    init: function (parser, reporter, options) {
        var _this = this;
        var arrRules = {
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
        var rule;
        if (typeof options === 'string') {
            rule = arrRules[options];
        }
        else {
            rule = options;
        }
        if (typeof rule === 'object' && rule.regId) {
            var regId_1 = rule.regId;
            var message_1 = rule.message;
            if (!(regId_1 instanceof RegExp)) {
                regId_1 = new RegExp(regId_1);
            }
            parser.addListener('tagstart', function (event) {
                var attrs = event.attrs;
                var attr;
                var col = event.col + event.tagName.length + 1;
                for (var i = 0, l1 = attrs.length; i < l1; i++) {
                    attr = attrs[i];
                    if (attr.name.toLowerCase() === 'id') {
                        if (regId_1.test(attr.value) === false) {
                            reporter.warn(message_1, event.line, col + attr.index, _this, attr.raw);
                        }
                    }
                    if (attr.name.toLowerCase() === 'class') {
                        var arrClass = attr.value.split(/\s+/g);
                        var classValue = void 0;
                        for (var j = 0, l2 = arrClass.length; j < l2; j++) {
                            classValue = arrClass[j];
                            if (classValue && regId_1.test(classValue) === false) {
                                reporter.warn(message_1, event.line, col + attr.index, _this, classValue);
                            }
                        }
                    }
                }
            });
        }
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWQtY2xhc3MtdmFsdWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29yZS9ydWxlcy9pZC1jbGFzcy12YWx1ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLGtCQUFlO0lBQ2IsRUFBRSxFQUFFLGdCQUFnQjtJQUNwQixXQUFXLEVBQ1Qsa0VBQWtFO0lBQ3BFLElBQUksRUFBSixVQUFLLE1BQU0sRUFBRSxRQUFRLEVBQUUsT0FBTztRQUE5QixpQkEwRUM7UUF6RUMsSUFBTSxRQUFRLEdBQTZEO1lBQ3pFLFNBQVMsRUFBRTtnQkFDVCxLQUFLLEVBQUUsd0JBQXdCO2dCQUMvQixPQUFPLEVBQ0wsb0ZBQW9GO2FBQ3ZGO1lBQ0QsSUFBSSxFQUFFO2dCQUNKLEtBQUssRUFBRSx3QkFBd0I7Z0JBQy9CLE9BQU8sRUFDTCw2RUFBNkU7YUFDaEY7WUFDRCxJQUFJLEVBQUU7Z0JBQ0osS0FBSyxFQUFFLHVDQUF1QztnQkFDOUMsT0FBTyxFQUNMLGtFQUFrRTthQUNyRTtTQUNGLENBQUE7UUFDRCxJQUFJLElBQWtELENBQUE7UUFFdEQsSUFBSSxPQUFPLE9BQU8sS0FBSyxRQUFRLEVBQUU7WUFDL0IsSUFBSSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQTtTQUN6QjthQUFNO1lBQ0wsSUFBSSxHQUFHLE9BQTZDLENBQUE7U0FDckQ7UUFFRCxJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQzFDLElBQUksT0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUE7WUFDdEIsSUFBTSxTQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQTtZQUU1QixJQUFJLENBQUMsQ0FBQyxPQUFLLFlBQVksTUFBTSxDQUFDLEVBQUU7Z0JBQzlCLE9BQUssR0FBRyxJQUFJLE1BQU0sQ0FBQyxPQUFLLENBQUMsQ0FBQTthQUMxQjtZQUVELE1BQU0sQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLFVBQUMsS0FBSztnQkFDbkMsSUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQTtnQkFDekIsSUFBSSxJQUFJLENBQUE7Z0JBQ1IsSUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUE7Z0JBRWhELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQzlDLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUE7b0JBRWYsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxLQUFLLElBQUksRUFBRTt3QkFDcEMsSUFBSSxPQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxLQUFLLEVBQUU7NEJBQ3BDLFFBQVEsQ0FBQyxJQUFJLENBQ1gsU0FBTyxFQUNQLEtBQUssQ0FBQyxJQUFJLEVBQ1YsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQ2hCLEtBQUksRUFDSixJQUFJLENBQUMsR0FBRyxDQUNULENBQUE7eUJBQ0Y7cUJBQ0Y7b0JBRUQsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxLQUFLLE9BQU8sRUFBRTt3QkFDdkMsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUE7d0JBQ3pDLElBQUksVUFBVSxTQUFBLENBQUE7d0JBRWQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRTs0QkFDakQsVUFBVSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQTs0QkFDeEIsSUFBSSxVQUFVLElBQUksT0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxLQUFLLEVBQUU7Z0NBQ2xELFFBQVEsQ0FBQyxJQUFJLENBQ1gsU0FBTyxFQUNQLEtBQUssQ0FBQyxJQUFJLEVBQ1YsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQ2hCLEtBQUksRUFDSixVQUFVLENBQ1gsQ0FBQTs2QkFDRjt5QkFDRjtxQkFDRjtpQkFDRjtZQUNILENBQUMsQ0FBQyxDQUFBO1NBQ0g7SUFDSCxDQUFDO0NBQ00sQ0FBQSJ9