/**
 * MIT Licensed
 */
HTMLHint.addRule({
    id: 'id-require',
    description: 'The id attribute of an <input> element must be present and have a value',
    init: function(parser, reporter){
        var self = this;
        parser.addListener('tagstart', function(event){
            var tagName = event.tagName.toLowerCase(),
                mapAttrs = parser.getMapAttrs(event.attrs),
                col = event.col + tagName.length + 1;

            if(tagName === 'input'){
                if(!('id' in mapAttrs)){
                    reporter.warn('An id attribute must be present on <input> elements.', event.line, col, self, event.raw);
                } else {
                    if(mapAttrs['id'] === '' ){
                        reporter.warn('An id attribute if <input> must have a value', event.line, col, self, event.raw);
                    }
                }
            }
        });
    }
});
