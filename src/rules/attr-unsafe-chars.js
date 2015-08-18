/**
 * Copyright (c) 2014, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */
HTMLHint.addRule({
    id: 'attr-unsafe-chars',
    description: 'Attribute values cannot contain unsafe chars.',
    init: function(parser, reporter){
        var self = this;
        parser.addListener('tagstart', function(event){
            var attrs = event.attrs,
                attr,
                col = event.col + event.tagName.length + 1;
            var regUnsafe = /[\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/;
            for(var i=0, l=attrs.length;i<l;i++){
                attr = attrs[i];
                if(regUnsafe.test(attr.value) === true){
                    reporter.warn('The value of attribute [ '+attr.name+' ] cannot contain an unsafe char.', event.line, col + attr.index, self, attr.raw);
                }
            }
        });
    }
});