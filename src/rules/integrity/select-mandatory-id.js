HTMLHint.addRule({
        id: 'select-mandatory-id',
        description: 'select elements have must have an id attribute.',
        init: function (parser, reporter) {
            var self = this;
            parser.addListener('tagstart', function (event) {
                var tagName = event.tagName.toLowerCase();
                if (tagName === 'select') {
                    if (!HTMLHint.utils.isAttributeExists(event.attrs,"id")) {
                        reporter.error('select element must have an id attribute!', event.line, event.col, self, event.raw);
                    }
                }
            });
        }
});