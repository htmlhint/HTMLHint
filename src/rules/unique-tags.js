/**
 * Copyright (c) 2015, DragorWW <DragorWW@gmail.com>
 * The idea of rule is taken of philipwalton/html-inspector
 * MIT Licensed
 */
HTMLHint.addRule({
    id: 'unique-tags',
    description: 'unique tags <title> or <main>, must be one on page!',
    init: function(parser, reporter){
        var uniqueTags = ["title", "main"],
            map = {},
            self = this;

        uniqueTags.forEach(function(item) {
            map[item] = 0;
        });

        function onTagStart(event){
            var tagName = event.tagName.toLowerCase();
            if(typeof map[tagName] !== 'undefined'){

                if (++map[tagName] > 1) {
                    reporter.error('<' + tagName +'> must be one page', event.line, event.col, self, event.raw);
                }
            }
        }
        parser.addListener('tagstart', onTagStart);
    }
});
