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
            'rel',
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
                if (orderMap[a] !== undefined) {
                    if (orderMap[b] !== undefined) {
                        return orderMap[a] - orderMap[b];
                    }
                    return -1;
                }
                if (a.startsWith('data-')) {
                    if (b.startsWith('data-')) {
                        return a.localeCompare(b);
                    }
                    return 1;
                }
                if (orderMap[b] !== undefined) {
                    return 1;
                }
                if (b.startsWith('data-')) {
                    return -1;
                }
                return a.localeCompare(b);
            });
            if (originalAttrs !== JSON.stringify(listOfAttributes)) {
                reporter.error(`Inaccurate order ${originalAttrs} should be in hierarchy ${JSON.stringify(listOfAttributes)} `, event.line, event.col, this, event.raw);
            }
        });
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXR0ci1zb3J0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29yZS9ydWxlcy9hdHRyLXNvcnRlZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLGtCQUFlO0lBQ2IsRUFBRSxFQUFFLGFBQWE7SUFDakIsV0FBVyxFQUFFLHlDQUF5QztJQUN0RCxJQUFJLENBQUMsTUFBTSxFQUFFLFFBQVE7UUFDbkIsTUFBTSxRQUFRLEdBQThCLEVBQUUsQ0FBQTtRQUM5QyxNQUFNLFNBQVMsR0FBRztZQUNoQixPQUFPO1lBQ1AsSUFBSTtZQUNKLE1BQU07WUFDTixLQUFLO1lBQ0wsS0FBSztZQUNMLE1BQU07WUFDTixLQUFLO1lBQ0wsTUFBTTtZQUNOLE9BQU87WUFDUCxPQUFPO1lBQ1AsS0FBSztZQUNMLE1BQU07U0FDUCxDQUFBO1FBRUQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUMxQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQzVCLENBQUM7UUFFRCxNQUFNLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ3ZDLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUE7WUFDekIsTUFBTSxnQkFBZ0IsR0FBRyxFQUFFLENBQUE7WUFFM0IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDdEMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUN0QyxDQUFDO1lBRUQsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO1lBQ3RELGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFFN0IsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssU0FBUyxFQUFFLENBQUM7b0JBRTlCLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLFNBQVMsRUFBRSxDQUFDO3dCQUM5QixPQUFPLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUE7b0JBQ2xDLENBQUM7b0JBRUQsT0FBTyxDQUFDLENBQUMsQ0FBQTtnQkFDWCxDQUFDO2dCQUdELElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO29CQUUxQixJQUFJLENBQUMsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQzt3QkFDMUIsT0FBTyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFBO29CQUMzQixDQUFDO29CQUVELE9BQU8sQ0FBQyxDQUFBO2dCQUNWLENBQUM7Z0JBSUQsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssU0FBUyxFQUFFLENBQUM7b0JBQzlCLE9BQU8sQ0FBQyxDQUFBO2dCQUNWLENBQUM7Z0JBRUQsSUFBSSxDQUFDLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7b0JBQzFCLE9BQU8sQ0FBQyxDQUFDLENBQUE7Z0JBQ1gsQ0FBQztnQkFFRCxPQUFPLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDM0IsQ0FBQyxDQUFDLENBQUE7WUFFRixJQUFJLGFBQWEsS0FBSyxJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLEVBQUUsQ0FBQztnQkFDdkQsUUFBUSxDQUFDLEtBQUssQ0FDWixvQkFBb0IsYUFBYSwyQkFBMkIsSUFBSSxDQUFDLFNBQVMsQ0FDeEUsZ0JBQWdCLENBQ2pCLEdBQUcsRUFDSixLQUFLLENBQUMsSUFBSSxFQUNWLEtBQUssQ0FBQyxHQUFHLEVBQ1QsSUFBSSxFQUNKLEtBQUssQ0FBQyxHQUFHLENBQ1YsQ0FBQTtZQUNILENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FDTSxDQUFBIn0=