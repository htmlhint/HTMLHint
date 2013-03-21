/**
 * Copyright (c) 2013, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */
HTMLHint.addRule({
    id: 'img-alt-require',
    description: 'Alt of img tag must be set value.',
    init: function(parser, reporter){
        var self = this;
        parser.addListener('tagstart', function(event){
            if(event.tagName.toLowerCase() === 'img'){
                var attrs = event.attrs;
                var haveAlt = false;
                for(var i=0, l=attrs.length;i<l;i++){
                    if(attrs[i].name.toLowerCase() === 'alt'){
                        haveAlt = true;
                        break;
                    }
                }
                if(haveAlt === false){
                    reporter.warn('Alt of img tag must be set value.', event.line, event.col, self, event.raw);
                }
            }
        });
    }
});