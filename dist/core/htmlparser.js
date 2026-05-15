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
    parse(html, filepath = '') {
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
            filepath: filepath,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHRtbHBhcnNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb3JlL2h0bWxwYXJzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUF5QkEsTUFBcUIsVUFBVTtJQU83QjtRQUNFLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFBO1FBQ3BCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQTtRQUNqRCxJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQTtRQUNwQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQTtJQUN2QixDQUFDO0lBRU0sT0FBTyxDQUFDLEdBQVc7UUFHeEIsTUFBTSxHQUFHLEdBQStCLEVBQUUsQ0FBQTtRQUMxQyxNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBRTVCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDdEMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQTtRQUN0QixDQUFDO1FBRUQsT0FBTyxHQUFHLENBQUE7SUFDWixDQUFDO0lBRU0sS0FBSyxDQUFDLElBQVksRUFBRSxXQUFtQixFQUFFO1FBQzlDLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUE7UUFFdkMsTUFBTSxNQUFNLEdBRVYsMEpBQTBKLENBQUE7UUFDNUosTUFBTSxPQUFPLEdBRVgsNkZBQTZGLENBQUE7UUFDL0YsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFBO1FBRXhCLElBQUksS0FBNkIsQ0FBQTtRQUNqQyxJQUFJLFVBQWtCLENBQUE7UUFDdEIsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFBO1FBQ2pCLElBQUksT0FBZSxDQUFBO1FBQ25CLElBQUksUUFBZ0Is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