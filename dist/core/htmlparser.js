"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isSpace = (code) => code === 0x20 ||
    (code >= 0x09 && code <= 0x0d) ||
    code === 0x00a0 ||
    code === 0x1680 ||
    (code >= 0x2000 && code <= 0x200a) ||
    code === 0x2028 ||
    code === 0x2029 ||
    code === 0x202f ||
    code === 0x205f ||
    code === 0x3000 ||
    code === 0xfeff;
const isTagNameChar = (code) => (code >= 0x61 && code <= 0x7a) ||
    (code >= 0x41 && code <= 0x5a) ||
    (code >= 0x30 && code <= 0x39) ||
    code === 0x5f ||
    code === 0x2d ||
    code === 0x3a;
const isAttrNameChar = (code) => !isSpace(code) &&
    code !== 0x22 &&
    code !== 0x27 &&
    code !== 0x3e &&
    code !== 0x2f &&
    code !== 0x3d &&
    code > 0x0f &&
    code !== 0x7f &&
    (code < 0x80 || code > 0x9f);
const isUnquotedAttrValueChar = (code) => !isSpace(code) && code !== 0x22 && code !== 0x27 && code !== 0x3e;
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
        const htmlLen = html.length;
        let lastIndex = 0;
        let tagName = '';
        let arrAttrs = [];
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
            let nlIndex = raw.indexOf('\n');
            while (nlIndex !== -1) {
                line++;
                lastLineIndex = pos + nlIndex + 1;
                nlIndex = raw.indexOf('\n', nlIndex + 1);
            }
        };
        let gtPos = -1;
        const nextGt = (from) => {
            if (gtPos < from) {
                const found = html.indexOf('>', from);
                gtPos = found === -1 ? htmlLen : found;
            }
            return gtPos;
        };
        let endTagP = -1;
        let endTagQ = -1;
        const scanEndTag = (from) => {
            if (endTagP < from) {
                let p = from;
                while (p < htmlLen) {
                    const c = html.charCodeAt(p);
                    if (c === 0x3e || isSpace(c)) {
                        break;
                    }
                    p++;
                }
                let q = p;
                while (q < htmlLen && isSpace(html.charCodeAt(q))) {
                    q++;
                }
                endTagP = p;
                endTagQ = q;
            }
            if (endTagP > from &&
                endTagQ < htmlLen &&
                html.charCodeAt(endTagQ) === 0x3e) {
                return endTagQ + 1;
            }
            return -1;
        };
        let commentCloseK = -1;
        let commentCloseEnd = htmlLen;
        const findCommentClose = (from) => {
            if (commentCloseK < from) {
                let k = from;
                while (true) {
                    const dash = html.indexOf('--', k);
                    if (dash === -1 || dash + 2 >= htmlLen) {
                        commentCloseK = htmlLen;
                        commentCloseEnd = htmlLen;
                        break;
                    }
                    const c2 = html.charCodeAt(dash + 2);
                    if (c2 === 0x3e) {
                        commentCloseK = dash;
                        commentCloseEnd = dash + 3;
                        break;
                    }
                    if (c2 === 0x21 &&
                        dash + 3 < htmlLen &&
                        html.charCodeAt(dash + 3) === 0x3e) {
                        commentCloseK = dash;
                        commentCloseEnd = dash + 4;
                        break;
                    }
                    k = dash + 1;
                }
            }
            return commentCloseK;
        };
        let failedStates = null;
        let noDoubleQuoteFrom = htmlLen + 1;
        let noSingleQuoteFrom = htmlLen + 1;
        const dfsStack = [];
        let spanAttrsEnd = 0;
        let spanClose = '';
        const markFailedState = (state) => {
            if (failedStates === null) {
                failedStates = new Uint8Array(Math.ceil((htmlLen * 3 + 3) / 8));
            }
            failedStates[state >>> 3] |= 1 << (state & 7);
        };
        const findStartTagSpan = (tagNameEnd) => {
            dfsStack.length = 0;
            dfsStack.push(tagNameEnd * 3);
            while (dfsStack.length > 0) {
                const item = dfsStack.pop();
                if (item < 0) {
                    markFailedState(~item);
                    continue;
                }
                if (failedStates !== null &&
                    (failedStates[item >>> 3] & (1 << (item & 7))) !== 0) {
                    continue;
                }
                const role = item % 3;
                const cursor = (item - role) / 3;
                let wsEnd = cursor;
                if (role !== 2) {
                    while (wsEnd < htmlLen && isSpace(html.charCodeAt(wsEnd))) {
                        wsEnd++;
                    }
                    if (wsEnd >= htmlLen) {
                        markFailedState(item);
                        continue;
                    }
                    const ch = html.charCodeAt(wsEnd);
                    if (ch === 0x3e) {
                        spanAttrsEnd = cursor;
                        spanClose = '';
                        return wsEnd + 1;
                    }
                    if (ch === 0x2f &&
                        wsEnd + 1 < htmlLen &&
                        html.charCodeAt(wsEnd + 1) === 0x3e) {
                        spanAttrsEnd = cursor;
                        spanClose = '/';
                        return wsEnd + 2;
                    }
                    const hasSep = wsEnd > cursor || role === 1;
                    if (!hasSep || !isAttrNameChar(ch)) {
                        markFailedState(item);
                        continue;
                    }
                }
                let nameEnd = wsEnd + 1;
                while (nameEnd < htmlLen && isAttrNameChar(html.charCodeAt(nameEnd))) {
                    nameEnd++;
                }
                let eqPos = nameEnd;
                while (eqPos < htmlLen && isSpace(html.charCodeAt(eqPos))) {
                    eqPos++;
                }
                if (eqPos >= htmlLen || html.charCodeAt(eqPos) !== 0x3d) {
                    dfsStack.push(~item);
                    dfsStack.push(nameEnd * 3);
                    continue;
                }
                let valStart = eqPos + 1;
                while (valStart < htmlLen && isSpace(html.charCodeAt(valStart))) {
                    valStart++;
                }
                if (valStart >= htmlLen) {
                    markFailedState(item);
                    continue;
                }
                const vch = html.charCodeAt(valStart);
                if (vch === 0x3e) {
                    spanAttrsEnd = valStart;
                    spanClose = '';
                    return valStart + 1;
                }
                if (vch === 0x22) {
                    if (valStart + 1 >= noDoubleQuoteFrom) {
                        markFailedState(item);
                        continue;
                    }
                    const closeQuote = html.indexOf('"', valStart + 1);
                    if (closeQuote === -1) {
                        noDoubleQuoteFrom = valStart + 1;
                        markFailedState(item);
                        continue;
                    }
                    dfsStack.push(~item);
                    dfsStack.push((closeQuote + 1) * 3 + 1);
                    continue;
                }
                if (vch === 0x27) {
                    if (valStart + 1 >= noSingleQuoteFrom) {
                        markFailedState(item);
                        continue;
                    }
                    const closeQuote = html.indexOf("'", valStart + 1);
                    if (closeQuote === -1) {
                        noSingleQuoteFrom = valStart + 1;
                        markFailedState(item);
                        continue;
                    }
                    dfsStack.push(~item);
                    dfsStack.push((closeQuote + 1) * 3 + 1);
                    continue;
                }
                let valEnd = valStart + 1;
                while (valEnd < htmlLen &&
                    isUnquotedAttrValueChar(html.charCodeAt(valEnd))) {
                    valEnd++;
                }
                dfsStack.push(~item);
                if (valStart > eqPos + 1 && isAttrNameChar(vch)) {
                    dfsStack.push(valStart * 3 + 2);
                }
                dfsStack.push(valEnd * 3);
            }
            return -1;
        };
        const parseAttrs = (tagNameEnd, attrsEnd) => {
            arrAttrs = [];
            let cursor = tagNameEnd;
            while (cursor < attrsEnd) {
                let wsEnd = cursor;
                while (wsEnd < attrsEnd && isSpace(html.charCodeAt(wsEnd))) {
                    wsEnd++;
                }
                if (wsEnd >= attrsEnd || !isAttrNameChar(html.charCodeAt(wsEnd))) {
                    return false;
                }
                let nameEnd = wsEnd + 1;
                while (nameEnd < attrsEnd && isAttrNameChar(html.charCodeAt(nameEnd))) {
                    nameEnd++;
                }
                const attrName = html.slice(wsEnd, nameEnd);
                let eqPos = nameEnd;
                while (eqPos < attrsEnd && isSpace(html.charCodeAt(eqPos))) {
                    eqPos++;
                }
                if (eqPos >= attrsEnd || html.charCodeAt(eqPos) !== 0x3d) {
                    arrAttrs.push({
                        name: attrName,
                        value: '',
                        quote: '',
                        index: cursor - tagNameEnd,
                        raw: html.slice(cursor, nameEnd),
                    });
                    cursor = nameEnd;
                    continue;
                }
                let valStart = eqPos + 1;
                while (valStart < attrsEnd && isSpace(html.charCodeAt(valStart))) {
                    valStart++;
                }
                if (valStart < attrsEnd && html.charCodeAt(valStart) === 0x22) {
                    const closeQuote = html.indexOf('"', valStart + 1);
                    if (closeQuote === -1 || closeQuote >= attrsEnd) {
                        return false;
                    }
                    arrAttrs.push({
                        name: attrName,
                        value: html.slice(valStart + 1, closeQuote),
                        quote: '"',
                        index: cursor - tagNameEnd,
                        raw: html.slice(cursor, closeQuote + 1),
                    });
                    cursor = closeQuote + 1;
                    continue;
                }
                if (valStart < attrsEnd && html.charCodeAt(valStart) === 0x27) {
                    const closeQuote = html.indexOf("'", valStart + 1);
                    if (closeQuote === -1 || closeQuote >= attrsEnd) {
                        return false;
                    }
                    arrAttrs.push({
                        name: attrName,
                        value: html.slice(valStart + 1, closeQuote),
                        quote: "'",
                        index: cursor - tagNameEnd,
                        raw: html.slice(cursor, closeQuote + 1),
                    });
                    cursor = closeQuote + 1;
                    continue;
                }
                let valEnd = valStart;
                while (valEnd < attrsEnd &&
                    isUnquotedAttrValueChar(html.charCodeAt(valEnd))) {
                    valEnd++;
                }
                arrAttrs.push({
                    name: attrName,
                    value: html.slice(valStart, valEnd),
                    quote: '',
                    index: cursor - tagNameEnd,
                    raw: html.slice(cursor, valEnd),
                });
                cursor = valEnd;
            }
            return true;
        };
        let searchIndex = 0;
        while (searchIndex < htmlLen) {
            const matchIndex = html.indexOf('<', searchIndex);
            if (matchIndex === -1 || matchIndex + 1 >= htmlLen) {
                break;
            }
            if (nextGt(matchIndex + 1) === htmlLen) {
                break;
            }
            const nextCode = html.charCodeAt(matchIndex + 1);
            let matchEnd = -1;
            let matchedKind = null;
            let commentContent = '';
            let isLongComment = false;
            let startTagNameEnd = 0;
            if (nextCode === 0x2f) {
                const endPos = scanEndTag(matchIndex + 2);
                if (endPos !== -1) {
                    tagName = html.slice(matchIndex + 2, endTagP);
                    matchEnd = endPos;
                    matchedKind = 'end';
                }
            }
            else if (nextCode === 0x21) {
                if (matchIndex + 3 < htmlLen &&
                    html.charCodeAt(matchIndex + 2) === 0x2d &&
                    html.charCodeAt(matchIndex + 3) === 0x2d) {
                    const afterOpen = matchIndex + 4;
                    if (afterOpen < htmlLen && html.charCodeAt(afterOpen) === 0x3e) {
                        matchEnd = afterOpen + 1;
                        commentContent = '';
                        isLongComment = true;
                        matchedKind = 'comment';
                    }
                    else if (afterOpen + 1 < htmlLen &&
                        html.charCodeAt(afterOpen) === 0x2d &&
                        html.charCodeAt(afterOpen + 1) === 0x3e) {
                        matchEnd = afterOpen + 2;
                        commentContent = '';
                        isLongComment = true;
                        matchedKind = 'comment';
                    }
                    else {
                        const closeK = findCommentClose(afterOpen);
                        if (closeK < htmlLen) {
                            matchEnd = commentCloseEnd;
                            commentContent = html.slice(afterOpen, closeK);
                            isLongComment = true;
                            matchedKind = 'comment';
                        }
                    }
                }
                if (matchedKind === null) {
                    const closeGt = nextGt(matchIndex + 2);
                    if (closeGt < htmlLen) {
                        matchEnd = closeGt + 1;
                        commentContent = html.slice(matchIndex + 2, closeGt);
                        isLongComment = false;
                        matchedKind = 'comment';
                    }
                }
            }
            else if (isTagNameChar(nextCode)) {
                let tagNameEnd = matchIndex + 2;
                while (tagNameEnd < htmlLen &&
                    isTagNameChar(html.charCodeAt(tagNameEnd))) {
                    tagNameEnd++;
                }
                const endPos = findStartTagSpan(tagNameEnd);
                if (endPos !== -1) {
                    tagName = html.slice(matchIndex + 1, tagNameEnd);
                    startTagNameEnd = tagNameEnd;
                    matchEnd = endPos;
                    matchedKind = 'start';
                }
            }
            if (matchedKind === null) {
                searchIndex = matchIndex + 1;
                continue;
            }
            const rawMatch = html.slice(matchIndex, matchEnd);
            if (matchIndex > lastIndex) {
                text = html.substring(lastIndex, matchIndex);
                if (tagCDATA) {
                    arrCDATA.push(text);
                }
                else {
                    saveBlock('text', text, lastIndex);
                }
            }
            lastIndex = matchEnd;
            searchIndex = matchEnd;
            if (matchedKind === 'end') {
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
                    saveBlock('tagend', rawMatch, matchIndex, {
                        tagName: tagName,
                    });
                    continue;
                }
            }
            if (tagCDATA) {
                arrCDATA.push(rawMatch);
            }
            else if (matchedKind === 'start') {
                if (parseAttrs(startTagNameEnd, spanAttrsEnd)) {
                    saveBlock('tagstart', rawMatch, matchIndex, {
                        tagName: tagName,
                        attrs: arrAttrs,
                        close: spanClose,
                    });
                    if (isMapCdataTagsRequired()) {
                        tagCDATA = tagName;
                        attrsCDATA = arrAttrs.concat();
                        arrCDATA = [];
                        lastCDATAIndex = lastIndex;
                    }
                }
                else {
                    saveBlock('text', rawMatch, matchIndex);
                }
            }
            else if (isLongComment || commentContent) {
                saveBlock('comment', rawMatch, matchIndex, {
                    content: commentContent,
                    long: isLongComment,
                });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHRtbHBhcnNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb3JlL2h0bWxwYXJzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUF3QkEsTUFBTSxPQUFPLEdBQUcsQ0FBQyxJQUFZLEVBQVcsRUFBRSxDQUN4QyxJQUFJLEtBQUssSUFBSTtJQUNiLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDO0lBQzlCLElBQUksS0FBSyxNQUFNO0lBQ2YsSUFBSSxLQUFLLE1BQU07SUFDZixDQUFDLElBQUksSUFBSSxNQUFNLElBQUksSUFBSSxJQUFJLE1BQU0sQ0FBQztJQUNsQyxJQUFJLEtBQUssTUFBTTtJQUNmLElBQUksS0FBSyxNQUFNO0lBQ2YsSUFBSSxLQUFLLE1BQU07SUFDZixJQUFJLEtBQUssTUFBTTtJQUNmLElBQUksS0FBSyxNQUFNO0lBQ2YsSUFBSSxLQUFLLE1BQU0sQ0FBQTtBQUVqQixNQUFNLGFBQWEsR0FBRyxDQUFDLElBQVksRUFBVyxFQUFFLENBQzlDLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDO0lBQzlCLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDO0lBQzlCLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDO0lBQzlCLElBQUksS0FBSyxJQUFJO0lBQ2IsSUFBSSxLQUFLLElBQUk7SUFDYixJQUFJLEtBQUssSUFBSSxDQUFBO0FBRWYsTUFBTSxjQUFjLEdBQUcsQ0FBQyxJQUFZLEVBQVcsRUFBRSxDQUMvQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7SUFDZCxJQUFJLEtBQUssSUFBSTtJQUNiLElBQUksS0FBSyxJQUFJO0lBQ2IsSUFBSSxLQUFLLElBQUk7SUFDYixJQUFJLEtBQUssSUFBSTtJQUNiLElBQUksS0FBSyxJQUFJO0lBQ2IsSUFBSSxHQUFHLElBQUk7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