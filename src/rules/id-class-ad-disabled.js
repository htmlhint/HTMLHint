/**
 * Copyright (c) 2014, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */
HTMLHint.addRule({
    id: 'id-class-ad-disabled',
    description: 'Id and class can not use ad keyword, it will blocked by adblock software.',
    init: function(parser, reporter){
        var self = this;
        parser.addListener('tagstart', function(event){
            var attrs = event.attrs;
            var attr;
            var attrName;
            var col = event.col + event.tagName.length + 1;

            for(var i=0, l=attrs.length;i<l;i++){
                attr = attrs[i];
                attrName = attr.name;
                if(/^(id|class)$/i.test(attrName)){
                    if(/(^|[-\_])ad([-\_]|$)/i.test(attr.value)){
                        reporter.warn('The value of '+attrName+' can not use ad keyword.', event.line, col + attr.index, self, attr.raw);
                    }
                }
            }
        });
    }
});