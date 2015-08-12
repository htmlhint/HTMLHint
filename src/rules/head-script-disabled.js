/**
 * Copyright (c) 2015, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */
HTMLHint.addRule({
    id: 'head-script-disabled',
    description: 'The script tag can not be used in head.',
    init: function(parser, reporter){
        var self = this;
        var reScript = /^(text\/javascript|application\/javascript)$/i;
        function onHeadStart(event){
            if(event.tagName.toLowerCase() === 'head'){
                parser.addListener('tagstart', onTagStart);
            }
        }
        function onTagStart(event){
            var mapAttrs = parser.getMapAttrs(event.attrs);
            var type = mapAttrs.type;
            if(event.tagName.toLowerCase() === 'script' &&
                (!type || reScript.test(type) === true)){
                reporter.warn('The script tag can not be used in head.', event.line, event.col, self, event.raw);
            }
        }
        function onTagEnd(event){
            if(event.tagName.toLowerCase() === 'head'){
                parser.removeListener('tagstart', onHeadStart);
                parser.removeListener('tagstart', onTagStart);
                parser.removeListener('tagstart', onTagEnd);
            }
        }
        parser.addListener('tagstart', onHeadStart);
        parser.addListener('tagend', onTagEnd);
    }
});
