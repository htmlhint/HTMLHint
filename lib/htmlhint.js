/**
 * Copyright (c) 2013, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */
var HTMLHint = (function (undefined) {

    var rules = [];

    var HTMLHint = {};

    HTMLHint.version = '@VERSION';

    HTMLHint.addRule = function(rule){
        rules[rule.id] = rule;
    }

    HTMLHint.verify = function(html, ruleset){
        var parser = new HTMLParser(),
            reporter = new HTMLHint.Reporter(html.split(/\r?\n/), ruleset);
       
        var rule;
        for (id in ruleset){
            rule = rules[id];
            if (rule !== undefined){
                rule.init(parser, reporter, ruleset[id]);
            }
        }

        parser.parse(html);
        
        return reporter.messages;
    }

    return HTMLHint;

})();

if (typeof exports === 'object' && exports){
    exports.HTMLHint = HTMLHint;
}
/**
 * Copyright (c) 2013, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */
(function(HTMLHint, undefined){

    var Reporter = function(){
        var self = this;
        self._init.apply(self,arguments);
    }

    Reporter.prototype = {
        _init: function(lines, ruleset){
            var self = this;
            self.lines = lines;
            self.ruleset = ruleset;
            self.messages = [];
        },
        //错误
        error: function(message, line, col, rule, raw){
            this.report('error', message, line, col, rule, raw);
        },
        //警告
        warn: function(message, line, col, rule, raw){
            this.report('warning', message, line, col, rule, raw);
        },
        //信息
        info: function(message, line, col, rule, raw){
            this.report('info', message, line, col, rule, raw);
        },
        //报告
        report: function(type, message, line, col, rule, raw){
            var self = this;
            self.messages.push({
                type: type,
                message: message,
                raw: raw,
                evidence: self.lines[line-1],
                line: line,
                col: col,
                rule: rule
            });
        }
    };

    HTMLHint.Reporter = Reporter;

})(HTMLHint);
/**
 * Copyright (c) 2013, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */
var HTMLParser = (function(undefined){

    var HTMLParser = function(){
        var self = this;
        self._init.apply(self,arguments);
    };

    HTMLParser.prototype = {
        _init: function(options){
            var self = this;
            self._listeners = {};
            self._mapCdataTags = self.makeMap("script,style");
            self._arrBlocks = [];
        },

        makeMap: function(str){
            var obj = {}, items = str.split(",");
            for ( var i = 0; i < items.length; i++ )obj[ items[i] ] = true;
            return obj;
        },

        parse: function(html){

            var self = this,
                mapCdataTags = self._mapCdataTags;

            var regTag=/<(?:\/([^\s>]+)|!--([\s\S]*?)--|!([^>]*?)|([\w\-:]+)((?:"[^"]*"|'[^']*'|[^"'<>])*?)\s*(\/?))>/g,
                regAttr = /\s*([\w\-:]+)(?:\s*=\s*(?:(")([^"]*)"|(')([^']*)'|([^\s]+)))?/g,
                regLine = /\r?\n/g;

            var match, matchIndex, lastIndex = 0, tagName, arrAttrs, tagCDATA, arrCDATA, lastCDATAIndex = 0, text;
            var lastLineIndex = 0, line = 1;
            var arrBlocks = self._arrBlocks;

            self.fire('start', {
                pos: 0,
                line: 1,
                col: 1
            });

            while(match = regTag.exec(html)){
                matchIndex = match.index;
                if(matchIndex > lastIndex){//保存前面的文本或者CDATA
                    text = html.substring(lastIndex, matchIndex);
                    if(tagCDATA){
                        arrCDATA.push(text);
                    }
                    else{//文本
                        saveBlock('text', text, lastIndex);
                    }
                }
                lastIndex = regTag.lastIndex;

                if(tagName = match[1]){
                    if(tagCDATA && tagName === tagCDATA){//结束标签前输出CDATA
                        text = arrCDATA.join('');
                        saveBlock('cdata', text, lastCDATAIndex, {
                            'tagName': tagCDATA
                        });
                        tagCDATA = null;
                        arrCDATA = null;
                    }
                    if(!tagCDATA){
                        //标签结束
                        saveBlock('tagend', match[0], matchIndex, {
                            'tagName': tagName
                        });
                        continue;
                    }
                }

                if(tagCDATA){
                    arrCDATA.push(match[0]);
                }
                else{
                    if(tagName = match[4]){//标签开始
                        arrAttrs = [];
                        var attrs = match[5], attrMatch;
                        while(attrMatch = regAttr.exec(attrs)){
                            var name = attrMatch[1],
                                quote = attrMatch[2] ? attrMatch[2] :
                                    attrMatch[4] ? attrMatch[4] : '',
                                value = attrMatch[3] ? attrMatch[3] :
                                    attrMatch[5] ? attrMatch[5] :
                                    attrMatch[6] ? attrMatch[6] : '';
                            arrAttrs.push({'name': name, 'value': value, 'quote': quote, 'index': attrMatch.index, 'raw': attrMatch[0]});
                        }
                        saveBlock('tagstart', match[0], matchIndex, {
                            'tagName': tagName,
                            'attrs': arrAttrs,
                            'close': match[6]
                        });
                        if(mapCdataTags[tagName]){
                            tagCDATA = tagName;
                            arrCDATA = [];
                            lastCDATAIndex = lastIndex;
                        }
                    }
                    else if(match[2] || match[3]){//注释标签
                        saveBlock('comment', match[0], matchIndex, {
                            'content': match[2] || match[3],
                            'long': match[2]?true:false
                        });
                    }
                }
            }
            
            if(html.length > lastIndex){
                //结尾文本
                text = html.substring(lastIndex, html.length);
                saveBlock('text', text, lastIndex);
            }

            self.fire('end', {
                pos: lastIndex,
                line: line,
                col: lastIndex - lastLineIndex + 1
            });

            //存储区块
            function saveBlock(type, raw, pos, data){
                var col = pos - lastLineIndex + 1;
                if(data === undefined){
                    data = {};
                }
                data.raw = raw;
                data.pos = pos;
                data.line = line;
                data.col = col;
                arrBlocks.push(data);
                self.fire(type, data);
                var lineMatch;
                while(lineMatch = regLine.exec(raw)){
                    line ++;
                    lastLineIndex = pos + regLine.lastIndex;
                }
            }

        },

        addListener: function(type, listener){
            var _listeners = this._listeners;
            var arrType = type.split(/[,\s]/), type;
            for(var i=0, l = arrType.length;i<l;i++){
                type = arrType[i];
                if (_listeners[type] === undefined){
                    _listeners[type] = [];
                }
                _listeners[type].push(listener);
            }
        },

        fire: function(type, data){
            if (data === undefined){
                data = {};
            }
            data.type = type;
            var self = this,
                listeners = [],
                listenersType = self._listeners[type],
                listenersAll = self._listeners['all'];
            if (listenersType !== undefined){
                listeners = listeners.concat(listenersType);
            }
            if (listenersAll !== undefined){
                listeners = listeners.concat(listenersAll);
            }
            for (var i = 0, l = listeners.length; i < l; i++){
                listeners[i].call(self, data);
            }          
        },

        removeListener: function(type, listener){
            var listenersType = this._listeners[type];
            if(listenersType !== undefined){
                for (var i = 0, l = listenersType.length; i < l; i++){
                    if (listenersType[i] === listener){
                        listenersType.splice(i, 1);
                        break;
                    }
                }
            }
        }
    };

    return HTMLParser;

})();

if (typeof exports === 'object' && exports){
    exports.HTMLHint = HTMLHint;
}
/**
 * Copyright (c) 2013, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */
HTMLHint.addRule({
    id: 'attr-lowercase',
    description: 'Attribute name must be lowercase.',
    init: function(parser, reporter){
        var self = this;
        parser.addListener('tagstart', function(event){
            var attrs = event.attrs,
                attr,
                col = event.col + event.tagName.length + 1;
            for(var i=0, l=attrs.length;i<l;i++){
                attr = attrs[i];
                var attrName = attr.name;
                if(attrName !== attrName.toLowerCase()){
                    reporter.error('Attribute name [ '+attrName+' ] must be lower case.', event.line, col + attr.index, self, attr.raw);
                }
            }
        });
    }
});
/**
 * Copyright (c) 2013, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */
HTMLHint.addRule({
    id: 'attr-value-double-quotes',
    description: 'Attribute value must closed by double quotes.',
    init: function(parser, reporter){
        var self = this;
        parser.addListener('tagstart', function(event){
            var attrs = event.attrs,
                attr,
                col = event.col + event.tagName.length + 1;
            for(var i=0, l=attrs.length;i<l;i++){
                attr = attrs[i];
                if(attr.quote !== '' && attr.quote !== '"'){
                    reporter.error('The value of attribute [ '+attr.name+' ] must closed by double quotes.', event.line, col + attr.index, self, attr.raw);
                }
            }
        });
    }
});
/**
 * Copyright (c) 2013, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */
HTMLHint.addRule({
    id: 'attr-value-empty',
    description: 'Attribute must set value.',
    init: function(parser, reporter){
        var self = this;
        parser.addListener('tagstart', function(event){
            var attrs = event.attrs,
                attr,
                col = event.col + event.tagName.length + 1;;
            for(var i=0, l=attrs.length;i<l;i++){
                attr = attrs[i];
                if(attr.quote === '' && attr.value === ''){
                    reporter.error('The attribute [ '+attr.name+' ] must set value.', event.line, col + attr.index, self, attr.raw);
                }
            }
        });
    }
});
/**
 * Copyright (c) 2013, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */
HTMLHint.addRule({
    id: 'doctype-first',
    description: 'Doctype must be first.',
    init: function(parser, reporter){
        var self = this;
        var allEvent = function(event){
            if(event.type === 'start' || (event.type === 'text' && /^\s*$/.test(event.raw))){
                return;
            }
            if((event.type !== 'comment' && event.long === false) || /^DOCTYPE\s+/i.test(event.content) === false){
                reporter.error('Doctype must be first.', event.line, event.col, self, event.raw);
            }
            parser.removeListener('all', allEvent);
        }
        parser.addListener('all', allEvent);
    }
});
/**
 * Copyright (c) 2013, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */
HTMLHint.addRule({
    id: 'doctype-html5',
    description: 'Doctype must be html5.',
    init: function(parser, reporter){
        var self = this;
        function comment(event){
            if(event.long === false && event.content.toLowerCase() !== 'doctype html'){
                reporter.error('Doctype must be html5.', event.line, event.col, self, event.raw);
            }
        }
        function tagStart(){
            parser.removeListener('comment', comment);
            parser.removeListener('tagstart', tagStart);
        }
        parser.addListener('all', comment);
        parser.addListener('tagstart', tagStart);
    }
});
/**
 * Copyright (c) 2013, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */
HTMLHint.addRule({
    id: 'id-class-value',
    description: 'Id and class value must meet some rules.',
    init: function(parser, reporter, options){
        var self = this;
        var arrRules = {
            'underline': {
                'regId': /^[a-z\d]+(_[a-z\d]+)*$/,
                'message': 'Id and class value must lower case and split by underline.'
            },
            'dash': {
                'regId': /^[a-z\d]+(-[a-z\d]+)*$/,
                'message': 'Id and class value must lower case and split by dash.'
            },
            'hump': {
                'regId': /^[a-z][a-zA-Z\d]*([A-Z][a-zA-Z\d]*)*$/,
                'message': 'Id and class value must meet hump style.'
            }
        }, rule;
        if(typeof options === 'string'){
            rule = arrRules[options];
        }
        else{
            rule = options;
        }
        if(rule && rule.regId){
            var regId = rule.regId,
                message = rule.message;
            parser.addListener('tagstart', function(event){
                var attrs = event.attrs, attr;
                for(var i=0, l=attrs.length;i<l;i++){
                    attr = attrs[i];
                    if(attr.name.toLowerCase() === 'id'){
                        if(regId.test(attr.value) === false){
                            reporter.error(message, event.line, event.col, self, attr.raw);
                        }
                    }
                    if(attr.name.toLowerCase() === 'class'){
                        var arrClass = attr.value.split(/\s+/g), classValue;
                        for(var i=0, l=arrClass.length;i<l;i++){
                            classValue = arrClass[i];
                            if(classValue && regId.test(classValue) === false){
                                reporter.error(message, event.line, event.col, self, classValue);
                            }
                        }
                    }
                }
            });
        }
    }
});
/**
 * Copyright (c) 2013, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */
HTMLHint.addRule({
    id: 'spec-char-escape',
    description: 'Special characters must be escaped.',
    init: function(parser, reporter){
        var self = this;
        parser.addListener('text', function(event){
            if(/[<>]/.test(event.raw) === true){
                reporter.error('Special characters must be escaped.', event.line, event.col, self, event.raw);
            }
        });
    }
});
/**
 * Copyright (c) 2013, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */
HTMLHint.addRule({
    id: 'style-disabled',
    description: 'Style tag can not be use.',
    init: function(parser, reporter){
        var self = this;
        parser.addListener('tagstart', function(event){
            if(event.tagName.toLowerCase() === 'style'){
                reporter.error('Style tag can not be use.', event.line, event.col, self, event.raw);
            }
        });
    }
});
/**
 * Copyright (c) 2013, Yanis Wang <yanis.wang@gmail.com>
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
            if(mapEmptyTags[tagName] !== undefined){
                if(!event.close){
                    reporter.error('The empty tag must closed by self.', event.line, event.col, self, event.raw);
                }
            }
            else if (!event.close){
                stack.push(event.tagName.toLowerCase());
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
                    reporter.error('Tag must be paired, Missing: [ '+ arrTags.join('') + ' ]', event.line, event.col, self, event.raw);
                }
                stack.length=pos;
            }
            else{
                reporter.error('Tag must be paired, No start tag.', event.line, event.col, self, event.raw);
            }
        });
        parser.addListener('end', function(event){
            var arrTags = [];
            for(var i=stack.length-1;i>=0;i--){
                arrTags.push('</'+stack[i]+'>');
            }
            if(arrTags.length > 0){
                reporter.error('Tag must be paired, Missing: [ '+ arrTags.join('') + ' ]', event.line, event.col, self, event.raw);
            }
        });
    }
});
/**
 * Copyright (c) 2013, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */
HTMLHint.addRule({
    id: 'tagname-lowercase',
    description: 'Tagname must be lowercase.',
    init: function(parser, reporter){
        var self = this;
        parser.addListener('tagstart,tagend', function(event){
            var tagName = event.tagName;
            if(tagName !== tagName.toLowerCase()){
                reporter.error('Tagname [ '+tagName+' ] must be lower case.', event.line, event.col, self, event.raw);
            }
        });
    }
});