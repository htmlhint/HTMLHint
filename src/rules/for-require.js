/**
 * MIT Licensed
 */
HTMLHint.addRule({
    id: 'for-require',
    description: 'The for attribute of a <label> element must be present.',
    init: function(parser, reporter){
        var self = this;
        parser.addListener('tagstart', function(event){
            var tagName = event.tagName.toLowerCase(),
                mapAttrs = parser.getMapAttrs(event.attrs),
                col = event.col + tagName.length + 1;
            if (tagName === 'label'){

                if(!('for' in mapAttrs)){
                    reporter.warn('A for attribute must be present on <label> elements.', event.line, col, self, event.raw);
                } else {
                    if (mapAttrs['for'] === '') {
                        reporter.warn('The for attribute of label must have a value.', event.line, col, self, event.raw);
                    }
                }
            }
        });
    }
});
