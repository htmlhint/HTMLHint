/**
 * Copyright (c) 2015, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */
HTMLHint.addRule({
    id: 'style-disabled',
    description: 'Style tag can not be use.',
    init: function(parser, reporter){
        var self = this;
        parser.addListener('tagstart', function(event){
            if(event.tagName.toLowerCase() === 'style'){
                reporter.warn('Style tag can not be use.', event.line, event.col, self, event.raw);
            }
        });
    }
});