/**
 * Copyright (c) 2013, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */
var HTMLHint = (function (undefined) {

    var HTMLHint = {};

    HTMLHint.version = '@VERSION';

    HTMLHint.rules = {};

    //默认配置
    HTMLHint.defaultRuleset = {
        'tagname-lowercase': true,
        'attr-lowercase': true,
        'attr-value-double-quotes': true,
        'doctype-first': true,
        'tag-pair': true,
        'spec-char-escape': true,
        'id-unique': true,
        'src-not-empty': true,
        'attr-no-duplication': true
    };

    HTMLHint.addRule = function(rule){
        HTMLHint.rules[rule.id] = rule;
    };

    HTMLHint.verify = function(html, ruleset){
        // parse inline ruleset
        html = html.replace(/^\s*<!--\s*htmlhint\s+([^\r\n]+?)\s*-->/i, function(all, strRuleset){
            if(ruleset === undefined){
                ruleset = {};
            }
            strRuleset.replace(/(?:^|,)\s*([^:]+)\s*:\s*([^,\s]+)/g, function(all, key, value){
                if(value === 'false'){
                    value = false;
                }
                else if(value === 'true'){
                    value = true;
                }
                ruleset[key] = value;
            });
            return '';
        });

        if(ruleset === undefined || Object.keys(ruleset).length ===0){
            ruleset = HTMLHint.defaultRuleset;
        }

        var parser = new HTMLParser();
        var reporter = new HTMLHint.Reporter(html.split(/\r?\n/), ruleset);

        var rules = HTMLHint.rules,
            rule;
        for (var id in ruleset){
            rule = rules[id];
            if (rule !== undefined && ruleset[id] !== false){
              rule.init(parser, reporter, ruleset[id]);
            }
        }

        parser.parse(html);

        return reporter.messages;
    };

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
    };

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
                rule: {
                    id: rule.id,
                    description: rule.description,
                    link: 'https://github.com/yaniswang/HTMLHint/wiki/' + rule.id
                }
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
        _init: function(){
            var self = this;
            self._listeners = {};
            self._mapCdataTags = self.makeMap("script,style");
            self._arrBlocks = [];
        },

        makeMap: function(str){
            var obj = {}, items = str.split(",");
            for ( var i = 0; i < items.length; i++ ){
                obj[ items[i] ] = true;
            }
            return obj;
        },

        // parse html code
        parse: function(html){

            var self = this,
                mapCdataTags = self._mapCdataTags;

            var regTag=/<(?:\/([^\s>]+)\s*|!--([\s\S]*?)--|!([^>]*?)|([\w\-:]+)((?:\s+[\w\-:]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"']+))?)*?)\s*(\/?))>/g,
                regAttr = /\s*([\w\-:]+)(?:\s*=\s*(?:(")([^"]*)"|(')([^']*)'|([^\s"']+)))?/g,
                regLine = /\r?\n/g;

            var match, matchIndex, lastIndex = 0, tagName, arrAttrs, tagCDATA, attrsCDATA, arrCDATA, lastCDATAIndex = 0, text;
            var lastLineIndex = 0, line = 1;
            var arrBlocks = self._arrBlocks;

            self.fire('start', {
                pos: 0,
                line: 1,
                col: 1
            });

            while((match = regTag.exec(html))){
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

                if((tagName = match[1])){
                    if(tagCDATA && tagName === tagCDATA){//结束标签前输出CDATA
                        text = arrCDATA.join('');
                        saveBlock('cdata', text, lastCDATAIndex, {
                            'tagName': tagCDATA,
                            'attrs': attrsCDATA
                        });
                        tagCDATA = null;
                        attrsCDATA = null;
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
                    if((tagName = match[4])){//标签开始
                        arrAttrs = [];
                        var attrs = match[5],
                            attrMatch,
                            attrMatchCount = 0;
                        while((attrMatch = regAttr.exec(attrs))){
                            var name = attrMatch[1],
                                quote = attrMatch[2] ? attrMatch[2] :
                                    attrMatch[4] ? attrMatch[4] : '',
                                value = attrMatch[3] ? attrMatch[3] :
                                    attrMatch[5] ? attrMatch[5] :
                                    attrMatch[6] ? attrMatch[6] : '';
                            arrAttrs.push({'name': name, 'value': value, 'quote': quote, 'index': attrMatch.index, 'raw': attrMatch[0]});
                            attrMatchCount += attrMatch[0].length;
                        }
                        if(attrMatchCount === attrs.length){
                            saveBlock('tagstart', match[0], matchIndex, {
                                'tagName': tagName,
                                'attrs': arrAttrs,
                                'close': match[6]
                            });
                            if(mapCdataTags[tagName]){
                                tagCDATA = tagName;
                                attrsCDATA = arrAttrs.concat();
                                arrCDATA = [];
                                lastCDATAIndex = lastIndex;
                            }
                        }
                        else{//如果出现漏匹配，则把当前内容匹配为text
                            saveBlock('text', match[0], matchIndex);
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
                while((lineMatch = regLine.exec(raw))){
                    line ++;
                    lastLineIndex = pos + regLine.lastIndex;
                }
            }

        },

        // add event
        addListener: function(types, listener){
            var _listeners = this._listeners;
            var arrTypes = types.split(/[,\s]/), type;
            for(var i=0, l = arrTypes.length;i<l;i++){
                type = arrTypes[i];
                if (_listeners[type] === undefined){
                    _listeners[type] = [];
                }
                _listeners[type].push(listener);
            }
        },

        // fire event
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

        // remove event
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
        },

        //fix pos if event.raw have \n
        fixPos: function(event, index){
            var text = event.raw.substr(0, index);
            var arrLines = text.split(/\r?\n/),
                lineCount = arrLines.length - 1,
                line = event.line, col;
            if(lineCount > 0){
                line += lineCount;
                col = arrLines[lineCount].length + 1;
            }
            else{
                col = event.col + index;
            }
            return {
                line: line,
                col: col
            };
        },

        // covert array type of attrs to map
        getMapAttrs: function(arrAttrs){
            var mapAttrs = {},
                attr;
            for(var i=0,l=arrAttrs.length;i<l;i++){
                attr = arrAttrs[i];
                mapAttrs[attr.name] = attr.value;
            }
            return mapAttrs;
        }
    };

    return HTMLParser;

})();

if (typeof exports === 'object' && exports){
    exports.HTMLParser = HTMLParser;
}
/**
 * Copyright (c) 2013, Yanis Wang <yanis.wang@gmail.com>
 * Copyright (c) 2014, Takeshi Kurosawa <taken.spc@gmail.com>
 * MIT Licensed
 */
HTMLHint.addRule({
    id: 'alt-require',
    description: 'Alt of img must be present and alt of area[href] and input[type=image] must be set value.',
    init: function(parser, reporter){
        var self = this;
        parser.addListener('tagstart', function(event){
            var tagName = event.tagName.toLowerCase(),
                mapAttrs = parser.getMapAttrs(event.attrs),
                col = event.col + tagName.length + 1,
                selector;
            if(tagName === 'img' && !('alt' in mapAttrs)){
                reporter.warn('Alt of img tag must be present.', event.line, col, self, event.raw);
            }
            else if((tagName === 'area' && 'href' in mapAttrs) ||
                (tagName === 'input' && mapAttrs['type'] === 'image')){
                if(!('alt' in mapAttrs) || mapAttrs['alt'] === ''){
                    selector = tagName === 'area' ? 'area[href]' : 'input[type=image]';
                    reporter.warn('Alt of ' + selector + ' must be set value.', event.line, col, self, event.raw);
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
 * Copyright (c) 2014, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */
HTMLHint.addRule({
    id: 'attr-no-duplication',
    description: 'Attribute name can not been duplication.',
    init: function(parser, reporter){
        var self = this;
        parser.addListener('tagstart', function(event){
            var attrs = event.attrs;
            var attr;
            var attrName;
            var col = event.col + event.tagName.length + 1;

            var mapAttrName = {};
            for(var i=0, l=attrs.length;i<l;i++){
                attr = attrs[i];
                attrName = attr.name;
                if(mapAttrName[attrName] === true){
                    reporter.error('The name of attribute [ '+attr.name+' ] been duplication.', event.line, col + attr.index, self, attr.raw);
                }
                mapAttrName[attrName] = true;
            }
        });
    }
});
/**
 * Copyright (c) 2014, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */
HTMLHint.addRule({
    id: 'attr-unsafe-chars',
    description: 'Attribute value cant not use unsafe chars.',
    init: function(parser, reporter){
        var self = this;
        parser.addListener('tagstart', function(event){
            var attrs = event.attrs,
                attr,
                col = event.col + event.tagName.length + 1;
            var regUnsafe = /[\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/;
            for(var i=0, l=attrs.length;i<l;i++){
                attr = attrs[i];
                if(regUnsafe.test(attr.value) === true){
                    reporter.warn('The value of attribute [ '+attr.name+' ] cant not use unsafe chars.', event.line, col + attr.index, self, attr.raw);
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
                if((attr.value !== '' && attr.quote !== '"') ||
                    (attr.value === '' && attr.quote === "'")){
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
    id: 'attr-value-not-empty',
    description: 'Attribute must set value.',
    init: function(parser, reporter){
        var self = this;
        parser.addListener('tagstart', function(event){
            var attrs = event.attrs,
                attr,
                col = event.col + event.tagName.length + 1;
            for(var i=0, l=attrs.length;i<l;i++){
                attr = attrs[i];
                if(attr.quote === '' && attr.value === ''){
                    reporter.warn('The attribute [ '+attr.name+' ] must set value.', event.line, col + attr.index, self, attr.raw);
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
    id: 'csslint',
    description: 'Scan css with csslint.',
    init: function(parser, reporter, options){
        var self = this;
        parser.addListener('cdata', function(event){
            if(event.tagName.toLowerCase() === 'style'){

                var cssVerify;

                if(typeof exports === 'object' && require){
                    cssVerify = require("csslint").CSSLint.verify;
                }
                else{
                    cssVerify = CSSLint.verify;
                }

                if(options !== undefined){
                    var styleLine = event.line - 1,
                        styleCol = event.col - 1;
                    try{
                        var messages = cssVerify(event.raw, options).messages;
                        messages.forEach(function(error){
                            var line = error.line;
                            reporter[error.type==='warning'?'warn':'error']('['+error.rule.id+'] '+error.message, styleLine + line, (line === 1 ? styleCol : 0) + error.col, self, error.evidence);
                        });
                    }
                    catch(e){}
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
        };
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
        function onComment(event){
            if(event.long === false && event.content.toLowerCase() !== 'doctype html'){
                reporter.warn('Doctype must be html5.', event.line, event.col, self, event.raw);
            }
        }
        function onTagStart(){
            parser.removeListener('comment', onComment);
            parser.removeListener('tagstart', onTagStart);
        }
        parser.addListener('all', onComment);
        parser.addListener('tagstart', onTagStart);
    }
});
/**
 * Copyright (c) 2013, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */
HTMLHint.addRule({
    id: 'head-script-disabled',
    description: 'The script tag can not be used in head.',
    init: function(parser, reporter){
        var self = this;
        function onTagStart(event){
            if(event.tagName.toLowerCase() === 'script'){
                reporter.warn('The script tag can not be used in head.', event.line, event.col, self, event.raw);
            }
        }
        function onTagEnd(event){
            if(event.tagName.toLowerCase() === 'head'){
                parser.removeListener('tagstart', onTagStart);
                parser.removeListener('tagstart', onTagEnd);
            }
        }
        parser.addListener('tagstart', onTagStart);
        parser.addListener('tagend', onTagEnd);
    }
});
/**
 * Copyright (c) 2014, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */
HTMLHint.addRule({
    id: 'href-abs-or-rel',
    description: 'Href must be absolute or relative.',
    init: function(parser, reporter, options){
        var self = this;

        var hrefMode = options === 'abs' ? 'absolute' : 'relative';

        parser.addListener('tagstart', function(event){
            var attrs = event.attrs;
            var attr;
            var col = event.col + event.tagName.length + 1;

            for(var i=0, l=attrs.length;i<l;i++){
                attr = attrs[i];
                if(attr.name === 'href'){
                    if((hrefMode === 'absolute' && /^\w+?:/.test(attr.value) === false) ||
                        (hrefMode === 'relative' && /^https?:\/\//.test(attr.value) === true)){
                        reporter.warn('The value of href [ '+attr.value+' ] must be '+hrefMode+'.', event.line, col + attr.index, self, attr.raw);
                    }
                    break;
                }
            }
        });
    }
});
/**
 * Copyright (c) 2014, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */
HTMLHint.addRule({
    id: 'id-class-ad-disabled',
    description: 'Id and class can not use ad keyword, it will blocked by adblock software.',
    init: function(parser, reporter){
        var self = this;
        parser.addListener('tagstart', function(event){
            var attrs = event.attrs;
            var attr;
            var attrName;
            var col = event.col + event.tagName.length + 1;

            for(var i=0, l=attrs.length;i<l;i++){
                attr = attrs[i];
                attrName = attr.name;
                if(/^(id|class)$/i.test(attrName)){
                    if(/(^|[-\_])ad([-\_]|$)/i.test(attr.value)){
                        reporter.warn('The value of '+attrName+' can not use ad keyword.', event.line, col + attr.index, self, attr.raw);
                    }
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
                var attrs = event.attrs,
                    attr,
                    col = event.col + event.tagName.length + 1;
                for(var i=0, l1=attrs.length;i<l1;i++){
                    attr = attrs[i];
                    if(attr.name.toLowerCase() === 'id'){
                        if(regId.test(attr.value) === false){
                            reporter.warn(message, event.line, col + attr.index, self, attr.raw);
                        }
                    }
                    if(attr.name.toLowerCase() === 'class'){
                        var arrClass = attr.value.split(/\s+/g), classValue;
                        for(var j=0, l2=arrClass.length;j<l2;j++){
                            classValue = arrClass[j];
                            if(classValue && regId.test(classValue) === false){
                                reporter.warn(message, event.line, col + attr.index, self, classValue);
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
    id: 'id-unique',
    description: 'Id must be unique.',
    init: function(parser, reporter){
        var self = this;
        var mapIdCount = {};
        parser.addListener('tagstart', function(event){
            var attrs = event.attrs,
                attr,
                id,
                col = event.col + event.tagName.length + 1;
            for(var i=0, l=attrs.length;i<l;i++){
                attr = attrs[i];
                if(attr.name.toLowerCase() === 'id'){
                    id = attr.value;
                    if(id){
                        if(mapIdCount[id] === undefined){
                            mapIdCount[id] = 1;
                        }
                        else{
                            mapIdCount[id] ++;
                        }
                        if(mapIdCount[id] > 1){
                            reporter.error('Id redefinition of [ '+id+' ].', event.line, col + attr.index, self, attr.raw);
                        }
                    }
                    break;
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
    id: 'jshint',
    description: 'Scan script with jshint.',
    init: function(parser, reporter, options){
        var self = this;
        parser.addListener('cdata', function(event){
            if(event.tagName.toLowerCase() === 'script'){

                var mapAttrs = parser.getMapAttrs(event.attrs),
                    type = mapAttrs.type;

                // Only scan internal javascript
                if(mapAttrs.src !== undefined || (type && /^(text\/javascript)$/i.test(type) === false)){
                    return;
                }

                var jsVerify;

                if(typeof exports === 'object' && require){
                    jsVerify = require('jshint').JSHINT;
                }
                else{
                    jsVerify = JSHINT;
                }

                if(options !== undefined){
                    var styleLine = event.line - 1,
                        styleCol = event.col - 1;
                    var code = event.raw.replace(/\t/g,' ');
                    try{
                        var status = jsVerify(code, options);
                        if(status === false){
                            jsVerify.errors.forEach(function(error){
                                var line = error.line;
                                reporter.warn(error.reason, styleLine + line, (line === 1 ? styleCol : 0) + error.character, self, error.evidence);
                            });
                        }
                    }
                    catch(e){}
                }

            }
        });
    }
});
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
            var raw = event.raw;
            var reMixed = /(^|\r?\n)( +\t|\t+ )/g;
            var match;
            while((match = reMixed.exec(raw))){
                var fixedPos = parser.fixPos(event, match.index + match[1].length);
                reporter.warn('Mixed spaces and tabs in front of line.', fixedPos.line, 1, self, event.raw);
            }
        });
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
            var raw = event.raw,
                reSpecChar = /[<>]/g,
                match;
            while((match = reSpecChar.exec(raw))){
                var fixedPos = parser.fixPos(event, match.index);
                reporter.error('Special characters must be escaped : [ '+match[0]+' ].', fixedPos.line, fixedPos.col, self, event.raw);
            }
        });
    }
});
/**
 * Copyright (c) 2013, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */
HTMLHint.addRule({
    id: 'src-not-empty',
    description: 'Src of img(script,link) must set value.',
    init: function(parser, reporter){
        var self = this;
        parser.addListener('tagstart', function(event){
            var tagName = event.tagName,
                attrs = event.attrs,
                attr,
                col = event.col + tagName.length + 1;
            for(var i=0, l=attrs.length;i<l;i++){
                attr = attrs[i];
                if(((/^(img|script|embed|bgsound|iframe)$/.test(tagName) === true && attr.name === 'src') ||
                    (tagName === 'link' && attr.name === 'href') ||
                    (tagName === 'object' && attr.name === 'data')) &&
                    attr.value === ''){
                    reporter.error('[ '+attr.name + '] of [ '+tagName+' ] must set value.', event.line, col + attr.index, self, attr.raw);
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
    id: 'style-disabled',
    description: 'Style tag can not be use.',
    init: function(parser, reporter){
        var self = this;
        parser.addListener('tagstart', function(event){
            if(event.tagName.toLowerCase() === 'style'){
                reporter.warn('Style tag can not be use.', event.line, event.col, self, event.raw);
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
                    reporter.error('Tag must be paired, Missing: [ '+ arrTags.join('') + ' ]', event.line, event.col, self, event.raw);
                }
                stack.length=pos;
            }
            else{
                reporter.error('Tag must be paired, No start tag: [ ' + event.raw + ' ]', event.line, event.col, self, event.raw);
            }
        });
        parser.addListener('end', function(event){
            var arrTags = [];
            for(var i=stack.length-1;i>=0;i--){
                arrTags.push('</'+stack[i]+'>');
            }
            if(arrTags.length > 0){
                reporter.error('Tag must be paired, Missing: [ '+ arrTags.join('') + ' ]', event.line, event.col, self, '');
            }
        });
    }
});
/**
 * Copyright (c) 2013, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */
HTMLHint.addRule({
    id: 'tag-self-close',
    description: 'The empty tag must closed by self.',
    init: function(parser, reporter){
        var self = this;
        var mapEmptyTags = parser.makeMap("area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed");//HTML 4.01
        parser.addListener('tagstart', function(event){
            var tagName = event.tagName.toLowerCase();
            if(mapEmptyTags[tagName] !== undefined){
                if(!event.close){
                    reporter.warn('The empty tag : [ '+tagName+' ] must closed by self.', event.line, event.col, self, event.raw);
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