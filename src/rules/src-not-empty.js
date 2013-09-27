/**
 * Copyright (c) 2013, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */
HTMLHint.addRule({
    id: 'src-not-empty',
    description: 'Src of img(script,link) must set value.',
    init: function(parser, reporter){
        var self = this;
        parser.addListener('tagstart', function(event){
            var tagName = event.tagName,
                attrs = event.attrs,
                attr,
                col = event.col + tagName.length + 1;
            for(var i=0, l=attrs.length;i<l;i++){
                attr = attrs[i];
                if(((/^(img|script|embed|bgsound|iframe)$/.test(tagName) === true && attr.name === 'src') ||
                    (tagName === 'link' && attr.name === 'href') ||
                    (tagName === 'object' && attr.name === 'data')) &&
                    attr.value === ''){
                    reporter.error('[ '+attr.name + '] of [ '+tagName+' ] must set value.', event.line, col + attr.index, self, attr.raw);
                }
            }
        });
    }
});