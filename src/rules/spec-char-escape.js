/**
 * Copyright (c) 2013, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */
HTMLHint.addRule({
    id: 'spec-char-escape',
    description: 'Special characters must be escaped.',
    init: function(parser, reporter){
        var self = this;
        parser.addListener('text', function(event){
            var match = event.raw.match(/[<>]/);
            if(match !== null){
                reporter.error('Special characters must be escaped : [ '+match[0]+' ].', event.line, event.col + match.index, self, event.raw);
            }
        });
    }
});