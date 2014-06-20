/**
 * Copyright (c) 2014, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */
HTMLHint.addRule({
    id: 'space-tab-mixed-disabled',
    description: 'Spaces and tabs can not mixed in front of line.',
    init: function(parser, reporter){
        var self = this;
        parser.addListener('text', function(event){
            var raw = event.raw;
            var reMixed = /(^|\r?\n)( +\t|\t+ )/g;
            var match;
            while((match = reMixed.exec(raw))){
                var fixedPos = parser.fixPos(event, match.index + match[1].length);
                reporter.warn('Mixed spaces and tabs in front of line.', fixedPos.line, 1, self, event.raw);
            }
        });
    }
});