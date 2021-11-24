"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HTMLParser = (function () {
    function HTMLParser() {
        this._listeners = {};
        this._mapCdataTags = this.makeMap('script,style');
        this._arrBlocks = [];
        this.lastEvent = null;
    }
    HTMLParser.prototype.makeMap = function (str) {
        var obj = {};
        var items = str.split(',');
        for (var i = 0; i < items.length; i++) {
            obj[items[i]] = true;
        }
        return obj;
    };
    HTMLParser.prototype.parse = function (html) {
        var _this = this;
        var mapCdataTags = this._mapCdataTags;
        var regTag = /<(?:\/([^\s>]+)\s*|!--([\s\S]*?)--|!([^>]*?)|([\w\-:]+)((?:\s+[^\s"'>\/=\x00-\x0F\x7F\x80-\x9F]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'>]*))?)*?)\s*(\/?))>/g;
        var regAttr = /\s*([^\s"'>\/=\x00-\x0F\x7F\x80-\x9F]+)(?:\s*=\s*(?:(")([^"]*)"|(')([^']*)'|([^\s"'>]*)))?/g;
        var regLine = /\r?\n/g;
        var match;
        var matchIndex;
        var lastIndex = 0;
        var tagName;
        var arrAttrs;
        var tagCDATA = null;
        var attrsCDATA;
        var arrCDATA = [];
        var lastCDATAIndex = 0;
        var text;
        var lastLineIndex = 0;
        var line = 1;
        var arrBlocks = this._arrBlocks;
        this.fire('start', {
            pos: 0,
            line: 1,
            col: 1,
        });
        var isMapCdataTagsRequired = function () {
            var attrType = arrAttrs.find(function (attr) { return attr.name === 'type'; }) || {
                value: '',
            };
            return (mapCdataTags[tagName] &&
                attrType.value.indexOf('text/ng-template') === -1);
        };
        var saveBlock = function (type, raw, pos, data) {
            var col = pos - lastLineIndex + 1;
            if (data === undefined) {
                data = {};
            }
            data.raw = raw;
            data.pos = pos;
            data.line = line;
            data.col = col;
            arrBlocks.push(data);
            _this.fire(type, data);
            var lineMatch;
            while ((lineMatch = regLine.exec(raw))) {
                line++;
                lastLineIndex = pos + regLine.lastIndex;
            }
        };
        while ((match = regTag.exec(html))) {
            matchIndex = match.index;
            if (matchIndex > lastIndex) {
                text = html.substring(lastIndex, matchIndex);
                if (tagCDATA) {
                    arrCDATA.push(text);
                }
                else {
                    saveBlock('text', text, lastIndex);
                }
            }
            lastIndex = regTag.lastIndex;
            if ((tagName = match[1])) {
                if (tagCDATA && tagName === tagCDATA) {
                    text = arrCDATA.join('');
                    saveBlock('cdata', text, lastCDATAIndex, {
                        tagName: tagCDATA,
                        attrs: attrsCDATA,
                    });
                    tagCDATA = null;
                    attrsCDATA = undefined;
                    arrCDATA = [];
                }
                if (!tagCDATA) {
                    saveBlock('tagend', match[0], matchIndex, {
                        tagName: tagName,
                    });
                    continue;
                }
            }
            if (tagCDATA) {
                arrCDATA.push(match[0]);
            }
            else {
                if ((tagName = match[4])) {
                    arrAttrs = [];
                    var attrs = match[5];
                    var attrMatch = void 0;
                    var attrMatchCount = 0;
                    while ((attrMatch = regAttr.exec(attrs))) {
                        var name_1 = attrMatch[1];
                        var quote = attrMatch[2]
                            ? attrMatch[2]
                            : attrMatch[4]
                                ? attrMatch[4]
                                : '';
                        var value = attrMatch[3]
                            ? attrMatch[3]
                            : attrMatch[5]
                                ? attrMatch[5]
                                : attrMatch[6]
                                    ? attrMatch[6]
                                    : '';
                        arrAttrs.push({
                            name: name_1,
                            value: value,
                            quote: quote,
                            index: attrMatch.index,
                            raw: attrMatch[0],
                        });
                        attrMatchCount += attrMatch[0].length;
                    }
                    if (attrMatchCount === attrs.length) {
                        saveBlock('tagstart', match[0], matchIndex, {
                            tagName: tagName,
                            attrs: arrAttrs,
                            close: match[6],
                        });
                        if (isMapCdataTagsRequired()) {
                            tagCDATA = tagName;
                            attrsCDATA = arrAttrs.concat();
                            arrCDATA = [];
                            lastCDATAIndex = lastIndex;
                        }
                    }
                    else {
                        saveBlock('text', match[0], matchIndex);
                    }
                }
                else if (match[2] || match[3]) {
                    saveBlock('comment', match[0], matchIndex, {
                        content: match[2] || match[3],
                        long: match[2] ? true : false,
                    });
                }
            }
        }
        if (html.length > lastIndex) {
            text = html.substring(lastIndex, html.length);
            saveBlock('text', text, lastIndex);
        }
        this.fire('end', {
            pos: lastIndex,
            line: line,
            col: html.length - lastLineIndex + 1,
        });
    };
    HTMLParser.prototype.addListener = function (types, listener) {
        var _listeners = this._listeners;
        var arrTypes = types.split(/[,\s]/);
        var type;
        for (var i = 0, l = arrTypes.length; i < l; i++) {
            type = arrTypes[i];
            if (_listeners[type] === undefined) {
                _listeners[type] = [];
            }
            _listeners[type].push(listener);
        }
    };
    HTMLParser.prototype.fire = function (type, data) {
        if (data === undefined) {
            data = {};
        }
        data.type = type;
        var listeners = [];
        var listenersType = this._listeners[type];
        var listenersAll = this._listeners['all'];
        if (listenersType !== undefined) {
            listeners = listeners.concat(listenersType);
        }
        if (listenersAll !== undefined) {
            listeners = listeners.concat(listenersAll);
        }
        var lastEvent = this.lastEvent;
        if (lastEvent !== null) {
            delete lastEvent['lastEvent'];
            data.lastEvent = lastEvent;
        }
        this.lastEvent = data;
        for (var i = 0, l = listeners.length; i < l; i++) {
            listeners[i].call(this, data);
        }
    };
    HTMLParser.prototype.removeListener = function (type, listener) {
        var listenersType = this._listeners[type];
        if (listenersType !== undefined) {
            for (var i = 0, l = listenersType.length; i < l; i++) {
                if (listenersType[i] === listener) {
                    listenersType.splice(i, 1);
                    break;
                }
            }
        }
    };
    HTMLParser.prototype.fixPos = function (event, index) {
        var text = event.raw.substr(0, index);
        var arrLines = text.split(/\r?\n/);
        var lineCount = arrLines.length - 1;
        var line = event.line;
        var col;
        if (lineCount > 0) {
            line += lineCount;
            col = arrLines[lineCount].length + 1;
        }
        else {
            col = event.col + index;
        }
        return {
            line: line,
            col: col,
        };
    };
    HTMLParser.prototype.getMapAttrs = function (arrAttrs) {
        var mapAttrs = {};
        var attr;
        for (var i = 0, l = arrAttrs.length; i < l; i++) {
            attr = arrAttrs[i];
            mapAttrs[attr.name] = attr.value;
        }
        return mapAttrs;
    };
    return HTMLParser;
}());
exports.default = HTMLParser;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHRtbHBhcnNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb3JlL2h0bWxwYXJzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUF3QkE7SUFPRTtRQUNFLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFBO1FBQ3BCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQTtRQUNqRCxJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQTtRQUNwQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQTtJQUN2QixDQUFDO0lBRU0sNEJBQU8sR0FBZCxVQUFlLEdBQVc7UUFHeEIsSUFBTSxHQUFHLEdBQStCLEVBQUUsQ0FBQTtRQUMxQyxJQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBRTVCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3JDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUE7U0FDckI7UUFFRCxPQUFPLEdBQUcsQ0FBQTtJQUNaLENBQUM7SUFFTSwwQkFBSyxHQUFaLFVBQWEsSUFBWTtRQUF6QixpQkFpTEM7UUFoTEMsSUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQTtRQUV2QyxJQUFNLE1BQU0sR0FFViwwSkFBMEosQ0FBQTtRQUM1SixJQUFNLE9BQU8sR0FFWCw2RkFBNkYsQ0FBQTtRQUMvRixJQUFNLE9BQU8sR0FBRyxRQUFRLENBQUE7UUFFeEIsSUFBSSxLQUE2QixDQUFBO1FBQ2pDLElBQUksVUFBa0IsQ0FBQTtRQUN0QixJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUE7UUFDakIsSUFBSSxPQUFlLENBQUE7UUFDbkIsSUFBSSxRQUFnQixDQUFBO1FBQ3BCLElB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