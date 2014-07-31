/**
 * Contributed by Jeff Nassiff <jnassiff@gmail.com>
 * MIT Licensed
 */
HTMLHint.addRule({
    id: 'tag-self-terminated',
    description: 'Non-void tags may not be self-terminated.',
    init: function(parser, reporter){
        var self = this;
        var mapEmptyTags = parser.makeMap("area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed");//HTML 4.01
        parser.addListener('tagstart', function(event){
            var tagName = event.tagName.toLowerCase();
            if(mapEmptyTags[tagName] === undefined){
                if(event.close){
                    reporter.warn('The tag : [ '+tagName+' ] may not be self-terminated.', event.line, event.col, self, event.raw);
                }
            }
        });
    }
});