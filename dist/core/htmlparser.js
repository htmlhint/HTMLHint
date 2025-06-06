"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HTMLParser {
    constructor() {
        this._listeners = {};
        this._mapCdataTags = this.makeMap('script,style');
        this._arrBlocks = [];
        this.lastEvent = null;
    }
    makeMap(str) {
        const obj = {};
        const items = str.split(',');
        for (let i = 0; i < items.length; i++) {
            obj[items[i]] = true;
        }
        return obj;
    }
    parse(html) {
        const mapCdataTags = this._mapCdataTags;
        const regTag = /<(?:\/([^\s>]+)\s*|!--([\s\S]*?)--|!([^>]*?)|([\w\-:]+)((?:\s+[^\s"'>\/=\x00-\x0F\x7F\x80-\x9F]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'>]*))?)*?)\s*(\/?))>/g;
        const regAttr = /\s*([^\s"'>\/=\x00-\x0F\x7F\x80-\x9F]+)(?:\s*=\s*(?:(")([^"]*)"|(')([^']*)'|([^\s"'>]*)))?/g;
        const regLine = /\r?\n/g;
        let match;
        let matchIndex;
        let lastIndex = 0;
        let tagName;
        let arrAttrs;
        let tagCDATA = null;
        let attrsCDATA;
        let arrCDATA = [];
        let lastCDATAIndex = 0;
        let text;
        let lastLineIndex = 0;
        let line = 1;
        const arrBlocks = this._arrBlocks;
        this.fire('start', {
            pos: 0,
            line: 1,
            col: 1,
        });
        const isMapCdataTagsRequired = () => {
            const attrType = arrAttrs.find((attr) => attr.name === 'type') || {
                value: '',
            };
            return (mapCdataTags[tagName] &&
                attrType.value.indexOf('text/ng-template') === -1);
        };
        const saveBlock = (type, raw, pos, data) => {
            const col = pos - lastLineIndex + 1;
            if (data === undefined) {
                data = {};
            }
            data.raw = raw;
            data.pos = pos;
            data.line = line;
            data.col = col;
            arrBlocks.push(data);
            this.fire(type, data);
            while (regLine.exec(raw)) {
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
                    const attrs = match[5];
                    let attrMatch;
                    let attrMatchCount = 0;
                    while ((attrMatch = regAttr.exec(attrs))) {
                        const name = attrMatch[1];
                        const quote = attrMatch[2]
                            ? attrMatch[2]
                            : attrMatch[4]
                                ? attrMatch[4]
                                : '';
                        const value = attrMatch[3]
                            ? attrMatch[3]
                            : attrMatch[5]
                                ? attrMatch[5]
                                : attrMatch[6]
                                    ? attrMatch[6]
                                    : '';
                        arrAttrs.push({
                            name: name,
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
    }
    addListener(types, listener) {
        const _listeners = this._listeners;
        const arrTypes = types.split(/[,\s]/);
        let type;
        for (let i = 0, l = arrTypes.length; i < l; i++) {
            type = arrTypes[i];
            if (_listeners[type] === undefined) {
                _listeners[type] = [];
            }
            _listeners[type].push(listener);
        }
    }
    fire(type, data) {
        if (data === undefined) {
            data = {};
        }
        data.type = type;
        let listeners = [];
        const listenersType = this._listeners[type];
        const listenersAll = this._listeners['all'];
        if (listenersType !== undefined) {
            listeners = listeners.concat(listenersType);
        }
        if (listenersAll !== undefined) {
            listeners = listeners.concat(listenersAll);
        }
        const lastEvent = this.lastEvent;
        if (lastEvent !== null) {
            delete lastEvent['lastEvent'];
            data.lastEvent = lastEvent;
        }
        this.lastEvent = data;
        for (let i = 0, l = listeners.length; i < l; i++) {
            listeners[i].call(this, data);
        }
    }
    removeListener(type, listener) {
        const listenersType = this._listeners[type];
        if (listenersType !== undefined) {
            for (let i = 0, l = listenersType.length; i < l; i++) {
                if (listenersType[i] === listener) {
                    listenersType.splice(i, 1);
                    break;
                }
            }
        }
    }
    fixPos(event, index) {
        const text = event.raw.substr(0, index);
        const arrLines = text.split(/\r?\n/);
        const lineCount = arrLines.length - 1;
        let line = event.line;
        let col;
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
    }
    getMapAttrs(arrAttrs) {
        const mapAttrs = {};
        let attr;
        for (let i = 0, l = arrAttrs.length; i < l; i++) {
            attr = arrAttrs[i];
            mapAttrs[attr.name] = attr.value;
        }
        return mapAttrs;
    }
}
exports.default = HTMLParser;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHRtbHBhcnNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb3JlL2h0bWxwYXJzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUF3QkEsTUFBcUIsVUFBVTtJQU83QjtRQUNFLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFBO1FBQ3BCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQTtRQUNqRCxJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQTtRQUNwQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQTtJQUN2QixDQUFDO0lBRU0sT0FBTyxDQUFDLEdBQVc7UUFHeEIsTUFBTSxHQUFHLEdBQStCLEVBQUUsQ0FBQTtRQUMxQyxNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBRTVCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3JDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUE7U0FDckI7UUFFRCxPQUFPLEdBQUcsQ0FBQTtJQUNaLENBQUM7SUFFTSxLQUFLLENBQUMsSUFBWTtRQUN2QixNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFBO1FBRXZDLE1BQU0sTUFBTSxHQUVWLDBKQUEwSixDQUFBO1FBQzVKLE1BQU0sT0FBTyxHQUVYLDZGQUE2RixDQUFBO1FBQy9GLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQTtRQUV4QixJQUFJLEtBQTZCLENBQUE7UUFDakMsSUFBSSxVQUFrQixDQUFBO1FBQ3RCLElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQTtRQUNqQixJQUFJLE9BQWUsQ0FBQTtRQUNuQixJQUFJLFFBQWdCLENBQUE7UUFDcEIsSUFBSSxRQUFRLEdBQWtC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