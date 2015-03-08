/**
 * Copyright (c) 2015, Yanis Wang <yanis.wang@gmail.com>
 * Copyright (c) 2014, Takeshi Kurosawa <taken.spc@gmail.com>
 * MIT Licensed
 */
HTMLHint.addRule({
    id: 'alt-require',
    description: 'Alt of img must be present and alt of area[href] and input[type=image] must be set value.',
    init: function(parser, reporter){
        var self = this;
        parser.addListener('tagstart', function(event){
            var tagName = event.tagName.toLowerCase(),
                mapAttrs = parser.getMapAttrs(event.attrs),
                col = event.col + tagName.length + 1,
                selector;
            if(tagName === 'img' && !('alt' in mapAttrs)){
                reporter.warn('Alt of img tag must be present.', event.line, col, self, event.raw);
            }
            else if((tagName === 'area' && 'href' in mapAttrs) ||
                (tagName === 'input' && mapAttrs['type'] === 'image')){
                if(!('alt' in mapAttrs) || mapAttrs['alt'] === ''){
                    selector = tagName === 'area' ? 'area[href]' : 'input[type=image]';
                    reporter.warn('Alt of ' + selector + ' must be set value.', event.line, col, self, event.raw);
                }
            }
        });
    }
});
