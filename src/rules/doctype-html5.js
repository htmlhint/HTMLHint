/**
 * Copyright (c) 2013, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */
HTMLHint.addRule({
    id: 'doctype-html5',
    description: 'Doctype must be html5.',
    init: function(parser, reporter){
        var self = this;
        function onComment(event){
            if(event.long === false && event.content.toLowerCase() !== 'doctype html'){
                reporter.error('Doctype must be html5.', event.line, event.col, self, event.raw);
            }
        }
        function onTagStart(){
            parser.removeListener('comment', onComment);
            parser.removeListener('tagstart', onTagStart);
        }
        parser.addListener('all', onComment);
        parser.addListener('tagstart', onTagStart);
    }
});