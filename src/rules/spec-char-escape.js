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
            if(/[<>]/.test(event.raw) === true){
                reporter.error('Special characters must be escaped.', event.line, event.col, self, event.raw);
            }
        });
    }
});