/**
 * Copyright (c) 2013, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */
HTMLHint.addRule({
    id: 'head-script-disabled',
    description: 'The script tag can not be used in head.',
    init: function(parser, reporter){
        var self = this;
        function onTagStart(event){
            if(event.tagName.toLowerCase() === 'script'){
                reporter.error('The script tag can not be used in head.', event.line, event.col, self, event.raw);
            }
        }
        function onTagEnd(event){
            if(event.tagName.toLowerCase() === 'head'){
                parser.removeListener('tagstart', onTagStart);
                parser.removeListener('tagstart', onTagEnd);
            }
        }
        parser.addListener('tagstart', onTagStart);
        parser.addListener('tagend', onTagEnd);
    }
});