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
        var _a;
        const mapCdataTags = this._mapCdataTags;
        const regTag = /<(?:\/([^\s>]+)\s*|!--(?:-?|([\s\S]*?)--!?)|!([^>]*?)|([\w\-:]+)((?:(?:\s+|(?<=["']))[^\s"'>\/=\x00-\x0F\x7F\x80-\x9F]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'>]+))?)*(?:(?:\s+|(?<=["']))[^\s"'>\/=\x00-\x0F\x7F\x80-\x9F]+\s*=\s*)?)\s*(\/?))>/g;
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
                else if (match[3] === undefined || match[3]) {
                    const isLongComment = match[3] === undefined;
                    saveBlock('comment', match[0], matchIndex, {
                        content: isLongComment ? ((_a = match[2]) !== null && _a !== void 0 ? _a : '') : match[3],
                        long: isLongComment,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHRtbHBhcnNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb3JlL2h0bWxwYXJzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUF3QkEsTUFBcUIsVUFBVTtJQU83QjtRQUNFLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFBO1FBQ3BCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQTtRQUNqRCxJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQTtRQUNwQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQTtJQUN2QixDQUFDO0lBRU0sT0FBTyxDQUFDLEdBQVc7UUFHeEIsTUFBTSxHQUFHLEdBQStCLEVBQUUsQ0FBQTtRQUMxQyxNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBRTVCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDdEMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQTtRQUN0QixDQUFDO1FBRUQsT0FBTyxHQUFHLENBQUE7SUFDWixDQUFDO0lBRU0sS0FBSyxDQUFDLElBQVk7O1FBQ3ZCLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUE7UUFFdkMsTUFBTSxNQUFNLEdBRVYsK09BQStPLENBQUE7UUFDalAsTUFBTSxPQUFPLEdBRVgsNkZBQTZGLENBQUE7UUFDL0YsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFBO1FBRXhCLElBQUksS0FBNkIsQ0FBQTtRQUNqQyxJQUFJLFVBQWtCLENBQUE7UUFDdEIsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFBO1FBQ2pCLElBQUksT0FBZSxDQUFBO1FBQ25CLElBQUksUUFBZ0IsQ0FBQTtRQUNwQixJQUFJ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