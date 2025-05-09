"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    id: 'attr-sorted',
    description: 'Attribute tags must be in proper order.',
    init(parser, reporter) {
        const orderMap = {};
        const sortOrder = [
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
        for (let i = 0; i < sortOrder.length; i++) {
            orderMap[sortOrder[i]] = i;
        }
        parser.addListener('tagstart', (event) => {
            const attrs = event.attrs;
            const listOfAttributes = [];
            for (let i = 0; i < attrs.length; i++) {
                listOfAttributes.push(attrs[i].name);
            }
            const originalAttrs = JSON.stringify(listOfAttributes);
            listOfAttributes.sort((a, b) => {
                if (orderMap[a] == undefined && orderMap[b] == undefined) {
                    return a.localeCompare(b);
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
                reporter.error(`Inaccurate order ${originalAttrs} should be in hierarchy ${JSON.stringify(listOfAttributes)} `, event.line, event.col, this, event.raw);
            }
        });
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXR0ci1zb3J0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29yZS9ydWxlcy9hdHRyLXNvcnRlZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLGtCQUFlO0lBQ2IsRUFBRSxFQUFFLGFBQWE7SUFDakIsV0FBVyxFQUFFLHlDQUF5QztJQUN0RCxJQUFJLENBQUMsTUFBTSxFQUFFLFFBQVE7UUFDbkIsTUFBTSxRQUFRLEdBQThCLEVBQUUsQ0FBQTtRQUM5QyxNQUFNLFNBQVMsR0FBRztZQUNoQixPQUFPO1lBQ1AsSUFBSTtZQUNKLE1BQU07WUFDTixLQUFLO1lBQ0wsS0FBSztZQUNMLE1BQU07WUFDTixNQUFNO1lBQ04sT0FBTztZQUNQLE9BQU87WUFDUCxLQUFLO1lBQ0wsTUFBTTtTQUNQLENBQUE7UUFFRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN6QyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1NBQzNCO1FBRUQsTUFBTSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUN2QyxNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFBO1lBQ3pCLE1BQU0sZ0JBQWdCLEdBQUcsRUFBRSxDQUFBO1lBRTNCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNyQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFBO2FBQ3JDO1lBRUQsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO1lBQ3RELGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDN0IsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksU0FBUyxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxTQUFTLEVBQUU7b0JBQ3hELE9BQU8sQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQTtpQkFDMUI7Z0JBQ0QsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksU0FBUyxFQUFFO29CQUM1QixPQUFPLENBQUMsQ0FBQTtpQkFDVDtxQkFBTSxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxTQUFTLEVBQUU7b0JBQ25DLE9BQU8sQ0FBQyxDQUFDLENBQUE7aUJBQ1Y7Z0JBQ0QsT0FBTyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDeEQsQ0FBQyxDQUFDLENBQUE7WUFFRixJQUFJLGFBQWEsS0FBSyxJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLEVBQUU7Z0JBQ3RELFFBQVEsQ0FBQyxLQUFLLENBQ1osb0JBQW9CLGFBQWEsMkJBQTJCLElBQUksQ0FBQyxTQUFTLENBQ3hFLGdCQUFnQixDQUNqQixHQUFHLEVBQ0osS0FBSyxDQUFDLElBQUksRUFDVixLQUFLLENBQUMsR0FBRyxFQUNULElBQUksRUFDSixLQUFLLENBQUMsR0FBRyxDQUNWLENBQUE7YUFDRjtRQUNILENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNNLENBQUEifQ==