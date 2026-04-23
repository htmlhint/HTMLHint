"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    id: 'input-requires-label',
    description: 'All [ input ] tags must have a corresponding [ label ] tag. ',
    init(parser, reporter) {
        const labelTags = [];
        const inputTags = [];
        let labelDepth = 0;
        const labelStateStack = [];
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
                    labelStateStack.push({
                        hasText: false,
                        inputStartIndex: inputTags.length,
                    });
                }
            }
        });
        parser.addListener('tagend', (event) => {
            if (event.tagName.toLowerCase() === 'label' && labelDepth > 0) {
                const state = labelStateStack.pop();
                if (state && !state.hasText) {
                    for (let i = state.inputStartIndex; i < inputTags.length; i++) {
                        inputTags[i].nested = false;
                    }
                }
                else if (state && state.hasText && labelStateStack.length > 0) {
                    labelStateStack[labelStateStack.length - 1].hasText = true;
                }
                labelDepth--;
            }
        });
        parser.addListener('text', (event) => {
            if (labelDepth > 0 &&
                event.raw &&
                !/^\s*$/.test(event.raw) &&
                labelStateStack.length > 0) {
                labelStateStack[labelStateStack.length - 1].hasText = true;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQtcmVxdWlyZXMtbGFiZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29yZS9ydWxlcy9pbnB1dC1yZXF1aXJlcy1sYWJlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBLGtCQUFlO0lBQ2IsRUFBRSxFQUFFLHNCQUFzQjtJQUMxQixXQUFXLEVBQUUsOERBQThEO0lBQzNFLElBQUksQ0FBQyxNQUFNLEVBQUUsUUFBUTtRQUNuQixNQUFNLFNBQVMsR0FJVixFQUFFLENBQUE7UUFDUCxNQUFNLFNBQVMsR0FLVixFQUFFLENBQUE7UUFDUCxJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUE7UUFDbEIsTUFBTSxlQUFlLEdBR2hCLEVBQUUsQ0FBQTtRQUVQLE1BQU0sQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDdkMsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQTtZQUMzQyxNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTtZQUNoRCxNQUFNLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFBO1lBRTFDLElBQUksT0FBTyxLQUFLLE9BQU8sRUFBRSxDQUFDO2dCQUV4QixJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxRQUFRLEVBQUUsQ0FBQztvQkFDbEMsU0FBUyxDQUFDLElBQUksQ0FBQzt3QkFDYixLQUFLLEVBQUUsS0FBSzt3QkFDWixHQUFHLEVBQUUsR0FBRzt3QkFDUixFQUFFLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQzt3QkFDbEIsTUFBTSxFQUFFLFVBQVUsR0FBRyxDQUFDO3FCQUN2QixDQUFDLENBQUE7Z0JBQ0osQ0FBQztZQUNILENBQUM7WUFFRCxJQUFJLE9BQU8sS0FBSyxPQUFPLEVBQUUsQ0FBQztnQkFDeEIsSUFBSSxLQUFLLElBQUksUUFBUSxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQztvQkFFaEQsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQTtnQkFDdkUsQ0FBQztxQkFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO29CQUd4QixVQUFVLEVBQUUsQ0FBQTtvQkFDWixlQUFlLENBQUMsSUFBSSxDQUFDO3dCQUNuQixPQUFPLEVBQUUsS0FBSzt3QkFDZCxlQUFlLEVBQUUsU0FBUyxDQUFDLE1BQU07cUJBQ2xDLENBQUMsQ0FBQTtnQkFDSixDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFBO1FBRUYsTUFBTSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNyQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEtBQUssT0FBTyxJQUFJLFVBQVUsR0FBRyxDQUFDLEVBQUUsQ0FBQztnQkFDOUQsTUFBTSxLQUFLLEdBQUcsZUFBZSxDQUFDLEdBQUcsRUFBRSxDQUFBO2dCQUNuQyxJQUFJLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztvQkFDNUIsS0FBSyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsZUFBZSxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7d0JBQzlELFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFBO29CQUM3QixDQUFDO2dCQUNILENBQUM7cUJBQU0sSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLE9BQU8sSUFBSSxlQUFlLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDO29CQUNoRSxlQUFlLENBQUMsZUFBZSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFBO2dCQUM1RCxDQUFDO2dCQUNELFVBQVUsRUFBRSxDQUFBO1lBQ2QsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFBO1FBRUYsTUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNuQyxJQUNFLFVBQVUsR0FBRyxDQUFDO2dCQUNkLEtBQUssQ0FBQyxHQUFHO2dCQUNULENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO2dCQUN4QixlQUFlLENBQUMsTUFBTSxHQUFHLENBQUMsRUFDMUIsQ0FBQztnQkFDRCxlQUFlLENBQUMsZUFBZSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFBO1lBQzVELENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQTtRQUVGLE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRTtZQUM3QixTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7Z0JBQzdCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxJQUFJLENBQUMsbUJBQW1CLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQztvQkFDdkQsUUFBUSxDQUFDLElBQUksQ0FDWCxrQ0FBa0MsRUFDbEMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQ25CLFFBQVEsQ0FBQyxHQUFHLEVBQ1osSUFBSSxFQUNKLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUNuQixDQUFBO2dCQUNILENBQUM7WUFDSCxDQUFDLENBQUMsQ0FBQTtRQUNKLENBQUMsQ0FBQyxDQUFBO1FBRUYsU0FBUyxtQkFBbUIsQ0FBQyxRQUF5QjtZQUNwRCxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUE7WUFDakIsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO2dCQUM3QixJQUFJLFFBQVEsQ0FBQyxFQUFFLElBQUksUUFBUSxDQUFDLEVBQUUsS0FBSyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBQ3JELEtBQUssR0FBRyxJQUFJLENBQUE7Z0JBQ2QsQ0FBQztZQUNILENBQUMsQ0FBQyxDQUFBO1lBQ0YsT0FBTyxLQUFLLENBQUE7UUFDZCxDQUFDO0lBQ0gsQ0FBQztDQUNNLENBQUEifQ==