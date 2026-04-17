"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    id: 'input-requires-label',
    description: 'All [ input ] tags must have a corresponding [ label ] tag. ',
    init(parser, reporter) {
        const labelTags = [];
        const inputTags = [];
        let labelDepth = 0;
        parser.addListener('tagstart', (event) => {
            const tagName = event.tagName.toLowerCase();
            const mapAttrs = parser.getMapAttrs(event.attrs);
            const col = event.col + tagName.length + 1;
            if (tagName === 'input') {
                if (mapAttrs['type'] !== 'hidden') {
                    inputTags.push({
                        event: event,
                        col: col,
                        id: mapAttrs['id'],
                        nested: labelDepth > 0,
                    });
                }
            }
            if (tagName === 'label') {
                if ('for' in mapAttrs && mapAttrs['for'] !== '') {
                    labelTags.push({ event: event, col: col, forValue: mapAttrs['for'] });
                }
                else if (!event.close) {
                    labelDepth++;
                }
            }
        });
        parser.addListener('tagend', (event) => {
            if (event.tagName.toLowerCase() === 'label' && labelDepth > 0) {
                labelDepth--;
            }
        });
        parser.addListener('end', () => {
            inputTags.forEach((inputTag) => {
                if (!inputTag.nested && !hasMatchingLabelTag(inputTag)) {
                    reporter.warn('No matching [ label ] tag found.', inputTag.event.line, inputTag.col, this, inputTag.event.raw);
                }
            });
        });
        function hasMatchingLabelTag(inputTag) {
            let found = false;
            labelTags.forEach((labelTag) => {
                if (inputTag.id && inputTag.id === labelTag.forValue) {
                    found = true;
                }
            });
            return found;
        }
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQtcmVxdWlyZXMtbGFiZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29yZS9ydWxlcy9pbnB1dC1yZXF1aXJlcy1sYWJlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBLGtCQUFlO0lBQ2IsRUFBRSxFQUFFLHNCQUFzQjtJQUMxQixXQUFXLEVBQUUsOERBQThEO0lBQzNFLElBQUksQ0FBQyxNQUFNLEVBQUUsUUFBUTtRQUNuQixNQUFNLFNBQVMsR0FJVixFQUFFLENBQUE7UUFDUCxNQUFNLFNBQVMsR0FLVixFQUFFLENBQUE7UUFDUCxJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUE7UUFFbEIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUN2QyxNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFBO1lBQzNDLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFBO1lBQ2hELE1BQU0sR0FBRyxHQUFHLEtBQUssQ0FBQyxHQUFHLEdBQUcsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUE7WUFFMUMsSUFBSSxPQUFPLEtBQUssT0FBTyxFQUFFLENBQUM7Z0JBRXhCLElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLFFBQVEsRUFBRSxDQUFDO29CQUNsQyxTQUFTLENBQUMsSUFBSSxDQUFDO3dCQUNiLEtBQUssRUFBRSxLQUFLO3dCQUNaLEdBQUcsRUFBRSxHQUFHO3dCQUNSLEVBQUUsRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDO3dCQUNsQixNQUFNLEVBQUUsVUFBVSxHQUFHLENBQUM7cUJBQ3ZCLENBQUMsQ0FBQTtnQkFDSixDQUFDO1lBQ0gsQ0FBQztZQUVELElBQUksT0FBTyxLQUFLLE9BQU8sRUFBRSxDQUFDO2dCQUN4QixJQUFJLEtBQUssSUFBSSxRQUFRLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDO29CQUVoRCxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFBO2dCQUN2RSxDQUFDO3FCQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7b0JBR3hCLFVBQVUsRUFBRSxDQUFBO2dCQUNkLENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUE7UUFFRixNQUFNLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ3JDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsS0FBSyxPQUFPLElBQUksVUFBVSxHQUFHLENBQUMsRUFBRSxDQUFDO2dCQUM5RCxVQUFVLEVBQUUsQ0FBQTtZQUNkLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQTtRQUVGLE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRTtZQUM3QixTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7Z0JBQzdCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxJQUFJLENBQUMsbUJBQW1CLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQztvQkFDdkQsUUFBUSxDQUFDLElBQUksQ0FDWCxrQ0FBa0MsRUFDbEMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQ25CLFFBQVEsQ0FBQyxHQUFHLEVBQ1osSUFBSSxFQUNKLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUNuQixDQUFBO2dCQUNILENBQUM7WUFDSCxDQUFDLENBQUMsQ0FBQTtRQUNKLENBQUMsQ0FBQyxDQUFBO1FBRUYsU0FBUyxtQkFBbUIsQ0FBQyxRQUF5QjtZQUNwRCxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUE7WUFDakIsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO2dCQUM3QixJQUFJLFFBQVEsQ0FBQyxFQUFFLElBQUksUUFBUSxDQUFDLEVBQUUsS0FBSyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBQ3JELEtBQUssR0FBRyxJQUFJLENBQUE7Z0JBQ2QsQ0FBQztZQUNILENBQUMsQ0FBQyxDQUFBO1lBQ0YsT0FBTyxLQUFLLENBQUE7UUFDZCxDQUFDO0lBQ0gsQ0FBQztDQUNNLENBQUEifQ==