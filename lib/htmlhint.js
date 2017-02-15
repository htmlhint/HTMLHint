/* jshint -W079 */
/**
 * Copyright (c) 2015, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */
var HTMLHint = (function (undefined) {

    var HTMLHint = {};

    HTMLHint.version = '@VERSION';
    HTMLHint.release = '@RELEASE';

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
        'attr-no-duplication': true,
        'title-require': true
    };

    HTMLHint.addRule = function(rule){
        HTMLHint.rules[rule.id] = rule;
    };

    HTMLHint.verify = function(html, ruleset){

        if(ruleset === undefined || Object.keys(ruleset).length ===0){
            ruleset = HTMLHint.defaultRuleset;
        }

        // parse inline ruleset
        html = html.replace(/^\s*<!--\s*htmlhint\s+([^\r\n]+?)\s*-->/i, function(all, strRuleset){
            if(ruleset === undefined){
                ruleset = {};
            }
            strRuleset.replace(/(?:^|,)\s*([^:,]+)\s*(?:\:\s*([^,\s]+))?/g, function(all, key, value){
                if(value === 'false'){
                    value = false;
                }
                else if(value === 'true'){
                    value = true;
                }
                ruleset[key] = value === undefined ? true : value;
            });
            return '';
        });

        var parser = new HTMLParser();
        var reporter = new HTMLHint.Reporter(html, ruleset);

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

    // format messages
    HTMLHint.format = function(arrMessages, options){
        options = options || {};
        var arrLogs = [];
        var colors = {
            white: '',
            grey: '',
            red: '',
            reset: ''
        };
        if(options.colors){
            colors.white = '\033[37m';
            colors.grey = '\033[90m';
            colors.red = '\033[31m';
            colors.reset = '\033[39m';
        }
        var indent = options.indent || 0;
        arrMessages.forEach(function(hint){
            var leftWindow = 40;
            var rightWindow = leftWindow + 20;
            var evidence = hint.evidence;
            var line = hint.line;
            var col = hint.col;
            var evidenceCount = evidence.length;
            var leftCol = col > leftWindow + 1 ? col - leftWindow : 1;
            var rightCol = evidence.length > col + rightWindow ? col + rightWindow : evidenceCount;
            if(col < leftWindow + 1){
                rightCol += leftWindow - col + 1;
            }
            evidence = evidence.replace(/\t/g, ' ').substring(leftCol - 1, rightCol);
            // add ...
            if(leftCol > 1){
                evidence = '...' + evidence;
                leftCol -= 3;
            }
            if(rightCol < evidenceCount){
                evidence += '...';
            }
            // show evidence
            arrLogs.push(colors.white+repeatStr(indent)+'L'+line+' |' + colors.grey + evidence + colors.reset);
            // show pointer & message
            var pointCol = col - leftCol;
            // add double byte character
            var match = evidence.substring(0, pointCol).match(/[^\u0000-\u00ff]/g);
            if(match !== null){
                pointCol += match.length;
            }
            arrLogs.push(colors.white+repeatStr(indent)+repeatStr(String(line).length + 3 + pointCol)+'^ ' + colors.red + hint.message + ' (' + hint.rule.id+')' + colors.reset);
        });
        return arrLogs;
    };

    // repeat string
    function repeatStr(n, str){
        return new Array(n + 1).join(str || ' ');
    }

    return HTMLHint;

})();

if (typeof exports === 'object' && exports){
    exports.HTMLHint = HTMLHint;
}

/**
 * Copyright (c) 2015, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */
(function(HTMLHint, undefined){

    var Reporter = function(){
        var self = this;
        self._init.apply(self,arguments);
    };

    Reporter.prototype = {
        _init: function(html, ruleset){
            var self = this;
            self.html = html;
            self.lines = html.split(/\r?\n/);
            var match = html.match(/\r?\n/);
            self.brLen = match !== null ? match[0].length : 0;
            self.ruleset = ruleset;
            self.messages = [];
        },
        // error message
        error: function(message, line, col, rule, raw){
            this.report('error', message, line, col, rule, raw);
        },
        // warning message
        warn: function(message, line, col, rule, raw){
            this.report('warning', message, line, col, rule, raw);
        },
        // info message
        info: function(message, line, col, rule, raw){
            this.report('info', message, line, col, rule, raw);
        },
        // save report
        report: function(type, message, line, col, rule, raw){
            var self = this;
            var lines = self.lines;
            var brLen = self.brLen;
            var evidence, evidenceLen;
            for(var i=line-1, lineCount=lines.length;i<lineCount;i++){
                evidence = lines[i];
                evidenceLen = evidence.length;
                if(col > evidenceLen && line < lineCount){
                    line ++;
                    col -= evidenceLen;
                    if(col !== 1){
                        col -= brLen;
                    }
                }
                else{
                    break;
                }
            }
            self.messages.push({
                type: type,
                message: message,
                raw: raw,
                evidence: evidence,
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

/* jshint -W079 */
/**
 * Copyright (c) 2015, Yanis Wang <yanis.wang@gmail.com>
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
            self.lastEvent = null;
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

            var regTag=/<(?:\/([^\s>]+)\s*|!--([\s\S]*?)--|!([^>]*?)|([\w\-:]+)((?:\s+[^\s"'>\/=\x00-\x0F\x7F\x80-\x9F]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'>]*))?)*?)\s*(\/?))>/g,
                regAttr = /\s*([^\s"'>\/=\x00-\x0F\x7F\x80-\x9F]+)(?:\s*=\s*(?:(")([^"]*)"|(')([^']*)'|([^\s"'>]*)))?/g,
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
                col: html.length - lastLineIndex + 1
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
            var lastEvent = self.lastEvent;
            if(lastEvent !== null){
                delete lastEvent['lastEvent'];
                data.lastEvent = lastEvent;
            }
            self.lastEvent = data;
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

(function(HTMLHint, undefined){

    const isAttributeExists = function(attributes, attributeName) {
        if (!Array.isArray(attributes) || typeof attributeName !== "string") {
            return undefined;
        }

        return attributes.some( 
             (attr) =>  attr.name.toLowerCase() === attributeName.toLowerCase()
        );
    };

    const getAttribute = function(attributes, attributeName) {
         if (!Array.isArray(attributes) || typeof attributeName !== "string") {
            return undefined;
        }

        if(isAttributeExists(attributes, attributeName)) {
            return attributes.find( 
                (attr) =>  attr.name.toLowerCase() === attributeName.toLowerCase()
            );
        }

        return undefined;
    };

    HTMLHint.utils = {
        isAttributeExists,
        getAttribute
    };

})(HTMLHint);

/**
 * Copyright (c) 2015, Yanis Wang <yanis.wang@gmail.com>
 * Copyright (c) 2014, Takeshi Kurosawa <taken.spc@gmail.com>
 * MIT Licensed
 */
HTMLHint.addRule({
    id: 'alt-require',
    description: 'The alt attribute of an <img> element must be present and alt attribute of area[href] and input[type=image] must have a value.',
    init: function(parser, reporter){
        var self = this;
        parser.addListener('tagstart', function(event){
            var tagName = event.tagName.toLowerCase(),
                mapAttrs = parser.getMapAttrs(event.attrs),
                col = event.col + tagName.length + 1,
                selector;
            if(tagName === 'img' && !('alt' in mapAttrs)){
                reporter.warn('An alt attribute must be present on <img> elements.', event.line, col, self, event.raw);
            }
            else if((tagName === 'area' && 'href' in mapAttrs) ||
                (tagName === 'input' && mapAttrs['type'] === 'image')){
                if(!('alt' in mapAttrs) || mapAttrs['alt'] === ''){
                    selector = tagName === 'area' ? 'area[href]' : 'input[type=image]';
                    reporter.warn('The alt attribute of ' + selector + ' must have a value.', event.line, col, self, event.raw);
                }
            }
        });
    }
});

/**
 * Copyright (c) 2015, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */
HTMLHint.addRule({
    id: 'attr-lowercase',
    description: 'All attribute names must be in lowercase.',
    init: function(parser, reporter, options){
        var self = this;
        var exceptions = Array.isArray(options) ? options : [];
        parser.addListener('tagstart', function(event){
            var attrs = event.attrs,
                attr,
                col = event.col + event.tagName.length + 1;
            for(var i=0, l=attrs.length;i<l;i++){
                attr = attrs[i];
                var attrName = attr.name;
                if (exceptions.indexOf(attrName) === -1 && attrName !== attrName.toLowerCase()){
                    reporter.error('The attribute name of [ '+attrName+' ] must be in lowercase.', event.line, col + attr.index, self, attr.raw);
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
    description: 'Elements cannot have duplicate attributes.',
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
                    reporter.error('Duplicate of attribute name [ '+attr.name+' ] was found.', event.line, col + attr.index, self, attr.raw);
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
    description: 'Attribute values cannot contain unsafe chars.',
    init: function(parser, reporter){
        var self = this;
        parser.addListener('tagstart', function(event){
            var attrs = event.attrs,
                attr,
                col = event.col + event.tagName.length + 1;
            // exclude \x09(\t), \x0a(\r), \x0d(\n)
            var regUnsafe = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/;
            var match;
            for(var i=0, l=attrs.length;i<l;i++){
                attr = attrs[i];
                match = attr.value.match(regUnsafe);
                if(match !== null){
                    var unsafeCode = escape(match[0]).replace(/%u/, '\\u').replace(/%/, '\\x');
                    reporter.warn('The value of attribute [ '+attr.name+' ] cannot contain an unsafe char [ ' + unsafeCode + ' ].', event.line, col + attr.index, self, attr.raw);
                }
            }
        });
    }
});

/**
 * Copyright (c) 2015, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */
HTMLHint.addRule({
    id: 'attr-value-double-quotes',
    description: 'Attribute values must be in double quotes.',
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
                    reporter.error('The value of attribute [ '+attr.name+' ] must be in double quotes.', event.line, col + attr.index, self, attr.raw);
                }
            }
        });
    }
});
/**
 * Copyright (c) 2015, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */
HTMLHint.addRule({
    id: 'attr-value-not-empty',
    description: 'All attributes must have values.',
    init: function(parser, reporter){
        var self = this;
        parser.addListener('tagstart', function(event){
            var attrs = event.attrs,
                attr,
                col = event.col + event.tagName.length + 1;
            for(var i=0, l=attrs.length;i<l;i++){
                attr = attrs[i];
                if(attr.quote === '' && attr.value === ''){
                    reporter.warn('The attribute [ '+attr.name+' ] must have a value.', event.line, col + attr.index, self, attr.raw);
                }
            }
        });
    }
});
/**
 * Copyright (c) 2015, Yanis Wang <yanis.wang@gmail.com>
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
 * Copyright (c) 2015, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */
HTMLHint.addRule({
    id: 'doctype-first',
    description: 'Doctype must be declared first.',
    init: function(parser, reporter){
        var self = this;
        var allEvent = function(event){
            if(event.type === 'start' || (event.type === 'text' && /^\s*$/.test(event.raw))){
                return;
            }
            if((event.type !== 'comment' && event.long === false) || /^DOCTYPE\s+/i.test(event.content) === false){
                reporter.error('Doctype must be declared first.', event.line, event.col, self, event.raw);
            }
            parser.removeListener('all', allEvent);
        };
        parser.addListener('all', allEvent);
    }
});
/**
 * Copyright (c) 2015, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */
HTMLHint.addRule({
    id: 'doctype-html5',
    description: 'Invalid doctype. Use: "<!DOCTYPE html>"',
    init: function(parser, reporter){
        var self = this;
        function onComment(event){
            if(event.long === false && event.content.toLowerCase() !== 'doctype html'){
                reporter.warn('Invalid doctype. Use: "<!DOCTYPE html>"', event.line, event.col, self, event.raw);
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
 * Copyright (c) 2015, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */
HTMLHint.addRule({
    id: 'head-script-disabled',
    description: 'The <script> tag cannot be used in a <head> tag.',
    init: function(parser, reporter){
        var self = this;
        var reScript = /^(text\/javascript|application\/javascript)$/i;
        var isInHead = false;
        function onTagStart(event){
            var mapAttrs = parser.getMapAttrs(event.attrs);
            var type = mapAttrs.type;
            var tagName = event.tagName.toLowerCase();
            if(tagName === 'head'){
                isInHead = true;
            }
            if(isInHead === true &&
                tagName === 'script' &&
                (!type || reScript.test(type) === true)){
                reporter.warn('The <script> tag cannot be used in a <head> tag.', event.line, event.col, self, event.raw);
            }
        }
        function onTagEnd(event){
            if(event.tagName.toLowerCase() === 'head'){
                parser.removeListener('tagstart', onTagStart);
                parser.removeListener('tagend', onTagEnd);
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
    description: 'An href attribute must be either absolute or relative.',
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
                        reporter.warn('The value of the href attribute [ '+attr.value+' ] must be '+hrefMode+'.', event.line, col + attr.index, self, attr.raw);
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
    description: 'The id and class attributes cannot use the ad keyword, it will be blocked by adblock software.',
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
                        reporter.warn('The value of attribute '+attrName+' cannot use the ad keyword.', event.line, col + attr.index, self, attr.raw);
                    }
                }
            }
        });
    }
});
/**
 * Copyright (c) 2015, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */
HTMLHint.addRule({
    id: 'id-class-value',
    description: 'The id and class attribute values must meet the specified rules.',
    init: function(parser, reporter, options){
        var self = this;
        var arrRules = {
            'underline': {
                'regId': /^[a-z\d]+(_[a-z\d]+)*$/,
                'message': 'The id and class attribute values must be in lowercase and split by an underscore.'
            },
            'dash': {
                'regId': /^[a-z\d]+(-[a-z\d]+)*$/,
                'message': 'The id and class attribute values must be in lowercase and split by a dash.'
            },
            'hump': {
                'regId': /^[a-z][a-zA-Z\d]*([A-Z][a-zA-Z\d]*)*$/,
                'message': 'The id and class attribute values must meet the camelCase style.'
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
 * Copyright (c) 2015, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */
HTMLHint.addRule({
    id: 'id-unique',
    description: 'The value of id attributes must be unique.',
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
                            reporter.error('The id value [ '+id+' ] must be unique.', event.line, col + attr.index, self, attr.raw);
                        }
                    }
                    break;
                }
            }
        });
    }
});
/**
 * Copyright (c) 2015, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */
HTMLHint.addRule({
    id: 'inline-script-disabled',
    description: 'Inline script cannot be used.',
    init: function(parser, reporter){
        var self = this;
        parser.addListener('tagstart', function(event){
            var attrs = event.attrs;
            var attr;
            var col = event.col + event.tagName.length + 1;
            var attrName;
            var reEvent = /^on(unload|message|submit|select|scroll|resize|mouseover|mouseout|mousemove|mouseleave|mouseenter|mousedown|load|keyup|keypress|keydown|focus|dblclick|click|change|blur|error)$/i;

            for(var i=0, l=attrs.length;i<l;i++){
                attr = attrs[i];
                attrName = attr.name.toLowerCase();
                if(reEvent.test(attrName) === true){
                    reporter.warn('Inline script [ '+attr.raw+' ] cannot be used.', event.line, col + attr.index, self, attr.raw);
                }
                else if(attrName === 'src' || attrName === 'href'){
                    if(/^\s*javascript:/i.test(attr.value)){
                        reporter.warn('Inline script [ '+attr.raw+' ] cannot be used.', event.line, col + attr.index, self, attr.raw);
                    }
                }
            }
        });
    }
});

/**
 * Copyright (c) 2015, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */
HTMLHint.addRule({
    id: 'inline-style-disabled',
    description: 'Inline style cannot be used.',
    init: function(parser, reporter){
        var self = this;
        parser.addListener('tagstart', function(event){
            var attrs = event.attrs;
            var attr;
            var col = event.col + event.tagName.length + 1;
            for(var i=0, l=attrs.length;i<l;i++){
                attr = attrs[i];
                if(attr.name.toLowerCase() === 'style'){
                    reporter.warn('Inline style [ '+attr.raw+' ] cannot be used.', event.line, col + attr.index, self, attr.raw);
                }
            }
        });
    }
});

/**
 * Copyright (c) 2015, Yanis Wang <yanis.wang@gmail.com>
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
    description: 'Do not mix tabs and spaces for indentation.',
    init: function(parser, reporter, options){
        var self = this;
        var indentMode = 'nomix';
        var spaceLengthRequire = null;
        if(typeof options === 'string'){
            var match = options.match(/^([a-z]+)(\d+)?/);
            indentMode = match[1];
            spaceLengthRequire = match[2] && parseInt(match[2], 10);
        }
        parser.addListener('text', function(event){
            var raw = event.raw;
            var reMixed = /(^|\r?\n)([ \t]+)/g;
            var match;
            while((match = reMixed.exec(raw))){
                var fixedPos = parser.fixPos(event, match.index + match[1].length);
                if(fixedPos.col !== 1){
                    continue;
                }
                var whiteSpace  = match[2];
                if(indentMode === 'space'){
                    if(spaceLengthRequire){
                        if(/^ +$/.test(whiteSpace) === false || whiteSpace.length % spaceLengthRequire !== 0){
                            reporter.warn('Please use space for indentation and keep '+spaceLengthRequire+' length.', fixedPos.line, 1, self, event.raw);
                        }
                    }
                    else{
                        if(/^ +$/.test(whiteSpace) === false){
                            reporter.warn('Please use space for indentation.', fixedPos.line, 1, self, event.raw);
                        }
                    }
                }
                else if(indentMode === 'tab' && /^\t+$/.test(whiteSpace) === false){
                    reporter.warn('Please use tab for indentation.', fixedPos.line, 1, self, event.raw);
                }
                else if(/ +\t|\t+ /.test(whiteSpace) === true){
                    reporter.warn('Do not mix tabs and spaces for indentation.', fixedPos.line, 1, self, event.raw);
                }
            }
        });
    }
});

/**
 * Copyright (c) 2015, Yanis Wang <yanis.wang@gmail.com>
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
 * Copyright (c) 2015, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */
HTMLHint.addRule({
    id: 'src-not-empty',
    description: 'The src attribute of an img(script,link) must have a value.',
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
                    reporter.error('The attribute [ '+attr.name + ' ] of the tag [ '+tagName+' ] must have a value.', event.line, col + attr.index, self, attr.raw);
                }
            }
        });
    }
});
/**
 * Copyright (c) 2015, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */
HTMLHint.addRule({
    id: 'style-disabled',
    description: '<style> tags cannot be used.',
    init: function(parser, reporter){
        var self = this;
        parser.addListener('tagstart', function(event){
            if(event.tagName.toLowerCase() === 'style'){
                reporter.warn('The <style> tag cannot be used.', event.line, event.col, self, event.raw);
            }
        });
    }
});

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
            mapEmptyTags = parser.makeMap("area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed,track,command,source,keygen,wbr");//HTML 4.01 + HTML 5
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

/**
 * Copyright (c) 2015, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */
HTMLHint.addRule({
    id: 'tag-self-close',
    description: 'Empty tags must be self closed.',
    init: function(parser, reporter){
        var self = this;
        var mapEmptyTags = parser.makeMap("area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed,track,command,source,keygen,wbr");//HTML 4.01 + HTML 5
        parser.addListener('tagstart', function(event){
            var tagName = event.tagName.toLowerCase();
            if(mapEmptyTags[tagName] !== undefined){
                if(!event.close){
                    reporter.warn('The empty tag : [ '+tagName+' ] must be self closed.', event.line, event.col, self, event.raw);
                }
            }
        });
    }
});

/**
 * Copyright (c) 2015, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */
HTMLHint.addRule({
    id: 'tagname-lowercase',
    description: 'All html element names must be in lowercase.',
    init: function(parser, reporter){
        var self = this;
        parser.addListener('tagstart,tagend', function(event){
            var tagName = event.tagName;
            if(tagName !== tagName.toLowerCase()){
                reporter.error('The html element name of [ '+tagName+' ] must be in lowercase.', event.line, event.col, self, event.raw);
            }
        });
    }
});
/**
 * Copyright (c) 2015, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */
HTMLHint.addRule({
    id: 'title-require',
    description: '<title> must be present in <head> tag.',
    init: function(parser, reporter){
        var self = this;
        var headBegin = false;
        var hasTitle = false;
        function onTagStart(event){
            var tagName = event.tagName.toLowerCase();
            if(tagName === 'head'){
                headBegin = true;
            }
            else if(tagName === 'title' && headBegin){
                hasTitle = true;
            }
        }
        function onTagEnd(event){
            var tagName = event.tagName.toLowerCase();
            if(hasTitle && tagName === 'title'){
                var lastEvent = event.lastEvent;
                if(lastEvent.type !== 'text' || (lastEvent.type === 'text' && /^\s*$/.test(lastEvent.raw) === true)){
                    reporter.error('<title></title> must not be empty.', event.line, event.col, self, event.raw);
                }
            }
            else if(tagName === 'head'){
                if(hasTitle === false){
                    reporter.error('<title> must be present in <head> tag.', event.line, event.col, self, event.raw);
                }
                parser.removeListener('tagstart', onTagStart);
                parser.removeListener('tagend', onTagEnd);
            }
        }
        parser.addListener('tagstart', onTagStart);
        parser.addListener('tagend', onTagEnd);
    }
});

HTMLHint.addRule({
    id: 'label-data-for',
    description: 'label within a dynamic table should have a data-for attribute.',
    init: function(parser, reporter){
        var isDynamicTable = function(tagName, attributes) { 
                return (tagName.toLowerCase() === "table") &&                       
                       (HTMLHint.utils.isAttributeExists(attributes,"tfsdata") ||
                        HTMLHint.utils.isAttributeExists(attributes,"tfsnestedtable"));
        };
        var inTable = false;  
        var self = this;
        var unclosedTablesCounter = 0;        
        
        parser.addListener('tagstart', function(event){
          
            var tagName = event.tagName.toLowerCase();           
            if (inTable && tagName==="label" && !HTMLHint.utils.isAttributeExists(event.attrs,"data-for"))
            {
               reporter.error('label within a dynamic table should have a data-for attribute. Error on line ' + event.line , event.line, event.col, self, event.raw);
            }         
            if (isDynamicTable(tagName,event.attrs)  && !event.close){
               unclosedTablesCounter++;
               inTable = true;
            }            
        });
        parser.addListener('tagend', function(event){
            var tagName = event.tagName.toLowerCase();          
            if (tagName === "table" && unclosedTablesCounter>0) {
                unclosedTablesCounter--;
            }
            if (unclosedTablesCounter === 0)  {
                inTable = false;
            }        
        });       
    }
});

HTMLHint.addRule({
        id: 'select-mandatory-id',
        description: 'select elements have must have an id attribute.',
        init: function (parser, reporter) {
            var self = this;
            parser.addListener('tagstart', function (event) {
                var tagName = event.tagName.toLowerCase();
                if (tagName === 'select') {
                    if (!HTMLHint.utils.isAttributeExists(event.attrs,"id")) {
                        reporter.error('select element must have an id attribute. Error on line ' + event.line, event.line, event.col, self, event.raw);
                    }
                }
            });
        }
});
HTMLHint.addRule({
        id: 'tfsdata-mandatory-id',
        description: 'elements with tfsdata/tfsrowdata must have an id attribute.',
        init: function (parser, reporter) {
            var self = this;
            var isPublicElement = function(attributes) { 
                return HTMLHint.utils.isAttributeExists(attributes,"tfsdata") ||
                       HTMLHint.utils.isAttributeExists(attributes,"tfsrowdata");
            };

            parser.addListener('tagstart', function (event) {
                if (isPublicElement(event.attrs)) {
                    if (!HTMLHint.utils.isAttributeExists(event.attrs,"id")) {
                        reporter.error('elements with tfsdata/tfsrowdata must have an id attribute. Error on line ' + event.line, event.line, event.col, self, event.raw);
                    }
                }
            });
        }
});