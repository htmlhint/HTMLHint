/**
 * Copyright (c) 2014, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */
HTMLHint.addRule({
    id: 'space-tab-mixed-disabled',
    description: 'Do not mix tabs and spaces for indentation.',
    init: function(parser, reporter, options){
        var self = this;
        parser.addListener('text', function(event){
            var raw = event.raw;
            var reMixed = /(^|\r?\n)([ \t]+)/g;
            var match;
            while((match = reMixed.exec(raw))){
                var fixedPos = parser.fixPos(event, match.index + match[1].length);
                if(options === 'space' && /^ +$/.test(match[2]) === false){
                    reporter.warn('Please use space for indentation.', fixedPos.line, 1, self, event.raw);
                }
                else if(options === 'tab' && /^\t+$/.test(match[2]) === false){
                    reporter.warn('Please use tab for indentation.', fixedPos.line, 1, self, event.raw);
                }
                else if(/ +\t|\t+ /.test(match[2]) === true){
                    reporter.warn('Do not mix tabs and spaces for indentation.', fixedPos.line, 1, self, event.raw);
                }
            }
        });
    }
});
