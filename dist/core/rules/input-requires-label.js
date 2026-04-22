"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    id: 'input-requires-label',
    description: 'All [ input ] tags must have a corresponding [ label ] tag. ',
    init(parser, reporter) {
        const labelTags = [];
        const inputTags = [];
        let labelDepth = 0;
        let labelHasText = false;
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
                    labelHasText = false;
                }
            }
        });
        parser.addListener('tagend', (event) => {
            if (event.tagName.toLowerCase() === 'label' && labelDepth > 0) {
                if (!labelHasText) {
                    inputTags.forEach((input) => {
                        if (input.nested) {
                            input.nested = false;
                        }
                    });
                }
                labelDepth--;
            }
        });
        parser.addListener('text', (event) => {
            if (labelDepth > 0 && event.raw && !/^\s*$/.test(event.raw)) {
                labelHasText = true;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQtcmVxdWlyZXMtbGFiZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29yZS9ydWxlcy9pbnB1dC1yZXF1aXJlcy1sYWJlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBLGtCQUFlO0lBQ2IsRUFBRSxFQUFFLHNCQUFzQjtJQUMxQixXQUFXLEVBQUUsOERBQThEO0lBQzNFLElBQUksQ0FBQyxNQUFNLEVBQUUsUUFBUTtRQUNuQixNQUFNLFNBQVMsR0FJVixFQUFFLENBQUE7UUFDUCxNQUFNLFNBQVMsR0FLVixFQUFFLENBQUE7UUFDUCxJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUE7UUFDbEIsSUFBSSxZQUFZLEdBQUcsS0FBSyxDQUFBO1FBRXhCLE1BQU0sQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDdkMsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQTtZQUMzQyxNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTtZQUNoRCxNQUFNLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFBO1lBRTFDLElBQUksT0FBTyxLQUFLLE9BQU8sRUFBRSxDQUFDO2dCQUV4QixJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxRQUFRLEVBQUUsQ0FBQztvQkFDbEMsU0FBUyxDQUFDLElBQUksQ0FBQzt3QkFDYixLQUFLLEVBQUUsS0FBSzt3QkFDWixHQUFHLEVBQUUsR0FBRzt3QkFDUixFQUFFLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQzt3QkFDbEIsTUFBTSxFQUFFLFVBQVUsR0FBRyxDQUFDO3FCQUN2QixDQUFDLENBQUE7Z0JBQ0osQ0FBQztZQUNILENBQUM7WUFFRCxJQUFJLE9BQU8sS0FBSyxPQUFPLEVBQUUs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