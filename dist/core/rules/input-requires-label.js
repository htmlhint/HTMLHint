"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    id: 'input-requires-label',
    description: 'All [ input ] tags must have a corresponding [ label ] tag. ',
    init: function (parser, reporter) {
        var _this = this;
        var labelTags = [];
        var inputTags = [];
        parser.addListener('tagstart', function (event) {
            var tagName = event.tagName.toLowerCase();
            var mapAttrs = parser.getMapAttrs(event.attrs);
            var col = event.col + tagName.length + 1;
            if (tagName === 'input') {
                inputTags.push({ event: event, col: col, id: mapAttrs['id'] });
            }
            if (tagName === 'label') {
                if ('for' in mapAttrs && mapAttrs['for'] !== '') {
                    labelTags.push({ event: event, col: col, forValue: mapAttrs['for'] });
                }
            }
        });
        parser.addListener('end', function () {
            inputTags.forEach(function (inputTag) {
                if (!hasMatchingLabelTag(inputTag)) {
                    reporter.warn('No matching [ label ] tag found.', inputTag.event.line, inputTag.col, _this, inputTag.event.raw);
                }
            });
        });
        function hasMatchingLabelTag(inputTag) {
            var found = false;
            labelTags.forEach(function (labelTag) {
                if (inputTag.id && inputTag.id === labelTag.forValue) {
                    found = true;
                }
            });
            return found;
        }
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQtcmVxdWlyZXMtbGFiZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29yZS9ydWxlcy9pbnB1dC1yZXF1aXJlcy1sYWJlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBLGtCQUFlO0lBQ2IsRUFBRSxFQUFFLHNCQUFzQjtJQUMxQixXQUFXLEVBQUUsOERBQThEO0lBQzNFLElBQUksRUFBSixVQUFLLE1BQU0sRUFBRSxRQUFRO1FBQXJCLGlCQStDQztRQTlDQyxJQUFNLFNBQVMsR0FJVixFQUFFLENBQUE7UUFDUCxJQUFNLFNBQVMsR0FBc0QsRUFBRSxDQUFBO1FBRXZFLE1BQU0sQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLFVBQUMsS0FBSztZQUNuQyxJQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFBO1lBQzNDLElBQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFBO1lBQ2hELElBQU0sR0FBRyxHQUFHLEtBQUssQ0FBQyxHQUFHLEdBQUcsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUE7WUFFMUMsSUFBSSxPQUFPLEtBQUssT0FBTyxFQUFFO2dCQUN2QixTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO2FBQy9EO1lBRUQsSUFBSSxPQUFPLEtBQUssT0FBTyxFQUFFO2dCQUN2QixJQUFJLEtBQUssSUFBSSxRQUFRLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRTtvQkFDL0MsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQTtpQkFDdEU7YUFDRjtRQUNILENBQUMsQ0FBQyxDQUFBO1FBRUYsTUFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUU7WUFDeEIsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFDLFFBQVE7Z0JBQ3pCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsRUFBRTtvQkFDbEMsUUFBUSxDQUFDLElBQUksQ0FDWCxrQ0FBa0MsRUFDbEMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQ25CLFFBQVEsQ0FBQyxHQUFHLEVBQ1osS0FBSSxFQUNKLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUNuQixDQUFBO2lCQUNGO1lBQ0gsQ0FBQyxDQUFDLENBQUE7UUFDSixDQUFDLENBQUMsQ0FBQTtRQUVGLFNBQVMsbUJBQW1CLENBQUMsUUFBeUI7WUFDcEQsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFBO1lBQ2pCLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBQyxRQUFRO2dCQUN6QixJQUFJLFFBQVEsQ0FBQyxFQUFFLElBQUksUUFBUSxDQUFDLEVBQUUsS0FBSyxRQUFRLENBQUMsUUFBUSxFQUFFO29CQUNwRCxLQUFLLEdBQUcsSUFBSSxDQUFBO2lCQUNiO1lBQ0gsQ0FBQyxDQUFDLENBQUE7WUFDRixPQUFPLEtBQUssQ0FBQTtRQUNkLENBQUM7SUFDSCxDQUFDO0NBQ00sQ0FBQSJ9