/**
 * Copyright (c) 2013, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */
HTMLHint.addRule({
    id: 'style-disabled',
    description: 'Style tag can not be used.',
    init: function(parser, reporter){
        var self = this;
        parser.addListener('tagstart', function(event){
            if(event.tagName.toLowerCase() === 'style'){
                reporter.warn('Style tag can not be used.', event.line, event.col, self, event.raw);
            }
        });
    }
});
