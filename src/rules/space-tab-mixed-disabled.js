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
            if(event.pos === 0 && /^( +\t|\t+ )/.test(event.raw) === true){
                reporter.warn('Mixed spaces and tabs in front of line.', event.line, 0, self, event.raw);
            }
        });
    }
});