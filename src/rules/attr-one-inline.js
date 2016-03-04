/**
 * Copyright (c) 2014, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */
HTMLHint.addRule({
    id: 'attr-one-inline',
    description: 'An href attribute must be either absolute or relative.',
    init: function(parser, reporter){
        var self = this;

        parser.addListener('tagstart', function(event){
            var html = event.html;

            var rawSpaces = html
              .replace(/\s{2,}/g, ' ')
              .replace(' />', '/>')
              .replace('< ', '<')
              .trim()
              .match(/\s+(?=([^"]*"[^"]*")*[^"]*$)/g);

            var spaceCount = rawSpaces && rawSpaces.length || 0;

            var attrBreaks = html
              .match(/\n+(?=([^"]*"[^"]*")*[^"]*$)/g);

            var breakCount = attrBreaks && attrBreaks.length || 0;

            if (spaceCount > 1 && spaceCount !== breakCount + 1) {
                reporter.error('Only one inline attributes allowed',
                  event.line, event.col, self, event.raw);
            }

        });
    }
});