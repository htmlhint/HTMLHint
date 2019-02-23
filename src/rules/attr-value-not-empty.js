HTMLHint.addRule({
    id: 'attr-value-not-empty',
    description: 'All attributes must have values.',
    init: function(parser, reporter){
        var self = this;
        parser.addListener('tagstart', function(event){
            var attrs = event.attrs,
                attr,
                col = event.col + event.tagName.length + 1;
            for(var i=0, l=attrs.length;i<l;i++){
                attr = attrs[i];
                if(attr.quote === '' && attr.value === ''){
                    reporter.warn('The attribute [ '+attr.name+' ] must have a value.', event.line, col + attr.index, self, attr.raw);
                }
            }
        });
    }
});
