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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHRtbHBhcnNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb3JlL2h0bWxwYXJzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUF3QkEsTUFBcUIsVUFBVTtJQU83QjtRQUNFLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFBO1FBQ3BCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQTtRQUNqRCxJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQTtRQUNwQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQTtJQUN2QixDQUFDO0lBRU0sT0FBTyxDQUFDLEdBQVc7UUFHeEIsTUFBTSxHQUFHLEdBQStCLEVBQUUsQ0FBQTtRQUMxQyxNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBRTVCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDdEMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQTtRQUN0QixDQUFDO1FBRUQsT0FBTyxHQUFHLENBQUE7SUFDWixDQUFDO0lBRU0sS0FBSyxDQUFDLElBQVk7UUFDdkIsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQTtRQUV2QyxNQUFNLE1BQU0sR0FFViwwSkFBMEosQ0FBQTtRQUM1SixNQUFNLE9BQU8sR0FFWCw2RkFBNkYsQ0FBQTtRQUMvRixNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUE7UUFFeEIsSUFBSSxLQUE2QixDQUFBO1FBQ2pDLElBQUksVUFBa0IsQ0FBQTtRQUN0QixJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUE7UUFDakIsSUFBSSxPQUFlLENBQUE7UUFDbkIsSUFBSSxRQUFnQixDQUFBO1FBQ3BCLElBQUks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