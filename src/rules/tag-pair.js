/**
 * Copyright (c) 2015, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */
HTMLHint.addRule({
    id: 'tag-pair',
    description: 'Tag must be paired.',
    init: function(parser, reporter){
        var self = this;
        var stack=[],
            mapEmptyTags = parser.makeMap("area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed");//HTML 4.01
        parser.addListener('tagstart', function(event){
            var tagName = event.tagName.toLowerCase();
            if (mapEmptyTags[tagName] === undefined && !event.close){
                stack.push(tagName);
            }
        });
        parser.addListener('tagend', function(event){
            var tagName = event.tagName.toLowerCase();
            //向上寻找匹配的开始标签
            for(var pos = stack.length-1;pos >= 0; pos--){
                if(stack[pos] === tagName){
                    break;
                }
            }
            if(pos >= 0){
                var arrTags = [];
                for(var i=stack.length-1;i>pos;i--){
                    arrTags.push('</'+stack[i]+'>');
                }
                if(arrTags.length > 0){
                    reporter.error('Tag must be paired, missing: [ '+ arrTags.join('') + ' ]', event.line, event.col, self, event.raw);
                }
                stack.length=pos;
            }
            else{
                reporter.error('Tag must be paired, no start tag: [ ' + event.raw + ' ]', event.line, event.col, self, event.raw);
            }
        });
        parser.addListener('end', function(event){
            var arrTags = [];
            for(var i=stack.length-1;i>=0;i--){
                arrTags.push('</'+stack[i]+'>');
            }
            if(arrTags.length > 0){
                reporter.error('Tag must be paired, missing: [ '+ arrTags.join('') + ' ]', event.line, event.col, self, '');
            }
        });
    }
});