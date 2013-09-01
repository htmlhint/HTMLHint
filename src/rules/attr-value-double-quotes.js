/**
 * Copyright (c) 2013, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */
HTMLHint.addRule({
    id: 'attr-value-double-quotes',
    description: 'Attribute value must closed by double quotes.',
    init: function(parser, reporter){
        var self = this;
        parser.addListener('tagstart', function(event){
            var attrs = event.attrs,
                attr,
                col = event.col + event.tagName.length + 1;
            for(var i=0, l=attrs.length;i<l;i++){
                attr = attrs[i];
                if(attr.quote !== '"' && attr.quote !== ''){
                    reporter.error('The value of attribute [ '+attr.name+' ] must closed by double quotes.', event.line, col + attr.index, self, attr.raw);
                }
            }
        });
    }
});