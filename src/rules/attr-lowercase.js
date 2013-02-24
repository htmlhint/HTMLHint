/**
 * Copyright (c) 2013, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */
HTMLHint.addRule({
    id: 'attr-lowercase',
    description: 'Attribute name must be lowercase.',
    init: function(parser, reporter){
        var self = this;
        parser.addListener('tagstart', function(event){
            var attrs = event.attrs,
                attr,
                col = event.col + event.tagName.length + 1;
            for(var i=0, l=attrs.length;i<l;i++){
                attr = attrs[i];
                var attrName = attr.name;
                if(attrName !== attrName.toLowerCase()){
                    reporter.error('Attribute name [ '+attrName+' ] must be lower case.', event.line, col + attr.index, self, attr.raw);
                }
            }
        });
    }
});