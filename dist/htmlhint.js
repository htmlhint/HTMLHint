(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.HTMLHint = factory());
})(this, (function () { 'use strict';

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	var core$1 = {};

	var htmlparser = {};

	Object.defineProperty(htmlparser, "__esModule", { value: true });
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
	htmlparser.default = HTMLParser;

	var reporter = {};

	Object.defineProperty(reporter, "__esModule", { value: true });
	class Reporter {
	    constructor(html, ruleset) {
	        this.html = html;
	        this.lines = html.split(/\r?\n/);
	        const match = /\r?\n/.exec(html);
	        this.brLen = match !== null ? match[0].length : 0;
	        this.ruleset = ruleset;
	        this.messages = [];
	    }
	    info(message, line, col, rule, raw) {
	        this.report("info", message, line, col, rule, raw);
	    }
	    warn(message, line, col, rule, raw) {
	        this.report("warning", message, line, col, rule, raw);
	    }
	    error(message, line, col, rule, raw) {
	        this.report("error", message, line, col, rule, raw);
	    }
	    report(type, message, line, col, rule, raw) {
	        const lines = this.lines;
	        const brLen = this.brLen;
	        let evidence = '';
	        let evidenceLen = 0;
	        for (let i = line - 1, lineCount = lines.length; i < lineCount; i++) {
	            evidence = lines[i];
	            evidenceLen = evidence.length;
	            if (col > evidenceLen && line < lineCount) {
	                line++;
	                col -= evidenceLen;
	                if (col !== 1) {
	                    col -= brLen;
	                }
	            }
	            else {
	                break;
	            }
	        }
	        this.messages.push({
	            type: type,
	            message: message,
	            raw: raw,
	            evidence: evidence,
	            line: line,
	            col: col,
	            rule: {
	                id: rule.id,
	                description: rule.description,
	                link: `https://htmlhint.com/docs/user-guide/rules/${rule.id}`,
	            },
	        });
	    }
	}
	reporter.default = Reporter;

	var rules = {};

	var altRequire = {};

	Object.defineProperty(altRequire, "__esModule", { value: true });
	altRequire.default = {
	    id: 'alt-require',
	    description: 'The alt attribute of an <img> element must be present and alt attribute of area[href] and input[type=image] must have a value.',
	    init(parser, reporter) {
	        parser.addListener('tagstart', (event) => {
	            const tagName = event.tagName.toLowerCase();
	            const mapAttrs = parser.getMapAttrs(event.attrs);
	            const col = event.col + tagName.length + 1;
	            let selector;
	            if (tagName === 'img' && !('alt' in mapAttrs)) {
	                reporter.warn('An alt attribute must be present on <img> elements.', event.line, col, this, event.raw);
	            }
	            else if ((tagName === 'area' && 'href' in mapAttrs) ||
	                (tagName === 'input' && mapAttrs['type'] === 'image')) {
	                if (!('alt' in mapAttrs) || mapAttrs['alt'] === '') {
	                    selector = tagName === 'area' ? 'area[href]' : 'input[type=image]';
	                    reporter.warn(`The alt attribute of ${selector} must have a value.`, event.line, col, this, event.raw);
	                }
	            }
	        });
	    },
	};

	var attrLowercase = {};

	Object.defineProperty(attrLowercase, "__esModule", { value: true });
	const svgIgnores = [
	    'allowReorder',
	    'attributeName',
	    'attributeType',
	    'autoReverse',
	    'baseFrequency',
	    'baseProfile',
	    'calcMode',
	    'clipPath',
	    'clipPathUnits',
	    'contentScriptType',
	    'contentStyleType',
	    'diffuseConstant',
	    'edgeMode',
	    'externalResourcesRequired',
	    'filterRes',
	    'filterUnits',
	    'glyphRef',
	    'gradientTransform',
	    'gradientUnits',
	    'kernelMatrix',
	    'kernelUnitLength',
	    'keyPoints',
	    'keySplines',
	    'keyTimes',
	    'lengthAdjust',
	    'limitingConeAngle',
	    'markerHeight',
	    'markerUnits',
	    'markerWidth',
	    'maskContentUnits',
	    'maskUnits',
	    'numOctaves',
	    'onBlur',
	    'onChange',
	    'onClick',
	    'onFocus',
	    'onKeyUp',
	    'onLoad',
	    'pathLength',
	    'patternContentUnits',
	    'patternTransform',
	    'patternUnits',
	    'pointsAtX',
	    'pointsAtY',
	    'pointsAtZ',
	    'preserveAlpha',
	    'preserveAspectRatio',
	    'primitiveUnits',
	    'refX',
	    'refY',
	    'repeatCount',
	    'repeatDur',
	    'requiredExtensions',
	    'requiredFeatures',
	    'specularConstant',
	    'specularExponent',
	    'spreadMethod',
	    'startOffset',
	    'stdDeviation',
	    'stitchTiles',
	    'surfaceScale',
	    'systemLanguage',
	    'tableValues',
	    'targetX',
	    'targetY',
	    'textLength',
	    'viewBox',
	    'viewTarget',
	    'xChannelSelector',
	    'yChannelSelector',
	    'zoomAndPan',
	];
	function testAgainstStringOrRegExp(value, comparison) {
	    if (comparison instanceof RegExp) {
	        return comparison.test(value)
	            ? { match: value, pattern: comparison }
	            : false;
	    }
	    const firstComparisonChar = comparison[0];
	    const lastComparisonChar = comparison[comparison.length - 1];
	    const secondToLastComparisonChar = comparison[comparison.length - 2];
	    const comparisonIsRegex = firstComparisonChar === '/' &&
	        (lastComparisonChar === '/' ||
	            (secondToLastComparisonChar === '/' && lastComparisonChar === 'i'));
	    const hasCaseInsensitiveFlag = comparisonIsRegex && lastComparisonChar === 'i';
	    if (comparisonIsRegex) {
	        const valueMatches = hasCaseInsensitiveFlag
	            ? new RegExp(comparison.slice(1, -2), 'i').test(value)
	            : new RegExp(comparison.slice(1, -1)).test(value);
	        return valueMatches;
	    }
	    return value === comparison;
	}
	attrLowercase.default = {
	    id: 'attr-lowercase',
	    description: 'All attribute names must be in lowercase.',
	    init(parser, reporter, options) {
	        const exceptions = (Array.isArray(options) ? options : []).concat(svgIgnores);
	        parser.addListener('tagstart', (event) => {
	            const attrs = event.attrs;
	            let attr;
	            const col = event.col + event.tagName.length + 1;
	            for (let i = 0, l = attrs.length; i < l; i++) {
	                attr = attrs[i];
	                const attrName = attr.name;
	                if (!exceptions.find((exp) => testAgainstStringOrRegExp(attrName, exp)) &&
	                    attrName !== attrName.toLowerCase()) {
	                    reporter.error(`The attribute name of [ ${attrName} ] must be in lowercase.`, event.line, col + attr.index, this, attr.raw);
	                }
	            }
	        });
	    },
	};

	var attrSorted = {};

	Object.defineProperty(attrSorted, "__esModule", { value: true });
	attrSorted.default = {
	    id: 'attr-sorted',
	    description: 'Attribute tags must be in proper order.',
	    init(parser, reporter) {
	        const orderMap = {};
	        const sortOrder = [
	            'class',
	            'id',
	            'name',
	            'src',
	            'for',
	            'type',
	            'href',
	            'value',
	            'title',
	            'alt',
	            'role',
	        ];
	        for (let i = 0; i < sortOrder.length; i++) {
	            orderMap[sortOrder[i]] = i;
	        }
	        parser.addListener('tagstart', (event) => {
	            const attrs = event.attrs;
	            const listOfAttributes = [];
	            for (let i = 0; i < attrs.length; i++) {
	                listOfAttributes.push(attrs[i].name);
	            }
	            const originalAttrs = JSON.stringify(listOfAttributes);
	            listOfAttributes.sort((a, b) => {
	                if (orderMap[a] == undefined && orderMap[b] == undefined) {
	                    return 0;
	                }
	                if (orderMap[a] == undefined) {
	                    return 1;
	                }
	                else if (orderMap[b] == undefined) {
	                    return -1;
	                }
	                return orderMap[a] - orderMap[b] || a.localeCompare(b);
	            });
	            if (originalAttrs !== JSON.stringify(listOfAttributes)) {
	                reporter.error(`Inaccurate order ${originalAttrs} should be in hierarchy ${JSON.stringify(listOfAttributes)} `, event.line, event.col, this, event.raw);
	            }
	        });
	    },
	};

	var attrNoDuplication = {};

	Object.defineProperty(attrNoDuplication, "__esModule", { value: true });
	attrNoDuplication.default = {
	    id: 'attr-no-duplication',
	    description: 'Elements cannot have duplicate attributes.',
	    init(parser, reporter) {
	        parser.addListener('tagstart', (event) => {
	            const attrs = event.attrs;
	            let attr;
	            let attrName;
	            const col = event.col + event.tagName.length + 1;
	            const mapAttrName = {};
	            for (let i = 0, l = attrs.length; i < l; i++) {
	                attr = attrs[i];
	                attrName = attr.name;
	                if (mapAttrName[attrName] === true) {
	                    reporter.error(`Duplicate of attribute name [ ${attr.name} ] was found.`, event.line, col + attr.index, this, attr.raw);
	                }
	                mapAttrName[attrName] = true;
	            }
	        });
	    },
	};

	var attrUnsafeChars = {};

	Object.defineProperty(attrUnsafeChars, "__esModule", { value: true });
	attrUnsafeChars.default = {
	    id: 'attr-unsafe-chars',
	    description: 'Attribute values cannot contain unsafe chars.',
	    init(parser, reporter) {
	        parser.addListener('tagstart', (event) => {
	            const attrs = event.attrs;
	            let attr;
	            const col = event.col + event.tagName.length + 1;
	            const regUnsafe = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/;
	            let match;
	            for (let i = 0, l = attrs.length; i < l; i++) {
	                attr = attrs[i];
	                match = regUnsafe.exec(attr.value);
	                if (match !== null) {
	                    const unsafeCode = escape(match[0])
	                        .replace(/%u/, '\\u')
	                        .replace(/%/, '\\x');
	                    reporter.warn(`The value of attribute [ ${attr.name} ] cannot contain an unsafe char [ ${unsafeCode} ].`, event.line, col + attr.index, this, attr.raw);
	                }
	            }
	        });
	    },
	};

	var attrValueDoubleQuotes = {};

	Object.defineProperty(attrValueDoubleQuotes, "__esModule", { value: true });
	attrValueDoubleQuotes.default = {
	    id: 'attr-value-double-quotes',
	    description: 'Attribute values must be in double quotes.',
	    init(parser, reporter) {
	        parser.addListener('tagstart', (event) => {
	            const attrs = event.attrs;
	            let attr;
	            const col = event.col + event.tagName.length + 1;
	            for (let i = 0, l = attrs.length; i < l; i++) {
	                attr = attrs[i];
	                if ((attr.value !== '' && attr.quote !== '"') ||
	                    (attr.value === '' && attr.quote === "'")) {
	                    reporter.error(`The value of attribute [ ${attr.name} ] must be in double quotes.`, event.line, col + attr.index, this, attr.raw);
	                }
	            }
	        });
	    },
	};

	var attrValueNotEmpty = {};

	Object.defineProperty(attrValueNotEmpty, "__esModule", { value: true });
	attrValueNotEmpty.default = {
	    id: 'attr-value-not-empty',
	    description: 'All attributes must have values.',
	    init(parser, reporter) {
	        parser.addListener('tagstart', (event) => {
	            const attrs = event.attrs;
	            let attr;
	            const col = event.col + event.tagName.length + 1;
	            for (let i = 0, l = attrs.length; i < l; i++) {
	                attr = attrs[i];
	                if (attr.quote === '' && attr.value === '') {
	                    reporter.warn(`The attribute [ ${attr.name} ] must have a value.`, event.line, col + attr.index, this, attr.raw);
	                }
	            }
	        });
	    },
	};

	var attrValueSingleQuotes = {};

	Object.defineProperty(attrValueSingleQuotes, "__esModule", { value: true });
	attrValueSingleQuotes.default = {
	    id: 'attr-value-single-quotes',
	    description: 'Attribute values must be in single quotes.',
	    init(parser, reporter) {
	        parser.addListener('tagstart', (event) => {
	            const attrs = event.attrs;
	            let attr;
	            const col = event.col + event.tagName.length + 1;
	            for (let i = 0, l = attrs.length; i < l; i++) {
	                attr = attrs[i];
	                if ((attr.value !== '' && attr.quote !== "'") ||
	                    (attr.value === '' && attr.quote === '"')) {
	                    reporter.error(`The value of attribute [ ${attr.name} ] must be in single quotes.`, event.line, col + attr.index, this, attr.raw);
	                }
	            }
	        });
	    },
	};

	var attrWhitespace = {};

	Object.defineProperty(attrWhitespace, "__esModule", { value: true });
	attrWhitespace.default = {
	    id: 'attr-whitespace',
	    description: 'All attributes should be separated by only one space and not have leading/trailing whitespace.',
	    init(parser, reporter, options) {
	        const exceptions = Array.isArray(options)
	            ? options
	            : [];
	        parser.addListener('tagstart', (event) => {
	            const attrs = event.attrs;
	            let attr;
	            const col = event.col + event.tagName.length + 1;
	            attrs.forEach((elem) => {
	                attr = elem;
	                const attrName = elem.name;
	                if (exceptions.indexOf(attrName) !== -1) {
	                    return;
	                }
	                if (elem.value.trim() !== elem.value) {
	                    reporter.error(`The attributes of [ ${attrName} ] must not have leading or trailing whitespace.`, event.line, col + attr.index, this, attr.raw);
	                }
	                if (elem.value.replace(/ +(?= )/g, '') !== elem.value) {
	                    reporter.error(`The attributes of [ ${attrName} ] must be separated by only one space.`, event.line, col + attr.index, this, attr.raw);
	                }
	            });
	        });
	    },
	};

	var doctypeFirst = {};

	Object.defineProperty(doctypeFirst, "__esModule", { value: true });
	doctypeFirst.default = {
	    id: 'doctype-first',
	    description: 'Doctype must be declared first.',
	    init(parser, reporter) {
	        const allEvent = (event) => {
	            if (event.type === 'start' ||
	                (event.type === 'text' && /^\s*$/.test(event.raw))) {
	                return;
	            }
	            if ((event.type !== 'comment' && event.long === false) ||
	                /^DOCTYPE\s+/i.test(event.content) === false) {
	                reporter.error('Doctype must be declared first.', event.line, event.col, this, event.raw);
	            }
	            parser.removeListener('all', allEvent);
	        };
	        parser.addListener('all', allEvent);
	    },
	};

	var doctypeHtml5 = {};

	Object.defineProperty(doctypeHtml5, "__esModule", { value: true });
	doctypeHtml5.default = {
	    id: 'doctype-html5',
	    description: 'Invalid doctype. Use: "<!DOCTYPE html>"',
	    init(parser, reporter) {
	        const onComment = (event) => {
	            if (event.long === false &&
	                event.content.toLowerCase() !== 'doctype html') {
	                reporter.warn('Invalid doctype. Use: "<!DOCTYPE html>"', event.line, event.col, this, event.raw);
	            }
	        };
	        const onTagStart = () => {
	            parser.removeListener('comment', onComment);
	            parser.removeListener('tagstart', onTagStart);
	        };
	        parser.addListener('all', onComment);
	        parser.addListener('tagstart', onTagStart);
	    },
	};

	var headScriptDisabled = {};

	Object.defineProperty(headScriptDisabled, "__esModule", { value: true });
	headScriptDisabled.default = {
	    id: 'head-script-disabled',
	    description: 'The <script> tag cannot be used in a <head> tag.',
	    init(parser, reporter) {
	        const reScript = /^(text\/javascript|application\/javascript)$/i;
	        let isInHead = false;
	        const onTagStart = (event) => {
	            const mapAttrs = parser.getMapAttrs(event.attrs);
	            const type = mapAttrs.type;
	            const tagName = event.tagName.toLowerCase();
	            if (tagName === 'head') {
	                isInHead = true;
	            }
	            if (isInHead === true &&
	                tagName === 'script' &&
	                (!type || reScript.test(type) === true)) {
	                reporter.warn('The <script> tag cannot be used in a <head> tag.', event.line, event.col, this, event.raw);
	            }
	        };
	        const onTagEnd = (event) => {
	            if (event.tagName.toLowerCase() === 'head') {
	                parser.removeListener('tagstart', onTagStart);
	                parser.removeListener('tagend', onTagEnd);
	            }
	        };
	        parser.addListener('tagstart', onTagStart);
	        parser.addListener('tagend', onTagEnd);
	    },
	};

	var hrefAbsOrRel = {};

	Object.defineProperty(hrefAbsOrRel, "__esModule", { value: true });
	hrefAbsOrRel.default = {
	    id: 'href-abs-or-rel',
	    description: 'An href attribute must be either absolute or relative.',
	    init(parser, reporter, options) {
	        const hrefMode = options === 'abs' ? 'absolute' : 'relative';
	        parser.addListener('tagstart', (event) => {
	            const attrs = event.attrs;
	            let attr;
	            const col = event.col + event.tagName.length + 1;
	            for (let i = 0, l = attrs.length; i < l; i++) {
	                attr = attrs[i];
	                if (attr.name === 'href') {
	                    if ((hrefMode === 'absolute' && /^\w+?:/.test(attr.value) === false) ||
	                        (hrefMode === 'relative' &&
	                            /^https?:\/\//.test(attr.value) === true)) {
	                        reporter.warn(`The value of the href attribute [ ${attr.value} ] must be ${hrefMode}.`, event.line, col + attr.index, this, attr.raw);
	                    }
	                    break;
	                }
	            }
	        });
	    },
	};

	var htmlLangRequire = {};

	Object.defineProperty(htmlLangRequire, "__esModule", { value: true });
	const regular = '(art-lojban|cel-gaulish|no-bok|no-nyn|zh-guoyu|zh-hakka|zh-min|zh-min-nan|zh-xiang)';
	const irregular = '(en-GB-oed|i-ami|i-bnn|i-default|i-enochian|i-hak|i-klingon|i-lux|i-mingo|i-navajo|i-pwn|i-tao|i-tay|i-tsu|sgn-BE-FR|sgn-BE-NL|sgn-CH-DE)';
	const grandfathered = `(?<grandfathered>${irregular}|${regular})`;
	const privateUse = '(?<privateUse>x(-[A-Za-z0-9]{1,8})+)';
	const privateUse2 = '(?<privateUse2>x(-[A-Za-z0-9]{1,8})+)';
	const singleton = '[0-9A-WY-Za-wy-z]';
	const extension = `(?<extension>${singleton}(-[A-Za-z0-9]{2,8})+)`;
	const variant = '(?<variant>[A-Za-z0-9]{5,8}|[0-9][A-Za-z0-9]{3})';
	const region = '(?<region>[A-Za-z]{2}|[0-9]{3})';
	const script = '(?<script>[A-Za-z]{4})';
	const extlang = '(?<extlang>[A-Za-z]{3}(-[A-Za-z]{3}){0,2})';
	const language = `(?<language>([A-Za-z]{2,3}(-${extlang})?)|[A-Za-z]{4}|[A-Za-z]{5,8})`;
	const langtag = `(${language}(-${script})?` +
	    `(-${region})?` +
	    `(-${variant})*` +
	    `(-${extension})*` +
	    `(-${privateUse})?` +
	    ')';
	const languageTag = `(${grandfathered}|${langtag}|${privateUse2})`;
	htmlLangRequire.default = {
	    id: 'html-lang-require',
	    description: 'The lang attribute of an <html> element must be present and should be valid.',
	    init(parser, reporter) {
	        parser.addListener('tagstart', (event) => {
	            const tagName = event.tagName.toLowerCase();
	            const mapAttrs = parser.getMapAttrs(event.attrs);
	            const col = event.col + tagName.length + 1;
	            const langValidityPattern = new RegExp(languageTag, 'g');
	            if (tagName === 'html') {
	                if ('lang' in mapAttrs) {
	                    if (!mapAttrs['lang']) {
	                        reporter.warn('The lang attribute of <html> element must have a value.', event.line, col, this, event.raw);
	                    }
	                    else if (!langValidityPattern.test(mapAttrs['lang'])) {
	                        reporter.warn('The lang attribute value of <html> element must be a valid BCP47.', event.line, col, this, event.raw);
	                    }
	                }
	                else {
	                    reporter.warn('An lang attribute must be present on <html> elements.', event.line, col, this, event.raw);
	                }
	            }
	        });
	    },
	};

	var idClassAdDisabled = {};

	Object.defineProperty(idClassAdDisabled, "__esModule", { value: true });
	idClassAdDisabled.default = {
	    id: 'id-class-ad-disabled',
	    description: 'The id and class attributes cannot use the ad keyword, it will be blocked by adblock software.',
	    init(parser, reporter) {
	        parser.addListener('tagstart', (event) => {
	            const attrs = event.attrs;
	            let attr;
	            let attrName;
	            const col = event.col + event.tagName.length + 1;
	            for (let i = 0, l = attrs.length; i < l; i++) {
	                attr = attrs[i];
	                attrName = attr.name;
	                if (/^(id|class)$/i.test(attrName)) {
	                    if (/(^|[-_])ad([-_]|$)/i.test(attr.value)) {
	                        reporter.warn(`The value of attribute ${attrName} cannot use the ad keyword.`, event.line, col + attr.index, this, attr.raw);
	                    }
	                }
	            }
	        });
	    },
	};

	var idClassValue = {};

	Object.defineProperty(idClassValue, "__esModule", { value: true });
	idClassValue.default = {
	    id: 'id-class-value',
	    description: 'The id and class attribute values must meet the specified rules.',
	    init(parser, reporter, options) {
	        const arrRules = {
	            underline: {
	                regId: /^[a-z\d]+(_[a-z\d]+)*$/,
	                message: 'The id and class attribute values must be in lowercase and split by an underscore.',
	            },
	            dash: {
	                regId: /^[a-z\d]+(-[a-z\d]+)*$/,
	                message: 'The id and class attribute values must be in lowercase and split by a dash.',
	            },
	            hump: {
	                regId: /^[a-z][a-zA-Z\d]*([A-Z][a-zA-Z\d]*)*$/,
	                message: 'The id and class attribute values must meet the camelCase style.',
	            },
	        };
	        let rule;
	        if (typeof options === 'string') {
	            rule = arrRules[options];
	        }
	        else {
	            rule = options;
	        }
	        if (typeof rule === 'object' && rule.regId) {
	            let regId = rule.regId;
	            const message = rule.message;
	            if (!(regId instanceof RegExp)) {
	                regId = new RegExp(regId);
	            }
	            parser.addListener('tagstart', (event) => {
	                const attrs = event.attrs;
	                let attr;
	                const col = event.col + event.tagName.length + 1;
	                for (let i = 0, l1 = attrs.length; i < l1; i++) {
	                    attr = attrs[i];
	                    if (attr.name.toLowerCase() === 'id') {
	                        if (regId.test(attr.value) === false) {
	                            reporter.warn(message, event.line, col + attr.index, this, attr.raw);
	                        }
	                    }
	                    if (attr.name.toLowerCase() === 'class') {
	                        const arrClass = attr.value.split(/\s+/g);
	                        let classValue;
	                        for (let j = 0, l2 = arrClass.length; j < l2; j++) {
	                            classValue = arrClass[j];
	                            if (classValue && regId.test(classValue) === false) {
	                                reporter.warn(message, event.line, col + attr.index, this, classValue);
	                            }
	                        }
	                    }
	                }
	            });
	        }
	    },
	};

	var idUnique = {};

	Object.defineProperty(idUnique, "__esModule", { value: true });
	idUnique.default = {
	    id: 'id-unique',
	    description: 'The value of id attributes must be unique.',
	    init(parser, reporter) {
	        const mapIdCount = {};
	        parser.addListener('tagstart', (event) => {
	            const attrs = event.attrs;
	            let attr;
	            let id;
	            const col = event.col + event.tagName.length + 1;
	            for (let i = 0, l = attrs.length; i < l; i++) {
	                attr = attrs[i];
	                if (attr.name.toLowerCase() === 'id') {
	                    id = attr.value;
	                    if (id) {
	                        if (mapIdCount[id] === undefined) {
	                            mapIdCount[id] = 1;
	                        }
	                        else {
	                            mapIdCount[id]++;
	                        }
	                        if (mapIdCount[id] > 1) {
	                            reporter.error(`The id value [ ${id} ] must be unique.`, event.line, col + attr.index, this, attr.raw);
	                        }
	                    }
	                    break;
	                }
	            }
	        });
	    },
	};

	var inlineScriptDisabled = {};

	Object.defineProperty(inlineScriptDisabled, "__esModule", { value: true });
	inlineScriptDisabled.default = {
	    id: 'inline-script-disabled',
	    description: 'Inline script cannot be used.',
	    init(parser, reporter) {
	        parser.addListener('tagstart', (event) => {
	            const attrs = event.attrs;
	            let attr;
	            const col = event.col + event.tagName.length + 1;
	            let attrName;
	            const reEvent = /^on(unload|message|submit|select|scroll|resize|mouseover|mouseout|mousemove|mouseleave|mouseenter|mousedown|load|keyup|keypress|keydown|focus|dblclick|click|change|blur|error)$/i;
	            for (let i = 0, l = attrs.length; i < l; i++) {
	                attr = attrs[i];
	                attrName = attr.name.toLowerCase();
	                if (reEvent.test(attrName) === true) {
	                    reporter.warn(`Inline script [ ${attr.raw} ] cannot be used.`, event.line, col + attr.index, this, attr.raw);
	                }
	                else if (attrName === 'src' || attrName === 'href') {
	                    if (/^\s*javascript:/i.test(attr.value)) {
	                        reporter.warn(`Inline script [ ${attr.raw} ] cannot be used.`, event.line, col + attr.index, this, attr.raw);
	                    }
	                }
	            }
	        });
	    },
	};

	var inlineStyleDisabled = {};

	Object.defineProperty(inlineStyleDisabled, "__esModule", { value: true });
	inlineStyleDisabled.default = {
	    id: 'inline-style-disabled',
	    description: 'Inline style cannot be used.',
	    init(parser, reporter) {
	        parser.addListener('tagstart', (event) => {
	            const attrs = event.attrs;
	            let attr;
	            const col = event.col + event.tagName.length + 1;
	            for (let i = 0, l = attrs.length; i < l; i++) {
	                attr = attrs[i];
	                if (attr.name.toLowerCase() === 'style') {
	                    reporter.warn(`Inline style [ ${attr.raw} ] cannot be used.`, event.line, col + attr.index, this, attr.raw);
	                }
	            }
	        });
	    },
	};

	var inputRequiresLabel = {};

	Object.defineProperty(inputRequiresLabel, "__esModule", { value: true });
	inputRequiresLabel.default = {
	    id: 'input-requires-label',
	    description: 'All [ input ] tags must have a corresponding [ label ] tag. ',
	    init(parser, reporter) {
	        const labelTags = [];
	        const inputTags = [];
	        parser.addListener('tagstart', (event) => {
	            const tagName = event.tagName.toLowerCase();
	            const mapAttrs = parser.getMapAttrs(event.attrs);
	            const col = event.col + tagName.length + 1;
	            if (tagName === 'input') {
	                if (mapAttrs['type'] !== 'hidden') {
	                    inputTags.push({ event: event, col: col, id: mapAttrs['id'] });
	                }
	            }
	            if (tagName === 'label') {
	                if ('for' in mapAttrs && mapAttrs['for'] !== '') {
	                    labelTags.push({ event: event, col: col, forValue: mapAttrs['for'] });
	                }
	            }
	        });
	        parser.addListener('end', () => {
	            inputTags.forEach((inputTag) => {
	                if (!hasMatchingLabelTag(inputTag)) {
	                    reporter.warn('No matching [ label ] tag found.', inputTag.event.line, inputTag.col, this, inputTag.event.raw);
	                }
	            });
	        });
	        function hasMatchingLabelTag(inputTag) {
	            let found = false;
	            labelTags.forEach((labelTag) => {
	                if (inputTag.id && inputTag.id === labelTag.forValue) {
	                    found = true;
	                }
	            });
	            return found;
	        }
	    },
	};

	var scriptDisabled = {};

	Object.defineProperty(scriptDisabled, "__esModule", { value: true });
	scriptDisabled.default = {
	    id: 'script-disabled',
	    description: 'The <script> tag cannot be used.',
	    init(parser, reporter) {
	        parser.addListener('tagstart', (event) => {
	            if (event.tagName.toLowerCase() === 'script') {
	                reporter.error('The <script> tag cannot be used.', event.line, event.col, this, event.raw);
	            }
	        });
	    },
	};

	var spaceTabMixedDisabled = {};

	Object.defineProperty(spaceTabMixedDisabled, "__esModule", { value: true });
	spaceTabMixedDisabled.default = {
	    id: 'space-tab-mixed-disabled',
	    description: 'Do not mix tabs and spaces for indentation.',
	    init(parser, reporter, options) {
	        let indentMode = 'nomix';
	        let spaceLengthRequire = null;
	        if (typeof options === 'string') {
	            const match = /^([a-z]+)(\d+)?/.exec(options);
	            if (match) {
	                indentMode = match[1];
	                spaceLengthRequire = match[2] && parseInt(match[2], 10);
	            }
	        }
	        parser.addListener('text', (event) => {
	            const raw = event.raw;
	            const reMixed = /(^|\r?\n)([ \t]+)/g;
	            let match;
	            while ((match = reMixed.exec(raw))) {
	                const fixedPos = parser.fixPos(event, match.index + match[1].length);
	                if (fixedPos.col !== 1) {
	                    continue;
	                }
	                const whiteSpace = match[2];
	                if (indentMode === 'space') {
	                    if (spaceLengthRequire) {
	                        if (/^ +$/.test(whiteSpace) === false ||
	                            whiteSpace.length % spaceLengthRequire !== 0) {
	                            reporter.warn(`Please use space for indentation and keep ${spaceLengthRequire} length.`, fixedPos.line, 1, this, event.raw);
	                        }
	                    }
	                    else {
	                        if (/^ +$/.test(whiteSpace) === false) {
	                            reporter.warn('Please use space for indentation.', fixedPos.line, 1, this, event.raw);
	                        }
	                    }
	                }
	                else if (indentMode === 'tab' && /^\t+$/.test(whiteSpace) === false) {
	                    reporter.warn('Please use tab for indentation.', fixedPos.line, 1, this, event.raw);
	                }
	                else if (/ +\t|\t+ /.test(whiteSpace) === true) {
	                    reporter.warn('Do not mix tabs and spaces for indentation.', fixedPos.line, 1, this, event.raw);
	                }
	            }
	        });
	    },
	};

	var specCharEscape = {};

	Object.defineProperty(specCharEscape, "__esModule", { value: true });
	specCharEscape.default = {
	    id: 'spec-char-escape',
	    description: 'Special characters must be escaped.',
	    init(parser, reporter) {
	        parser.addListener('text', (event) => {
	            const raw = event.raw;
	            const reSpecChar = /([<>])|( \& )/g;
	            let match;
	            while ((match = reSpecChar.exec(raw))) {
	                const fixedPos = parser.fixPos(event, match.index);
	                reporter.error(`Special characters must be escaped : [ ${match[0]} ].`, fixedPos.line, fixedPos.col, this, event.raw);
	            }
	        });
	    },
	};

	var srcNotEmpty = {};

	Object.defineProperty(srcNotEmpty, "__esModule", { value: true });
	srcNotEmpty.default = {
	    id: 'src-not-empty',
	    description: 'The src attribute of an img(script,link) must have a value.',
	    init(parser, reporter) {
	        parser.addListener('tagstart', (event) => {
	            const tagName = event.tagName;
	            const attrs = event.attrs;
	            let attr;
	            const col = event.col + tagName.length + 1;
	            for (let i = 0, l = attrs.length; i < l; i++) {
	                attr = attrs[i];
	                if (((/^(img|script|embed|bgsound|iframe)$/.test(tagName) === true &&
	                    attr.name === 'src') ||
	                    (tagName === 'link' && attr.name === 'href') ||
	                    (tagName === 'object' && attr.name === 'data')) &&
	                    attr.value === '') {
	                    reporter.error(`The attribute [ ${attr.name} ] of the tag [ ${tagName} ] must have a value.`, event.line, col + attr.index, this, attr.raw);
	                }
	            }
	        });
	    },
	};

	var styleDisabled = {};

	Object.defineProperty(styleDisabled, "__esModule", { value: true });
	styleDisabled.default = {
	    id: 'style-disabled',
	    description: '<style> tags cannot be used.',
	    init(parser, reporter) {
	        parser.addListener('tagstart', (event) => {
	            if (event.tagName.toLowerCase() === 'style') {
	                reporter.warn('The <style> tag cannot be used.', event.line, event.col, this, event.raw);
	            }
	        });
	    },
	};

	var tagPair = {};

	Object.defineProperty(tagPair, "__esModule", { value: true });
	tagPair.default = {
	    id: 'tag-pair',
	    description: 'Tag must be paired.',
	    init(parser, reporter) {
	        const stack = [];
	        const mapEmptyTags = parser.makeMap('area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed,track,command,source,keygen,wbr');
	        parser.addListener('tagstart', (event) => {
	            const tagName = event.tagName.toLowerCase();
	            if (mapEmptyTags[tagName] === undefined && !event.close) {
	                stack.push({
	                    tagName: tagName,
	                    line: event.line,
	                    raw: event.raw,
	                });
	            }
	        });
	        parser.addListener('tagend', (event) => {
	            const tagName = event.tagName.toLowerCase();
	            let pos;
	            for (pos = stack.length - 1; pos >= 0; pos--) {
	                if (stack[pos].tagName === tagName) {
	                    break;
	                }
	            }
	            if (pos >= 0) {
	                const arrTags = [];
	                for (let i = stack.length - 1; i > pos; i--) {
	                    arrTags.push(`</${stack[i].tagName}>`);
	                }
	                if (arrTags.length > 0) {
	                    const lastEvent = stack[stack.length - 1];
	                    reporter.error(`Tag must be paired, missing: [ ${arrTags.join('')} ], start tag match failed [ ${lastEvent.raw} ] on line ${lastEvent.line}.`, event.line, event.col, this, event.raw);
	                }
	                stack.length = pos;
	            }
	            else {
	                reporter.error(`Tag must be paired, no start tag: [ ${event.raw} ]`, event.line, event.col, this, event.raw);
	            }
	        });
	        parser.addListener('end', (event) => {
	            const arrTags = [];
	            for (let i = stack.length - 1; i >= 0; i--) {
	                arrTags.push(`</${stack[i].tagName}>`);
	            }
	            if (arrTags.length > 0) {
	                const lastEvent = stack[stack.length - 1];
	                reporter.error(`Tag must be paired, missing: [ ${arrTags.join('')} ], open tag match failed [ ${lastEvent.raw} ] on line ${lastEvent.line}.`, event.line, event.col, this, '');
	            }
	        });
	    },
	};

	var tagSelfClose = {};

	Object.defineProperty(tagSelfClose, "__esModule", { value: true });
	tagSelfClose.default = {
	    id: 'tag-self-close',
	    description: 'Empty tags must be self closed.',
	    init(parser, reporter) {
	        const mapEmptyTags = parser.makeMap('area,base,basefont,bgsound,br,col,frame,hr,img,input,isindex,link,meta,param,embed,track,command,source,keygen,wbr');
	        parser.addListener('tagstart', (event) => {
	            const tagName = event.tagName.toLowerCase();
	            if (mapEmptyTags[tagName] !== undefined) {
	                if (!event.close) {
	                    reporter.warn(`The empty tag : [ ${tagName} ] must be self closed.`, event.line, event.col, this, event.raw);
	                }
	            }
	        });
	    },
	};

	var emptyTagNotSelfClosed = {};

	Object.defineProperty(emptyTagNotSelfClosed, "__esModule", { value: true });
	emptyTagNotSelfClosed.default = {
	    id: 'empty-tag-not-self-closed',
	    description: 'Empty tags must not use self closed syntax.',
	    init(parser, reporter) {
	        const mapEmptyTags = parser.makeMap('area,base,basefont,bgsound,br,col,frame,hr,img,input,isindex,link,meta,param,embed,track,command,source,keygen,wbr');
	        parser.addListener('tagstart', (event) => {
	            const tagName = event.tagName.toLowerCase();
	            if (mapEmptyTags[tagName] !== undefined) {
	                if (event.close) {
	                    reporter.error(`The empty tag : [ ${tagName} ] must not use self closed syntax.`, event.line, event.col, this, event.raw);
	                }
	            }
	        });
	    },
	};

	var tagnameLowercase = {};

	Object.defineProperty(tagnameLowercase, "__esModule", { value: true });
	tagnameLowercase.default = {
	    id: 'tagname-lowercase',
	    description: 'All html element names must be in lowercase.',
	    init(parser, reporter, options) {
	        const exceptions = Array.isArray(options)
	            ? options
	            : [];
	        parser.addListener('tagstart,tagend', (event) => {
	            const tagName = event.tagName;
	            if (exceptions.indexOf(tagName) === -1 &&
	                tagName !== tagName.toLowerCase()) {
	                reporter.error(`The html element name of [ ${tagName} ] must be in lowercase.`, event.line, event.col, this, event.raw);
	            }
	        });
	    },
	};

	var tagnameSpecialchars = {};

	Object.defineProperty(tagnameSpecialchars, "__esModule", { value: true });
	tagnameSpecialchars.default = {
	    id: 'tagname-specialchars',
	    description: 'All special characters must be escaped.',
	    init(parser, reporter) {
	        const specialchars = /[^a-zA-Z0-9\-:_]/;
	        parser.addListener('tagstart,tagend', (event) => {
	            const tagName = event.tagName;
	            if (specialchars.test(tagName)) {
	                reporter.error(`The html element name of [ ${tagName} ] contains special character.`, event.line, event.col, this, event.raw);
	            }
	        });
	    },
	};

	var titleRequire = {};

	Object.defineProperty(titleRequire, "__esModule", { value: true });
	titleRequire.default = {
	    id: 'title-require',
	    description: '<title> must be present in <head> tag.',
	    init(parser, reporter) {
	        let headBegin = false;
	        let hasTitle = false;
	        const onTagStart = (event) => {
	            const tagName = event.tagName.toLowerCase();
	            if (tagName === 'head') {
	                headBegin = true;
	            }
	            else if (tagName === 'title' && headBegin) {
	                hasTitle = true;
	            }
	        };
	        const onTagEnd = (event) => {
	            const tagName = event.tagName.toLowerCase();
	            if (hasTitle && tagName === 'title') {
	                const lastEvent = event.lastEvent;
	                if (lastEvent.type !== 'text' ||
	                    (lastEvent.type === 'text' && /^\s*$/.test(lastEvent.raw) === true)) {
	                    reporter.error('<title></title> must not be empty.', event.line, event.col, this, event.raw);
	                }
	            }
	            else if (tagName === 'head') {
	                if (hasTitle === false) {
	                    reporter.error('<title> must be present in <head> tag.', event.line, event.col, this, event.raw);
	                }
	                parser.removeListener('tagstart', onTagStart);
	                parser.removeListener('tagend', onTagEnd);
	            }
	        };
	        parser.addListener('tagstart', onTagStart);
	        parser.addListener('tagend', onTagEnd);
	    },
	};

	var tagsCheck = {};

	Object.defineProperty(tagsCheck, "__esModule", { value: true });
	let tagsTypings = {
	    a: {
	        selfclosing: false,
	        attrsRequired: ['href', 'title'],
	        redundantAttrs: ['alt'],
	    },
	    div: {
	        selfclosing: false,
	    },
	    main: {
	        selfclosing: false,
	        redundantAttrs: ['role'],
	    },
	    nav: {
	        selfclosing: false,
	        redundantAttrs: ['role'],
	    },
	    script: {
	        attrsOptional: [
	            ['async', 'async'],
	            ['defer', 'defer'],
	        ],
	    },
	    img: {
	        selfclosing: true,
	        attrsRequired: ['src', 'alt', 'title'],
	    },
	};
	tagsCheck.default = {
	    id: 'tags-check',
	    description: 'Checks html tags.',
	    init(parser, reporter, options) {
	        tagsTypings = Object.assign(Object.assign({}, tagsTypings), options);
	        parser.addListener('tagstart', (event) => {
	            const attrs = event.attrs;
	            const col = event.col + event.tagName.length + 1;
	            const tagName = event.tagName.toLowerCase();
	            if (tagsTypings[tagName]) {
	                const currentTagType = tagsTypings[tagName];
	                if (currentTagType.selfclosing === true && !event.close) {
	                    reporter.warn(`The <${tagName}> tag must be selfclosing.`, event.line, event.col, this, event.raw);
	                }
	                else if (currentTagType.selfclosing === false && event.close) {
	                    reporter.warn(`The <${tagName}> tag must not be selfclosing.`, event.line, event.col, this, event.raw);
	                }
	                if (Array.isArray(currentTagType.attrsRequired)) {
	                    const attrsRequired = currentTagType.attrsRequired;
	                    attrsRequired.forEach((id) => {
	                        if (Array.isArray(id)) {
	                            const copyOfId = id.map((a) => a);
	                            const realID = copyOfId.shift();
	                            const values = copyOfId;
	                            if (attrs.some((attr) => attr.name === realID)) {
	                                attrs.forEach((attr) => {
	                                    if (attr.name === realID &&
	                                        values.indexOf(attr.value) === -1) {
	                                        reporter.error(`The <${tagName}> tag must have attr '${realID}' with one value of '${values.join("' or '")}'.`, event.line, col, this, event.raw);
	                                    }
	                                });
	                            }
	                            else {
	                                reporter.error(`The <${tagName}> tag must have attr '${realID}'.`, event.line, col, this, event.raw);
	                            }
	                        }
	                        else if (!attrs.some((attr) => id.split('|').indexOf(attr.name) !== -1)) {
	                            reporter.error(`The <${tagName}> tag must have attr '${id}'.`, event.line, col, this, event.raw);
	                        }
	                    });
	                }
	                if (Array.isArray(currentTagType.attrsOptional)) {
	                    const attrsOptional = currentTagType.attrsOptional;
	                    attrsOptional.forEach((id) => {
	                        if (Array.isArray(id)) {
	                            const copyOfId = id.map((a) => a);
	                            const realID = copyOfId.shift();
	                            const values = copyOfId;
	                            if (attrs.some((attr) => attr.name === realID)) {
	                                attrs.forEach((attr) => {
	                                    if (attr.name === realID &&
	                                        values.indexOf(attr.value) === -1) {
	                                        reporter.error(`The <${tagName}> tag must have optional attr '${realID}' with one value of '${values.join("' or '")}'.`, event.line, col, this, event.raw);
	                                    }
	                                });
	                            }
	                        }
	                    });
	                }
	                if (Array.isArray(currentTagType.redundantAttrs)) {
	                    const redundantAttrs = currentTagType.redundantAttrs;
	                    redundantAttrs.forEach((attrName) => {
	                        if (attrs.some((attr) => attr.name === attrName)) {
	                            reporter.error(`The attr '${attrName}' is redundant for <${tagName}> and should be omitted.`, event.line, col, this, event.raw);
	                        }
	                    });
	                }
	            }
	        });
	    },
	};

	var attrNoUnnecessaryWhitespace = {};

	Object.defineProperty(attrNoUnnecessaryWhitespace, "__esModule", { value: true });
	attrNoUnnecessaryWhitespace.default = {
	    id: 'attr-no-unnecessary-whitespace',
	    description: 'No spaces between attribute names and values.',
	    init(parser, reporter, options) {
	        const exceptions = Array.isArray(options) ? options : [];
	        parser.addListener('tagstart', (event) => {
	            const attrs = event.attrs;
	            const col = event.col + event.tagName.length + 1;
	            for (let i = 0; i < attrs.length; i++) {
	                if (exceptions.indexOf(attrs[i].name) === -1) {
	                    const match = /(\s*)=(\s*)/.exec(attrs[i].raw.trim());
	                    if (match && (match[1].length !== 0 || match[2].length !== 0)) {
	                        reporter.error(`The attribute '${attrs[i].name}' must not have spaces between the name and value.`, event.line, col + attrs[i].index, this, attrs[i].raw);
	                    }
	                }
	            }
	        });
	    },
	};

	(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.attrNoUnnecessaryWhitespace = exports.tagsCheck = exports.titleRequire = exports.tagnameSpecialChars = exports.tagnameLowercase = exports.emptyTagNotSelfClosed = exports.tagSelfClose = exports.tagPair = exports.styleDisabled = exports.srcNotEmpty = exports.specCharEscape = exports.spaceTabMixedDisabled = exports.scriptDisabled = exports.inputRequiresLabel = exports.inlineStyleDisabled = exports.inlineScriptDisabled = exports.idUnique = exports.idClassValue = exports.idClsasAdDisabled = exports.htmlLangRequire = exports.hrefAbsOrRel = exports.headScriptDisabled = exports.doctypeHTML5 = exports.doctypeFirst = exports.attrWhitespace = exports.attrValueSingleQuotes = exports.attrValueNotEmpty = exports.attrValueDoubleQuotes = exports.attrUnsafeChars = exports.attrNoDuplication = exports.attrSort = exports.attrLowercase = exports.altRequire = void 0;
	var alt_require_1 = altRequire;
	Object.defineProperty(exports, "altRequire", { enumerable: true, get: function () { return alt_require_1.default; } });
	var attr_lowercase_1 = attrLowercase;
	Object.defineProperty(exports, "attrLowercase", { enumerable: true, get: function () { return attr_lowercase_1.default; } });
	var attr_sorted_1 = attrSorted;
	Object.defineProperty(exports, "attrSort", { enumerable: true, get: function () { return attr_sorted_1.default; } });
	var attr_no_duplication_1 = attrNoDuplication;
	Object.defineProperty(exports, "attrNoDuplication", { enumerable: true, get: function () { return attr_no_duplication_1.default; } });
	var attr_unsafe_chars_1 = attrUnsafeChars;
	Object.defineProperty(exports, "attrUnsafeChars", { enumerable: true, get: function () { return attr_unsafe_chars_1.default; } });
	var attr_value_double_quotes_1 = attrValueDoubleQuotes;
	Object.defineProperty(exports, "attrValueDoubleQuotes", { enumerable: true, get: function () { return attr_value_double_quotes_1.default; } });
	var attr_value_not_empty_1 = attrValueNotEmpty;
	Object.defineProperty(exports, "attrValueNotEmpty", { enumerable: true, get: function () { return attr_value_not_empty_1.default; } });
	var attr_value_single_quotes_1 = attrValueSingleQuotes;
	Object.defineProperty(exports, "attrValueSingleQuotes", { enumerable: true, get: function () { return attr_value_single_quotes_1.default; } });
	var attr_whitespace_1 = attrWhitespace;
	Object.defineProperty(exports, "attrWhitespace", { enumerable: true, get: function () { return attr_whitespace_1.default; } });
	var doctype_first_1 = doctypeFirst;
	Object.defineProperty(exports, "doctypeFirst", { enumerable: true, get: function () { return doctype_first_1.default; } });
	var doctype_html5_1 = doctypeHtml5;
	Object.defineProperty(exports, "doctypeHTML5", { enumerable: true, get: function () { return doctype_html5_1.default; } });
	var head_script_disabled_1 = headScriptDisabled;
	Object.defineProperty(exports, "headScriptDisabled", { enumerable: true, get: function () { return head_script_disabled_1.default; } });
	var href_abs_or_rel_1 = hrefAbsOrRel;
	Object.defineProperty(exports, "hrefAbsOrRel", { enumerable: true, get: function () { return href_abs_or_rel_1.default; } });
	var html_lang_require_1 = htmlLangRequire;
	Object.defineProperty(exports, "htmlLangRequire", { enumerable: true, get: function () { return html_lang_require_1.default; } });
	var id_class_ad_disabled_1 = idClassAdDisabled;
	Object.defineProperty(exports, "idClsasAdDisabled", { enumerable: true, get: function () { return id_class_ad_disabled_1.default; } });
	var id_class_value_1 = idClassValue;
	Object.defineProperty(exports, "idClassValue", { enumerable: true, get: function () { return id_class_value_1.default; } });
	var id_unique_1 = idUnique;
	Object.defineProperty(exports, "idUnique", { enumerable: true, get: function () { return id_unique_1.default; } });
	var inline_script_disabled_1 = inlineScriptDisabled;
	Object.defineProperty(exports, "inlineScriptDisabled", { enumerable: true, get: function () { return inline_script_disabled_1.default; } });
	var inline_style_disabled_1 = inlineStyleDisabled;
	Object.defineProperty(exports, "inlineStyleDisabled", { enumerable: true, get: function () { return inline_style_disabled_1.default; } });
	var input_requires_label_1 = inputRequiresLabel;
	Object.defineProperty(exports, "inputRequiresLabel", { enumerable: true, get: function () { return input_requires_label_1.default; } });
	var script_disabled_1 = scriptDisabled;
	Object.defineProperty(exports, "scriptDisabled", { enumerable: true, get: function () { return script_disabled_1.default; } });
	var space_tab_mixed_disabled_1 = spaceTabMixedDisabled;
	Object.defineProperty(exports, "spaceTabMixedDisabled", { enumerable: true, get: function () { return space_tab_mixed_disabled_1.default; } });
	var spec_char_escape_1 = specCharEscape;
	Object.defineProperty(exports, "specCharEscape", { enumerable: true, get: function () { return spec_char_escape_1.default; } });
	var src_not_empty_1 = srcNotEmpty;
	Object.defineProperty(exports, "srcNotEmpty", { enumerable: true, get: function () { return src_not_empty_1.default; } });
	var style_disabled_1 = styleDisabled;
	Object.defineProperty(exports, "styleDisabled", { enumerable: true, get: function () { return style_disabled_1.default; } });
	var tag_pair_1 = tagPair;
	Object.defineProperty(exports, "tagPair", { enumerable: true, get: function () { return tag_pair_1.default; } });
	var tag_self_close_1 = tagSelfClose;
	Object.defineProperty(exports, "tagSelfClose", { enumerable: true, get: function () { return tag_self_close_1.default; } });
	var empty_tag_not_self_closed_1 = emptyTagNotSelfClosed;
	Object.defineProperty(exports, "emptyTagNotSelfClosed", { enumerable: true, get: function () { return empty_tag_not_self_closed_1.default; } });
	var tagname_lowercase_1 = tagnameLowercase;
	Object.defineProperty(exports, "tagnameLowercase", { enumerable: true, get: function () { return tagname_lowercase_1.default; } });
	var tagname_specialchars_1 = tagnameSpecialchars;
	Object.defineProperty(exports, "tagnameSpecialChars", { enumerable: true, get: function () { return tagname_specialchars_1.default; } });
	var title_require_1 = titleRequire;
	Object.defineProperty(exports, "titleRequire", { enumerable: true, get: function () { return title_require_1.default; } });
	var tags_check_1 = tagsCheck;
	Object.defineProperty(exports, "tagsCheck", { enumerable: true, get: function () { return tags_check_1.default; } });
	var attr_no_unnecessary_whitespace_1 = attrNoUnnecessaryWhitespace;
	Object.defineProperty(exports, "attrNoUnnecessaryWhitespace", { enumerable: true, get: function () { return attr_no_unnecessary_whitespace_1.default; } });

	}(rules));

	(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.HTMLParser = exports.Reporter = exports.HTMLRules = exports.HTMLHint = void 0;
	const htmlparser_1 = htmlparser;
	exports.HTMLParser = htmlparser_1.default;
	const reporter_1 = reporter;
	exports.Reporter = reporter_1.default;
	const HTMLRules = rules;
	exports.HTMLRules = HTMLRules;
	class HTMLHintCore {
	    constructor() {
	        this.rules = {};
	        this.defaultRuleset = {
	            'tagname-lowercase': true,
	            'attr-lowercase': true,
	            'attr-value-double-quotes': true,
	            'doctype-first': true,
	            'tag-pair': true,
	            'spec-char-escape': true,
	            'id-unique': true,
	            'src-not-empty': true,
	            'attr-no-duplication': true,
	            'title-require': true,
	        };
	    }
	    addRule(rule) {
	        this.rules[rule.id] = rule;
	    }
	    verify(html, ruleset = this.defaultRuleset) {
	        if (Object.keys(ruleset).length === 0) {
	            ruleset = this.defaultRuleset;
	        }
	        html = html.replace(/^\s*<!--\s*htmlhint\s+([^\r\n]+?)\s*-->/i, (all, strRuleset) => {
	            strRuleset.replace(/(?:^|,)\s*([^:,]+)\s*(?:\:\s*([^,\s]+))?/g, (all, ruleId, value) => {
	                ruleset[ruleId] =
	                    value !== undefined && value.length > 0 ? JSON.parse(value) : true;
	                return '';
	            });
	            return '';
	        });
	        const parser = new htmlparser_1.default();
	        const reporter = new reporter_1.default(html, ruleset);
	        const rules = this.rules;
	        let rule;
	        for (const id in ruleset) {
	            rule = rules[id];
	            if (rule !== undefined && ruleset[id] !== false) {
	                rule.init(parser, reporter, ruleset[id]);
	            }
	        }
	        parser.parse(html);
	        return reporter.messages;
	    }
	    format(arrMessages, options = {}) {
	        const arrLogs = [];
	        const colors = {
	            white: '',
	            grey: '',
	            red: '',
	            reset: '',
	        };
	        if (options.colors) {
	            colors.white = '\x1b[37m';
	            colors.grey = '\x1b[90m';
	            colors.red = '\x1b[31m';
	            colors.reset = '\x1b[39m';
	        }
	        const indent = options.indent || 0;
	        arrMessages.forEach((hint) => {
	            const leftWindow = 40;
	            const rightWindow = leftWindow + 20;
	            let evidence = hint.evidence;
	            const line = hint.line;
	            const col = hint.col;
	            const evidenceCount = evidence.length;
	            let leftCol = col > leftWindow + 1 ? col - leftWindow : 1;
	            let rightCol = evidence.length > col + rightWindow ? col + rightWindow : evidenceCount;
	            if (col < leftWindow + 1) {
	                rightCol += leftWindow - col + 1;
	            }
	            evidence = evidence.replace(/\t/g, ' ').substring(leftCol - 1, rightCol);
	            if (leftCol > 1) {
	                evidence = `...${evidence}`;
	                leftCol -= 3;
	            }
	            if (rightCol < evidenceCount) {
	                evidence += '...';
	            }
	            arrLogs.push(`${colors.white + repeatStr(indent)}L${line} |${colors.grey}${evidence}${colors.reset}`);
	            let pointCol = col - leftCol;
	            const match = evidence.substring(0, pointCol).match(/[^\u0000-\u00ff]/g);
	            if (match !== null) {
	                pointCol += match.length;
	            }
	            arrLogs.push(`${colors.white +
                repeatStr(indent) +
                repeatStr(String(line).length + 3 + pointCol)}^ ${colors.red}${hint.message} (${hint.rule.id})${colors.reset}`);
	        });
	        return arrLogs;
	    }
	}
	function repeatStr(n, str) {
	    return new Array(n + 1).join(str || ' ');
	}
	exports.HTMLHint = new HTMLHintCore();
	Object.keys(HTMLRules).forEach((key) => {
	    exports.HTMLHint.addRule(HTMLRules[key]);
	});

	}(core$1));

	var core = /*@__PURE__*/getDefaultExportFromCjs(core$1);

	return core;

}));
