/**
 * Copyright (c) 2014, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */
HTMLHint.addRule({
    id: 'href-abs-or-rel',
    description: 'Href must be absolute or relative.',
    init: function(parser, reporter, options){
        var self = this;

        var hrefMode = options === 'abs' ? 'absolute' : 'relative';

        parser.addListener('tagstart', function(event){
            var attrs = event.attrs;
            var attr;
            var col = event.col + event.tagName.length + 1;

            for(var i=0, l=attrs.length;i<l;i++){
                attr = attrs[i];
                if(attr.name === 'href'){
                    if((hrefMode === 'absolute' && /^\w+?:/.test(attr.value) === false) ||
                        (hrefMode === 'relative' && /^https?:\/\//.test(attr.value) === true)){
                        reporter.error('The value of href [ '+attr.value+' ] must be '+hrefMode+'.', event.line, col + attr.index, self, attr.raw);
                    }
                    break;
                }
            }
        });
    }
});