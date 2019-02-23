HTMLHint.addRule({
    id: 'attr-lowercase',
    description: 'All attribute names must be in lowercase.',
    init: function(parser, reporter, options){
        var self = this;
        var exceptions = Array.isArray(options) ? options : [];
        parser.addListener('tagstart', function(event){
            var attrs = event.attrs,
                attr,
                col = event.col + event.tagName.length + 1;
            for(var i=0, l=attrs.length;i<l;i++){
                attr = attrs[i];
                var attrName = attr.name;
                if (exceptions.indexOf(attrName) === -1 && attrName !== attrName.toLowerCase()){
                    reporter.error('The attribute name of [ '+attrName+' ] must be in lowercase.', event.line, col + attr.index, self, attr.raw);
                }
            }
        });
    }
});
