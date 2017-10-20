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

            // Remove PHP
            html = html.replace(/<\?(?:php)?(?:[\s\S])+?\?>/gi, function (match) {
                var newlines = match.match(/\r?\n|\r/g);
                var newlineCount = newlines ? newlines.length : 0;

                var ret = '';
                for (var i = 0; i < newlineCount; i++) {
                    ret += '\n';
                }
                return ret;
            });

            // Break if only whitespace
            if (html.replace(/\s/g, '').length <= 0) {
                console.log(html);
                console.log(html.replace(/\s/g, '').length);
                console.log('breaking');
                self.fire('end');
                return;
            }

            /*
            // Break if json
            var isJson = (function (str) {
                try {
                    JSON.parse(str);
                } catch (e) {
                    return false;
                }
                return true;
            })(html);
            if (isJson) {
                console.log(html);
                console.log('isJson: ', isJson);
                console.log('breaking');
                self.fire('end');
                return;
            }
            */

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
