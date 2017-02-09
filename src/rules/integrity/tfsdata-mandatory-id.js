HTMLHint.addRule({
        id: 'tfsdata-mandatory-id',
        description: 'elements with tfsdata/tfsrowdata must have an id attribute.',
        init: function (parser, reporter) {
            var self = this;
            var isPublicElement = function(attributes) { 
                return HTMLHint.utils.isAttributeExists(attributes,"tfsdata") ||
                       HTMLHint.utils.isAttributeExists(attributes,"tfsrowdata");
            };

            parser.addListener('tagstart', function (event) {
                if (isPublicElement(event.attrs)) {
                    if (!HTMLHint.utils.isAttributeExists(event.attrs,"id")) {
                        reporter.error('elements with tfsdata/tfsrowdata must have an id attribute.', event.line, event.col, self, event.raw);
                    }
                }
            });
        }
});