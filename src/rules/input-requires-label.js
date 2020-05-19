export default {
    id: 'input-requires-label',
    description: 'All [ input ] tags must have a corresponding [ label ] tag. ',
    init: function(parser, reporter){
        var self = this,
            labelTags = [],
            inputTags = [];

        parser.addListener('tagstart', function(event) {
            var tagName = event.tagName.toLowerCase(),
              mapAttrs = parser.getMapAttrs(event.attrs),
              col = event.col + tagName.length + 1;

            if (tagName === 'input') {
                inputTags.push({event: event, col: col, id: mapAttrs['id']});
            }

            if (tagName === 'label') {
                if (('for' in mapAttrs) && mapAttrs['for'] !== '') {
                    labelTags.push({event: event, col: col, forValue: mapAttrs['for']});
                }
            }

        });

        parser.addListener('end', function() {
            inputTags.forEach(function(inputTag) {
                if (!hasMatchingLabelTag(inputTag)) {
                    reporter.warn('No matching [ label ] tag found.', inputTag.event.line, inputTag.col, self, inputTag.event.raw);
                }
            });
        });


        function hasMatchingLabelTag(inputTag) {
            var found = false;
            labelTags.forEach(function(labelTag){
                if (inputTag.id && (inputTag.id === labelTag.forValue)) {
                    found = true;
                }
            });
            return found;

        }
    }
};
