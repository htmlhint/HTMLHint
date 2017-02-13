/**
* Copyright (c) Dylan Martin <dmarticus@gmail.com>
* MIT Licensed
*/
HTMLHint.addRule({
  id: 'no-hard-coded-text',
  description: 'cannot have hard-coded strings appearing between qtranslate tags',
  init: function(parser, reporter){
    var self = this;
    parser.addListener('text', function(event){
            var raw = event.raw,
                reSpecChar = /[a-z\s]/g,
                match;
            while((match = reSpecChar.exec(raw))){
                var fixedPos = parser.fixPos(event, match.index);
                reporter.error('there cannot be a space in: '+raw+'.', fixedPos.line, fixedPos.col, self, event.raw);
            }
        });
    }
});


