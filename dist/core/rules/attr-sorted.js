"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    id: 'attr-sorted',
    description: 'Attribute tags must be in proper order.',
    init: function (parser, reporter) {
        var _this = this;
        var orderMap = {};
        var sortOrder = [
            'class',
            'id',
            'name',
            'src',
            'for',
            'type',
            'href',
            'value',
            'title',
            'alt',
            'role',
        ];
        for (var i = 0; i < sortOrder.length; i++) {
            orderMap[sortOrder[i]] = i;
        }
        parser.addListener('tagstart', function (event) {
            var attrs = event.attrs;
            var listOfAttributes = [];
            for (var i = 0; i < attrs.length; i++) {
                listOfAttributes.push(attrs[i].name);
            }
            var originalAttrs = JSON.stringify(listOfAttributes);
            listOfAttributes.sort(function (a, b) {
                if (orderMap[a] == undefined && orderMap[b] == undefined) {
                    return 0;
                }
                if (orderMap[a] == undefined) {
                    return 1;
                }
                else if (orderMap[b] == undefined) {
                    return -1;
                }
                return orderMap[a] - orderMap[b] || a.localeCompare(b);
            });
            if (originalAttrs !== JSON.stringify(listOfAttributes)) {
                reporter.error("Inaccurate order " + originalAttrs + " should be in hierarchy " + JSON.stringify(listOfAttributes) + " ", event.line, event.col, _this, event.raw);
            }
        });
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXR0ci1zb3J0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29yZS9ydWxlcy9hdHRyLXNvcnRlZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLGtCQUFlO0lBQ2IsRUFBRSxFQUFFLGFBQWE7SUFDakIsV0FBVyxFQUFFLHlDQUF5QztJQUN0RCxJQUFJLEVBQUosVUFBSyxNQUFNLEVBQUUsUUFBUTtRQUFyQixpQkFxREM7UUFwREMsSUFBTSxRQUFRLEdBQThCLEVBQUUsQ0FBQTtRQUM5QyxJQUFNLFNBQVMsR0FBRztZQUNoQixPQUFPO1lBQ1AsSUFBSTtZQUNKLE1BQU07WUFDTixLQUFLO1lBQ0wsS0FBSztZQUNMLE1BQU07WUFDTixNQUFNO1lBQ04sT0FBTztZQUNQLE9BQU87WUFDUCxLQUFLO1lBQ0wsTUFBTTtTQUNQLENBQUE7UUFFRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN6QyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1NBQzNCO1FBRUQsTUFBTSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsVUFBQyxLQUFLO1lBQ25DLElBQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUE7WUFDekIsSUFBTSxnQkFBZ0IsR0FBRyxFQUFFLENBQUE7WUFFM0IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3JDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUE7YUFDckM7WUFFRCxJQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLENBQUE7WUFDdEQsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFVBQUMsQ0FBQyxFQUFFLENBQUM7Z0JBQ3pCLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLFNBQVMsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksU0FBUyxFQUFFO29CQUN4RCxPQUFPLENBQUMsQ0FBQTtpQkFDVDtnQkFDRCxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxTQUFTLEVBQUU7b0JBQzVCLE9BQU8sQ0FBQyxDQUFBO2lCQUNUO3FCQUFNLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLFNBQVMsRUFBRTtvQkFDbkMsT0FBTyxDQUFDLENBQUMsQ0FBQTtpQkFDVjtnQkFDRCxPQUFPLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUN4RCxDQUFDLENBQUMsQ0FBQTtZQUVGLElBQUksYUFBYSxLQUFLLElBQUksQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtnQkFDdEQsUUFBUSxDQUFDLEtBQUssQ0FDWixzQkFBb0IsYUFBYSxnQ0FBMkIsSUFBSSxDQUFDLFNBQVMsQ0FDeEUsZ0JBQWdCLENBQ2pCLE1BQUcsRUFDSixLQUFLLENBQUMsSUFBSSxFQUNWLEtBQUssQ0FBQyxHQUFHLEVBQ1QsS0FBSSxFQUNKLEtBQUssQ0FBQyxHQUFHLENBQ1YsQ0FBQTthQUNGO1FBQ0gsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0NBQ00sQ0FBQSJ9