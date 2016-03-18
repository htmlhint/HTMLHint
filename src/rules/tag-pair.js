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
            mapEmptyTags = parser.makeMap("area,base,basefont,br,col,embed,frame,hr,img,input,isindex,keygen,link,meta,param,source,track,wbr");//HTML 4.01 + HTML5
        parser.addListener('tagstart', function(event){
            var tagName = event.tagName.toLowerCase();
            if (mapEmptyTags[tagName] === undefined && !event.close){
                stack.push({
                    tagName: tagName,
                    line: event.line,
                    raw: event.raw
                });
            }
        });
        parser.addListener('tagend', function(event){
            var tagName = event.tagName.toLowerCase();
            //向上寻找匹配的开始标签
            for(var pos = stack.length-1;pos >= 0; pos--){
                if(stack[pos].tagName === tagName){
                    break;
                }
            }
            if(pos >= 0){
                var arrTags = [];
                for(var i=stack.length-1;i>pos;i--){
                    arrTags.push('</'+stack[i].tagName+'>');
                }
                if(arrTags.length > 0){
                    var lastEvent = stack[stack.length-1];
                    reporter.error('Tag must be paired, missing: [ '+ arrTags.join('') + ' ], start tag match failed [ ' + lastEvent.raw + ' ] on line ' + lastEvent.line + '.', event.line, event.col, self, event.raw);
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
                arrTags.push('</'+stack[i].tagName+'>');
            }
            if(arrTags.length > 0){
                var lastEvent = stack[stack.length-1];
                reporter.error('Tag must be paired, missing: [ '+ arrTags.join('') + ' ], open tag match failed [ ' + lastEvent.raw + ' ] on line ' + lastEvent.line + '.', event.line, event.col, self, '');
            }
        });
    }
});
