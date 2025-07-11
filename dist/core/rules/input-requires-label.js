"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    id: 'input-requires-label',
    description: 'All [ input ] tags must have a corresponding [ label ] tag. ',
    init(parser, reporter) {
        const labelTags = [];
        const inputTags = [];
        parser.addListener('tagstart', (event) => {
            const tagName = event.tagName.toLowerCase();
            const mapAttrs = parser.getMapAttrs(event.attrs);
            const col = event.col + tagName.length + 1;
            if (tagName === 'input') {
                if (mapAttrs['type'] !== 'hidden') {
                    inputTags.push({ event: event, col: col, id: mapAttrs['id'] });
                }
            }
            if (tagName === 'label') {
                if ('for' in mapAttrs && mapAttrs['for'] !== '') {
                    labelTags.push({ event: event, col: col, forValue: mapAttrs['for'] });
                }
            }
        });
        parser.addListener('end', () => {
            inputTags.forEach((inputTag) => {
                if (!hasMatchingLabelTag(inputTag)) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQtcmVxdWlyZXMtbGFiZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29yZS9ydWxlcy9pbnB1dC1yZXF1aXJlcy1sYWJlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBLGtCQUFlO0lBQ2IsRUFBRSxFQUFFLHNCQUFzQjtJQUMxQixXQUFXLEVBQUUsOERBQThEO0lBQzNFLElBQUksQ0FBQyxNQUFNLEVBQUUsUUFBUTtRQUNuQixNQUFNLFNBQVMsR0FJVixFQUFFLENBQUE7UUFDUCxNQUFNLFNBQVMsR0FBc0QsRUFBRSxDQUFBO1FBRXZFLE1BQU0sQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDdkMsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQTtZQUMzQyxNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTtZQUNoRCxNQUFNLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFBO1lBRTFDLElBQUksT0FBTyxLQUFLLE9BQU8sRUFBRSxDQUFDO2dCQUV4QixJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxRQUFRLEVBQUUsQ0FBQztvQkFDbEMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQTtnQkFDaEUsQ0FBQztZQUNILENBQUM7WUFFRCxJQUFJLE9BQU8sS0FBSyxPQUFPLEVBQUUsQ0FBQztnQkFDeEIsSUFBSSxLQUFLLElBQUksUUFBUSxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQztvQkFDaEQsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQTtnQkFDdkUsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQTtRQUVGLE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRTtZQUM3QixTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7Z0JBQzdCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDO29CQUNuQyxRQUFRLENBQUMsSUFBSSxDQUNYLGtDQUFrQyxFQUNsQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksRUFDbkIsUUFBUSxDQUFDLEdBQUcsRUFDWixJQUFJLEVBQ0osUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQ25CLENBQUE7Z0JBQ0gsQ0FBQztZQUNILENBQUMsQ0FBQyxDQUFBO1FBQ0osQ0FBQyxDQUFDLENBQUE7UUFFRixTQUFTLG1CQUFtQixDQUFDLFFBQXlCO1lBQ3BELElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQTtZQUNqQixTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7Z0JBQzdCLElBQUksUUFBUSxDQUFDLEVBQUUsSUFBSSxRQUFRLENBQUMsRUFBRSxLQUFLLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztvQkFDckQsS0FBSyxHQUFHLElBQUksQ0FBQTtnQkFDZCxDQUFDO1lBQ0gsQ0FBQyxDQUFDLENBQUE7WUFDRixPQUFPLEtBQUssQ0FBQTtRQUNkLENBQUM7SUFDSCxDQUFDO0NBQ00sQ0FBQSJ9