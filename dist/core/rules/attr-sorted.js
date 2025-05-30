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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXR0ci1zb3J0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29yZS9ydWxlcy9hdHRyLXNvcnRlZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLGtCQUFlO0lBQ2IsRUFBRSxFQUFFLGFBQWE7SUFDakIsV0FBVyxFQUFFLHlDQUF5QztJQUN0RCxJQUFJLENBQUMsTUFBTSxFQUFFLFFBQVE7UUFDbkIsTUFBTSxRQUFRLEdBQThCLEVBQUUsQ0FBQTtRQUM5QyxNQUFNLFNBQVMsR0FBRztZQUNoQixPQUFPO1lBQ1AsSUFBSTtZQUNKLE1BQU07WUFDTixLQUFLO1lBQ0wsS0FBSztZQUNMLE1BQU07WUFDTixLQUFLO1lBQ0wsTUFBTTtZQUNOLE9BQU87WUFDUCxPQUFPO1lBQ1AsS0FBSztZQUNMLE1BQU07U0FDUCxDQUFBO1FBRUQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDekMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtTQUMzQjtRQUVELE1BQU0sQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDdkMsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQTtZQUN6QixNQUFNLGdCQUFnQixHQUFHLEVBQUUsQ0FBQTtZQUUzQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDckMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQTthQUNyQztZQUVELE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtZQUN0RCxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBRTdCLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLFNBQVMsRUFBRTtvQkFFN0IsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssU0FBUyxFQUFFO3dCQUM3QixPQUFPLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUE7cUJBQ2pDO29CQUVELE9BQU8sQ0FBQyxDQUFDLENBQUE7aUJBQ1Y7Z0JBR0QsSUFBSSxDQUFDLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFO29CQUV6QixJQUFJLENBQUMsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQUU7d0JBQ3pCLE9BQU8sQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQTtxQkFDMUI7b0JBRUQsT0FBTyxDQUFDLENBQUE7aUJBQ1Q7Z0JBSUQsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssU0FBUyxFQUFFO29CQUM3QixPQUFPLENBQUMsQ0FBQTtpQkFDVDtnQkFFRCxJQUFJLENBQUMsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQUU7b0JBQ3pCLE9BQU8sQ0FBQyxDQUFDLENBQUE7aUJBQ1Y7Z0JBRUQsT0FBTyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQzNCLENBQUMsQ0FBQyxDQUFBO1lBRUYsSUFBSSxhQUFhLEtBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO2dCQUN0RCxRQUFRLENBQUMsS0FBSyxDQUNaLG9CQUFvQixhQUFhLDJCQUEyQixJQUFJLENBQUMsU0FBUyxDQUN4RSxnQkFBZ0IsQ0FDakIsR0FBRyxFQUNKLEtBQUssQ0FBQyxJQUFJLEVBQ1YsS0FBSyxDQUFDLEdBQUcsRUFDVCxJQUFJLEVBQ0osS0FBSyxDQUFDLEdBQUcsQ0FDVixDQUFBO2FBQ0Y7UUFDSCxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FDTSxDQUFBIn0=