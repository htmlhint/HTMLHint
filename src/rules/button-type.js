/**
 * Copyright (c) 2017, Markus Peroebner <markus.peroebner@gmail.com>
 * MIT Licensed
 */
HTMLHint.addRule({
    id: 'button-type',
    description: 'The type attribute of a button must be either submit, reset or button.',
    init: function(parser, reporter){
        var self = this;
        parser.addListener('tagstart', function(event){
            var tagName = event.tagName,
                attrs = event.attrs,
                attr,
                col = event.col + tagName.length + 1,
                hasType = false;
            if(tagName !== 'button'){
                return;
            }
            for(var i=0, l=attrs.length;i<l;i++){
                attr = attrs[i];
                if(tagName === 'button' && attr.name === 'type'){
                    hasType = true;
                    if(attr.value !== 'submit' && attr.value !== 'reset' && attr.value !== 'button'){
                        reporter.error('The type of a button must have a value which is either submit, reset or button.', event.line, col + attr.index, self, attr.raw);
                    }
                }
            }
            if(!hasType){
                reporter.error('A button must have a type attribute.', event.line, col, self, event.raw);                
            }
        });
    }
});
