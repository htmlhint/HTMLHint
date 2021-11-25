(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.HTMLHint = factory());
})(this, (function () { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	var core$1 = {};

	var htmlparser = {};

	Object.defineProperty(htmlparser, "__esModule", { value: true });
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
	htmlparser.default = HTMLParser;

	var reporter = {};

	Object.defineProperty(reporter, "__esModule", { value: true });
	var Reporter = (function () {
	    function Reporter(html, ruleset) {
	        this.html = html;
	        this.lines = html.split(/\r?\n/);
	        var match = /\r?\n/.exec(html);
	        this.brLen = match !== null ? match[0].length : 0;
	        this.ruleset = ruleset;
	        this.messages = [];
	    }
	    Reporter.prototype.info = function (message, line, col, rule, raw) {
	        this.report("info", message, line, col, rule, raw);
	    };
	    Reporter.prototype.warn = function (message, line, col, rule, raw) {
	        this.report("warning", message, line, col, rule, raw);
	    };
	    Reporter.prototype.error = function (message, line, col, rule, raw) {
	        this.report("error", message, line, col, rule, raw);
	    };
	    Reporter.prototype.report = function (type, message, line, col, rule, raw) {
	        var lines = this.lines;
	        var brLen = this.brLen;
	        var evidence = '';
	        var evidenceLen = 0;
	        for (var i = line - 1, lineCount = lines.length; i < lineCount; i++) {
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
	                link: "https://github.com/thedaviddias/HTMLHint/wiki/".concat(rule.id),
	            },
	        });
	    };
	    return Reporter;
	}());
	reporter.default = Reporter;

	var rules = {};

	var altRequire = {};

	Object.defineProperty(altRequire, "__esModule", { value: true });
	altRequire.default = {
	    id: 'alt-require',
	    description: 'The alt attribute of an <img> element must be present and alt attribute of area[href] and input[type=image] must have a value.',
	    init: function (parser, reporter) {
	        var _this = this;
	        parser.addListener('tagstart', function (event) {
	            var tagName = event.tagName.toLowerCase();
	            var mapAttrs = parser.getMapAttrs(event.attrs);
	            var col = event.col + tagName.length + 1;
	            var selector;
	            if (tagName === 'img' && !('alt' in mapAttrs)) {
	                reporter.warn('An alt attribute must be present on <img> elements.', event.line, col, _this, event.raw);
	            }
	            else if ((tagName === 'area' && 'href' in mapAttrs) ||
	                (tagName === 'input' && mapAttrs['type'] === 'image')) {
	                if (!('alt' in mapAttrs) || mapAttrs['alt'] === '') {
	                    selector = tagName === 'area' ? 'area[href]' : 'input[type=image]';
	                    reporter.warn("The alt attribute of ".concat(selector, " must have a value."), event.line, col, _this, event.raw);
	                }
	            }
	        });
	    },
	};

	var attrLowercase = {};

	Object.defineProperty(attrLowercase, "__esModule", { value: true });
	function testAgainstStringOrRegExp(value, comparison) {
	    if (comparison instanceof RegExp) {
	        return comparison.test(value)
	            ? { match: value, pattern: comparison }
	            : false;
	    }
	    var firstComparisonChar = comparison[0];
	    var lastComparisonChar = comparison[comparison.length - 1];
	    var secondToLastComparisonChar = comparison[comparison.length - 2];
	    var comparisonIsRegex = firstComparisonChar === '/' &&
	        (lastComparisonChar === '/' ||
	            (secondToLastComparisonChar === '/' && lastComparisonChar === 'i'));
	    var hasCaseInsensitiveFlag = comparisonIsRegex && lastComparisonChar === 'i';
	    if (comparisonIsRegex) {
	        var valueMatches = hasCaseInsensitiveFlag
	            ? new RegExp(comparison.slice(1, -2), 'i').test(value)
	            : new RegExp(comparison.slice(1, -1)).test(value);
	        return valueMatches;
	    }
	    return value === comparison;
	}
	attrLowercase.default = {
	    id: 'attr-lowercase',
	    description: 'All attribute names must be in lowercase.',
	    init: function (parser, reporter, options) {
	        var _this = this;
	        var exceptions = Array.isArray(options) ? options : [];
	        parser.addListener('tagstart', function (event) {
	            var attrs = event.attrs;
	            var attr;
	            var col = event.col + event.tagName.length + 1;
	            var _loop_1 = function (i, l) {
	                attr = attrs[i];
	                var attrName = attr.name;
	                if (!exceptions.find(function (exp) { return testAgainstStringOrRegExp(attrName, exp); }) &&
	                    attrName !== attrName.toLowerCase()) {
	                    reporter.error("The attribute name of [ ".concat(attrName, " ] must be in lowercase."), event.line, col + attr.index, _this, attr.raw);
	                }
	            };
	            for (var i = 0, l = attrs.length; i < l; i++) {
	                _loop_1(i);
	            }
	        });
	    },
	};

	var attrSorted = {};

	Object.defineProperty(attrSorted, "__esModule", { value: true });
	attrSorted.default = {
	    id: 'attr-sorted',
	    description: 'Attribute tags must be in proper order.',
	    init: function (parser, reporter) {
	        var _this = this;
	        var orderMap = {};
	        var sortOrder = [
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
	        for (var i = 0; i < sortOrder.length; i++) {
	            orderMap[sortOrder[i]] = i;
	        }
	        parser.addListener('tagstart', function (event) {
	            var attrs = event.attrs;
	            var listOfAttributes = [];
	            for (var i = 0; i < attrs.length; i++) {
	                listOfAttributes.push(attrs[i].name);
	            }
	            var originalAttrs = JSON.stringify(listOfAttributes);
	            listOfAttributes.sort(function (a, b) {
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
	                reporter.error("Inaccurate order ".concat(originalAttrs, " should be in hierarchy ").concat(JSON.stringify(listOfAttributes), " "), event.line, event.col, _this, event.raw);
	            }
	        });
	    },
	};

	var attrNoDuplication = {};

	Object.defineProperty(attrNoDuplication, "__esModule", { value: true });
	attrNoDuplication.default = {
	    id: 'attr-no-duplication',
	    description: 'Elements cannot have duplicate attributes.',
	    init: function (parser, reporter) {
	        var _this = this;
	        parser.addListener('tagstart', function (event) {
	            var attrs = event.attrs;
	            var attr;
	            var attrName;
	            var col = event.col + event.tagName.length + 1;
	            var mapAttrName = {};
	            for (var i = 0, l = attrs.length; i < l; i++) {
	                attr = attrs[i];
	                attrName = attr.name;
	                if (mapAttrName[attrName] === true) {
	                    reporter.error("Duplicate of attribute name [ ".concat(attr.name, " ] was found."), event.line, col + attr.index, _this, attr.raw);
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
	    init: function (parser, reporter) {
	        var _this = this;
	        parser.addListener('tagstart', function (event) {
	            var attrs = event.attrs;
	            var attr;
	            var col = event.col + event.tagName.length + 1;
	            var regUnsafe = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/;
	            var match;
	            for (var i = 0, l = attrs.length; i < l; i++) {
	                attr = attrs[i];
	                match = regUnsafe.exec(attr.value);
	                if (match !== null) {
	                    var unsafeCode = escape(match[0])
	                        .replace(/%u/, '\\u')
	                        .replace(/%/, '\\x');
	                    reporter.warn("The value of attribute [ ".concat(attr.name, " ] cannot contain an unsafe char [ ").concat(unsafeCode, " ]."), event.line, col + attr.index, _this, attr.raw);
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
	    init: function (parser, reporter) {
	        var _this = this;
	        parser.addListener('tagstart', function (event) {
	            var attrs = event.attrs;
	            var attr;
	            var col = event.col + event.tagName.length + 1;
	            for (var i = 0, l = attrs.length; i < l; i++) {
	                attr = attrs[i];
	                if ((attr.value !== '' && attr.quote !== '"') ||
	                    (attr.value === '' && attr.quote === "'")) {
	                    reporter.error("The value of attribute [ ".concat(attr.name, " ] must be in double quotes."), event.line, col + attr.index, _this, attr.raw);
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
	    init: function (parser, reporter) {
	        var _this = this;
	        parser.addListener('tagstart', function (event) {
	            var attrs = event.attrs;
	            var attr;
	            var col = event.col + event.tagName.length + 1;
	            for (var i = 0, l = attrs.length; i < l; i++) {
	                attr = attrs[i];
	                if (attr.quote === '' && attr.value === '') {
	                    reporter.warn("The attribute [ ".concat(attr.name, " ] must have a value."), event.line, col + attr.index, _this, attr.raw);
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
	    init: function (parser, reporter) {
	        var _this = this;
	        parser.addListener('tagstart', function (event) {
	            var attrs = event.attrs;
	            var attr;
	            var col = event.col + event.tagName.length + 1;
	            for (var i = 0, l = attrs.length; i < l; i++) {
	                attr = attrs[i];
	                if ((attr.value !== '' && attr.quote !== "'") ||
	                    (attr.value === '' && attr.quote === '"')) {
	                    reporter.error("The value of attribute [ ".concat(attr.name, " ] must be in single quotes."), event.line, col + attr.index, _this, attr.raw);
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
	    init: function (parser, reporter, options) {
	        var _this = this;
	        var exceptions = Array.isArray(options)
	            ? options
	            : [];
	        parser.addListener('tagstart', function (event) {
	            var attrs = event.attrs;
	            var attr;
	            var col = event.col + event.tagName.length + 1;
	            attrs.forEach(function (elem) {
	                attr = elem;
	                var attrName = elem.name;
	                if (exceptions.indexOf(attrName) !== -1) {
	                    return;
	                }
	                if (elem.value.trim() !== elem.value) {
	                    reporter.error("The attributes of [ ".concat(attrName, " ] must not have trailing whitespace."), event.line, col + attr.index, _this, attr.raw);
	                }
	                if (elem.value.replace(/ +(?= )/g, '') !== elem.value) {
	                    reporter.error("The attributes of [ ".concat(attrName, " ] must be separated by only one space."), event.line, col + attr.index, _this, attr.raw);
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
	    init: function (parser, reporter) {
	        var _this = this;
	        var allEvent = function (event) {
	            if (event.type === 'start' ||
	                (event.type === 'text' && /^\s*$/.test(event.raw))) {
	                return;
	            }
	            if ((event.type !== 'comment' && event.long === false) ||
	                /^DOCTYPE\s+/i.test(event.content) === false) {
	                reporter.error('Doctype must be declared first.', event.line, event.col, _this, event.raw);
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
	    init: function (parser, reporter) {
	        var _this = this;
	        var onComment = function (event) {
	            if (event.long === false &&
	                event.content.toLowerCase() !== 'doctype html') {
	                reporter.warn('Invalid doctype. Use: "<!DOCTYPE html>"', event.line, event.col, _this, event.raw);
	            }
	        };
	        var onTagStart = function () {
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
	    init: function (parser, reporter) {
	        var _this = this;
	        var reScript = /^(text\/javascript|application\/javascript)$/i;
	        var isInHead = false;
	        var onTagStart = function (event) {
	            var mapAttrs = parser.getMapAttrs(event.attrs);
	            var type = mapAttrs.type;
	            var tagName = event.tagName.toLowerCase();
	            if (tagName === 'head') {
	                isInHead = true;
	            }
	            if (isInHead === true &&
	                tagName === 'script' &&
	                (!type || reScript.test(type) === true)) {
	                reporter.warn('The <script> tag cannot be used in a <head> tag.', event.line, event.col, _this, event.raw);
	            }
	        };
	        var onTagEnd = function (event) {
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
	    init: function (parser, reporter, options) {
	        var _this = this;
	        var hrefMode = options === 'abs' ? 'absolute' : 'relative';
	        parser.addListener('tagstart', function (event) {
	            var attrs = event.attrs;
	            var attr;
	            var col = event.col + event.tagName.length + 1;
	            for (var i = 0, l = attrs.length; i < l; i++) {
	                attr = attrs[i];
	                if (attr.name === 'href') {
	                    if ((hrefMode === 'absolute' && /^\w+?:/.test(attr.value) === false) ||
	                        (hrefMode === 'relative' &&
	                            /^https?:\/\//.test(attr.value) === true)) {
	                        reporter.warn("The value of the href attribute [ ".concat(attr.value, " ] must be ").concat(hrefMode, "."), event.line, col + attr.index, _this, attr.raw);
	                    }
	                    break;
	                }
	            }
	        });
	    },
	};

	var htmlLangRequire = {};

	Object.defineProperty(htmlLangRequire, "__esModule", { value: true });
	var regular = '(art-lojban|cel-gaulish|no-bok|no-nyn|zh-guoyu|zh-hakka|zh-min|zh-min-nan|zh-xiang)';
	var irregular = '(en-GB-oed|i-ami|i-bnn|i-default|i-enochian|i-hak|i-klingon|i-lux|i-mingo|i-navajo|i-pwn|i-tao|i-tay|i-tsu|sgn-BE-FR|sgn-BE-NL|sgn-CH-DE)';
	var grandfathered = "(?<grandfathered>".concat(irregular, "|").concat(regular, ")");
	var privateUse = '(?<privateUse>x(-[A-Za-z0-9]{1,8})+)';
	var privateUse2 = '(?<privateUse2>x(-[A-Za-z0-9]{1,8})+)';
	var singleton = '[0-9A-WY-Za-wy-z]';
	var extension = "(?<extension>".concat(singleton, "(-[A-Za-z0-9]{2,8})+)");
	var variant = '(?<variant>[A-Za-z0-9]{5,8}|[0-9][A-Za-z0-9]{3})';
	var region = '(?<region>[A-Za-z]{2}|[0-9]{3})';
	var script = '(?<script>[A-Za-z]{4})';
	var extlang = '(?<extlang>[A-Za-z]{3}(-[A-Za-z]{3}){0,2})';
	var language = "(?<language>([A-Za-z]{2,3}(-".concat(extlang, ")?)|[A-Za-z]{4}|[A-Za-z]{5,8})");
	var langtag = "(".concat(language, "(-").concat(script, ")?") +
	    "(-".concat(region, ")?") +
	    "(-".concat(variant, ")*") +
	    "(-".concat(extension, ")*") +
	    "(-".concat(privateUse, ")?") +
	    ')';
	var languageTag = "(".concat(grandfathered, "|").concat(langtag, "|").concat(privateUse2, ")");
	htmlLangRequire.default = {
	    id: 'html-lang-require',
	    description: 'The lang attribute of an <html> element must be present and should be valid.',
	    init: function (parser, reporter) {
	        var _this = this;
	        parser.addListener('tagstart', function (event) {
	            var tagName = event.tagName.toLowerCase();
	            var mapAttrs = parser.getMapAttrs(event.attrs);
	            var col = event.col + tagName.length + 1;
	            var langValidityPattern = new RegExp(languageTag, 'g');
	            if (tagName === 'html') {
	                if ('lang' in mapAttrs) {
	                    if (!mapAttrs['lang']) {
	                        reporter.warn('The lang attribute of <html> element must have a value.', event.line, col, _this, event.raw);
	                    }
	                    else if (!langValidityPattern.test(mapAttrs['lang'])) {
	                        reporter.warn('The lang attribute value of <html> element must be a valid BCP47.', event.line, col, _this, event.raw);
	                    }
	                }
	                else {
	                    reporter.warn('An lang attribute must be present on <html> elements.', event.line, col, _this, event.raw);
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
	    init: function (parser, reporter) {
	        var _this = this;
	        parser.addListener('tagstart', function (event) {
	            var attrs = event.attrs;
	            var attr;
	            var attrName;
	            var col = event.col + event.tagName.length + 1;
	            for (var i = 0, l = attrs.length; i < l; i++) {
	                attr = attrs[i];
	                attrName = attr.name;
	                if (/^(id|class)$/i.test(attrName)) {
	                    if (/(^|[-_])ad([-_]|$)/i.test(attr.value)) {
	                        reporter.warn("The value of attribute ".concat(attrName, " cannot use the ad keyword."), event.line, col + attr.index, _this, attr.raw);
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
	    init: function (parser, reporter, options) {
	        var _this = this;
	        var arrRules = {
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
	        var rule;
	        if (typeof options === 'string') {
	            rule = arrRules[options];
	        }
	        else {
	            rule = options;
	        }
	        if (typeof rule === 'object' && rule.regId) {
	            var regId_1 = rule.regId;
	            var message_1 = rule.message;
	            if (!(regId_1 instanceof RegExp)) {
	                regId_1 = new RegExp(regId_1);
	            }
	            parser.addListener('tagstart', function (event) {
	                var attrs = event.attrs;
	                var attr;
	                var col = event.col + event.tagName.length + 1;
	                for (var i = 0, l1 = attrs.length; i < l1; i++) {
	                    attr = attrs[i];
	                    if (attr.name.toLowerCase() === 'id') {
	                        if (regId_1.test(attr.value) === false) {
	                            reporter.warn(message_1, event.line, col + attr.index, _this, attr.raw);
	                        }
	                    }
	                    if (attr.name.toLowerCase() === 'class') {
	                        var arrClass = attr.value.split(/\s+/g);
	                        var classValue = void 0;
	                        for (var j = 0, l2 = arrClass.length; j < l2; j++) {
	                            classValue = arrClass[j];
	                            if (classValue && regId_1.test(classValue) === false) {
	                                reporter.warn(message_1, event.line, col + attr.index, _this, classValue);
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
	    init: function (parser, reporter) {
	        var _this = this;
	        var mapIdCount = {};
	        parser.addListener('tagstart', function (event) {
	            var attrs = event.attrs;
	            var attr;
	            var id;
	            var col = event.col + event.tagName.length + 1;
	            for (var i = 0, l = attrs.length; i < l; i++) {
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
	                            reporter.error("The id value [ ".concat(id, " ] must be unique."), event.line, col + attr.index, _this, attr.raw);
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
	    init: function (parser, reporter) {
	        var _this = this;
	        parser.addListener('tagstart', function (event) {
	            var attrs = event.attrs;
	            var attr;
	            var col = event.col + event.tagName.length + 1;
	            var attrName;
	            var reEvent = /^on(unload|message|submit|select|scroll|resize|mouseover|mouseout|mousemove|mouseleave|mouseenter|mousedown|load|keyup|keypress|keydown|focus|dblclick|click|change|blur|error)$/i;
	            for (var i = 0, l = attrs.length; i < l; i++) {
	                attr = attrs[i];
	                attrName = attr.name.toLowerCase();
	                if (reEvent.test(attrName) === true) {
	                    reporter.warn("Inline script [ ".concat(attr.raw, " ] cannot be used."), event.line, col + attr.index, _this, attr.raw);
	                }
	                else if (attrName === 'src' || attrName === 'href') {
	                    if (/^\s*javascript:/i.test(attr.value)) {
	                        reporter.warn("Inline script [ ".concat(attr.raw, " ] cannot be used."), event.line, col + attr.index, _this, attr.raw);
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
	    init: function (parser, reporter) {
	        var _this = this;
	        parser.addListener('tagstart', function (event) {
	            var attrs = event.attrs;
	            var attr;
	            var col = event.col + event.tagName.length + 1;
	            for (var i = 0, l = attrs.length; i < l; i++) {
	                attr = attrs[i];
	                if (attr.name.toLowerCase() === 'style') {
	                    reporter.warn("Inline style [ ".concat(attr.raw, " ] cannot be used."), event.line, col + attr.index, _this, attr.raw);
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
	    init: function (parser, reporter) {
	        var _this = this;
	        var labelTags = [];
	        var inputTags = [];
	        parser.addListener('tagstart', function (event) {
	            var tagName = event.tagName.toLowerCase();
	            var mapAttrs = parser.getMapAttrs(event.attrs);
	            var col = event.col + tagName.length + 1;
	            if (tagName === 'input') {
	                inputTags.push({ event: event, col: col, id: mapAttrs['id'] });
	            }
	            if (tagName === 'label') {
	                if ('for' in mapAttrs && mapAttrs['for'] !== '') {
	                    labelTags.push({ event: event, col: col, forValue: mapAttrs['for'] });
	                }
	            }
	        });
	        parser.addListener('end', function () {
	            inputTags.forEach(function (inputTag) {
	                if (!hasMatchingLabelTag(inputTag)) {
	                    reporter.warn('No matching [ label ] tag found.', inputTag.event.line, inputTag.col, _this, inputTag.event.raw);
	                }
	            });
	        });
	        function hasMatchingLabelTag(inputTag) {
	            var found = false;
	            labelTags.forEach(function (labelTag) {
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
	    init: function (parser, reporter) {
	        var _this = this;
	        parser.addListener('tagstart', function (event) {
	            if (event.tagName.toLowerCase() === 'script') {
	                reporter.error('The <script> tag cannot be used.', event.line, event.col, _this, event.raw);
	            }
	        });
	    },
	};

	var spaceTabMixedDisabled = {};

	Object.defineProperty(spaceTabMixedDisabled, "__esModule", { value: true });
	spaceTabMixedDisabled.default = {
	    id: 'space-tab-mixed-disabled',
	    description: 'Do not mix tabs and spaces for indentation.',
	    init: function (parser, reporter, options) {
	        var _this = this;
	        var indentMode = 'nomix';
	        var spaceLengthRequire = null;
	        if (typeof options === 'string') {
	            var match = /^([a-z]+)(\d+)?/.exec(options);
	            if (match) {
	                indentMode = match[1];
	                spaceLengthRequire = match[2] && parseInt(match[2], 10);
	            }
	        }
	        parser.addListener('text', function (event) {
	            var raw = event.raw;
	            var reMixed = /(^|\r?\n)([ \t]+)/g;
	            var match;
	            while ((match = reMixed.exec(raw))) {
	                var fixedPos = parser.fixPos(event, match.index + match[1].length);
	                if (fixedPos.col !== 1) {
	                    continue;
	                }
	                var whiteSpace = match[2];
	                if (indentMode === 'space') {
	                    if (spaceLengthRequire) {
	                        if (/^ +$/.test(whiteSpace) === false ||
	                            whiteSpace.length % spaceLengthRequire !== 0) {
	                            reporter.warn("Please use space for indentation and keep ".concat(spaceLengthRequire, " length."), fixedPos.line, 1, _this, event.raw);
	                        }
	                    }
	                    else {
	                        if (/^ +$/.test(whiteSpace) === false) {
	                            reporter.warn('Please use space for indentation.', fixedPos.line, 1, _this, event.raw);
	                        }
	                    }
	                }
	                else if (indentMode === 'tab' && /^\t+$/.test(whiteSpace) === false) {
	                    reporter.warn('Please use tab for indentation.', fixedPos.line, 1, _this, event.raw);
	                }
	                else if (/ +\t|\t+ /.test(whiteSpace) === true) {
	                    reporter.warn('Do not mix tabs and spaces for indentation.', fixedPos.line, 1, _this, event.raw);
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
	    init: function (parser, reporter) {
	        var _this = this;
	        parser.addListener('text', function (event) {
	            var raw = event.raw;
	            var reSpecChar = /([<>])|( \& )/g;
	            var match;
	            while ((match = reSpecChar.exec(raw))) {
	                var fixedPos = parser.fixPos(event, match.index);
	                reporter.error("Special characters must be escaped : [ ".concat(match[0], " ]."), fixedPos.line, fixedPos.col, _this, event.raw);
	            }
	        });
	    },
	};

	var srcNotEmpty = {};

	Object.defineProperty(srcNotEmpty, "__esModule", { value: true });
	srcNotEmpty.default = {
	    id: 'src-not-empty',
	    description: 'The src attribute of an img(script,link) must have a value.',
	    init: function (parser, reporter) {
	        var _this = this;
	        parser.addListener('tagstart', function (event) {
	            var tagName = event.tagName;
	            var attrs = event.attrs;
	            var attr;
	            var col = event.col + tagName.length + 1;
	            for (var i = 0, l = attrs.length; i < l; i++) {
	                attr = attrs[i];
	                if (((/^(img|script|embed|bgsound|iframe)$/.test(tagName) === true &&
	                    attr.name === 'src') ||
	                    (tagName === 'link' && attr.name === 'href') ||
	                    (tagName === 'object' && attr.name === 'data')) &&
	                    attr.value === '') {
	                    reporter.error("The attribute [ ".concat(attr.name, " ] of the tag [ ").concat(tagName, " ] must have a value."), event.line, col + attr.index, _this, attr.raw);
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
	    init: function (parser, reporter) {
	        var _this = this;
	        parser.addListener('tagstart', function (event) {
	            if (event.tagName.toLowerCase() === 'style') {
	                reporter.warn('The <style> tag cannot be used.', event.line, event.col, _this, event.raw);
	            }
	        });
	    },
	};

	var tagPair = {};

	Object.defineProperty(tagPair, "__esModule", { value: true });
	tagPair.default = {
	    id: 'tag-pair',
	    description: 'Tag must be paired.',
	    init: function (parser, reporter) {
	        var _this = this;
	        var stack = [];
	        var mapEmptyTags = parser.makeMap('area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed,track,command,source,keygen,wbr');
	        parser.addListener('tagstart', function (event) {
	            var tagName = event.tagName.toLowerCase();
	            if (mapEmptyTags[tagName] === undefined && !event.close) {
	                stack.push({
	                    tagName: tagName,
	                    line: event.line,
	                    raw: event.raw,
	                });
	            }
	        });
	        parser.addListener('tagend', function (event) {
	            var tagName = event.tagName.toLowerCase();
	            var pos;
	            for (pos = stack.length - 1; pos >= 0; pos--) {
	                if (stack[pos].tagName === tagName) {
	                    break;
	                }
	            }
	            if (pos >= 0) {
	                var arrTags = [];
	                for (var i = stack.length - 1; i > pos; i--) {
	                    arrTags.push("</".concat(stack[i].tagName, ">"));
	                }
	                if (arrTags.length > 0) {
	                    var lastEvent = stack[stack.length - 1];
	                    reporter.error("Tag must be paired, missing: [ ".concat(arrTags.join(''), " ], start tag match failed [ ").concat(lastEvent.raw, " ] on line ").concat(lastEvent.line, "."), event.line, event.col, _this, event.raw);
	                }
	                stack.length = pos;
	            }
	            else {
	                reporter.error("Tag must be paired, no start tag: [ ".concat(event.raw, " ]"), event.line, event.col, _this, event.raw);
	            }
	        });
	        parser.addListener('end', function (event) {
	            var arrTags = [];
	            for (var i = stack.length - 1; i >= 0; i--) {
	                arrTags.push("</".concat(stack[i].tagName, ">"));
	            }
	            if (arrTags.length > 0) {
	                var lastEvent = stack[stack.length - 1];
	                reporter.error("Tag must be paired, missing: [ ".concat(arrTags.join(''), " ], open tag match failed [ ").concat(lastEvent.raw, " ] on line ").concat(lastEvent.line, "."), event.line, event.col, _this, '');
	            }
	        });
	    },
	};

	var tagSelfClose = {};

	Object.defineProperty(tagSelfClose, "__esModule", { value: true });
	tagSelfClose.default = {
	    id: 'tag-self-close',
	    description: 'Empty tags must be self closed.',
	    init: function (parser, reporter) {
	        var _this = this;
	        var mapEmptyTags = parser.makeMap('area,base,basefont,bgsound,br,col,frame,hr,img,input,isindex,link,meta,param,embed,track,command,source,keygen,wbr');
	        parser.addListener('tagstart', function (event) {
	            var tagName = event.tagName.toLowerCase();
	            if (mapEmptyTags[tagName] !== undefined) {
	                if (!event.close) {
	                    reporter.warn("The empty tag : [ ".concat(tagName, " ] must be self closed."), event.line, event.col, _this, event.raw);
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
	    init: function (parser, reporter) {
	        var _this = this;
	        var mapEmptyTags = parser.makeMap('area,base,basefont,bgsound,br,col,frame,hr,img,input,isindex,link,meta,param,embed,track,command,source,keygen,wbr');
	        parser.addListener('tagstart', function (event) {
	            var tagName = event.tagName.toLowerCase();
	            if (mapEmptyTags[tagName] !== undefined) {
	                if (event.close) {
	                    reporter.error("The empty tag : [ ".concat(tagName, " ] must not use self closed syntax."), event.line, event.col, _this, event.raw);
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
	    init: function (parser, reporter, options) {
	        var _this = this;
	        var exceptions = Array.isArray(options)
	            ? options
	            : [];
	        parser.addListener('tagstart,tagend', function (event) {
	            var tagName = event.tagName;
	            if (exceptions.indexOf(tagName) === -1 &&
	                tagName !== tagName.toLowerCase()) {
	                reporter.error("The html element name of [ ".concat(tagName, " ] must be in lowercase."), event.line, event.col, _this, event.raw);
	            }
	        });
	    },
	};

	var tagnameSpecialchars = {};

	Object.defineProperty(tagnameSpecialchars, "__esModule", { value: true });
	tagnameSpecialchars.default = {
	    id: 'tagname-specialchars',
	    description: 'All special characters must be escaped.',
	    init: function (parser, reporter) {
	        var _this = this;
	        var specialchars = /[^a-zA-Z0-9\-:_]/;
	        parser.addListener('tagstart,tagend', function (event) {
	            var tagName = event.tagName;
	            if (specialchars.test(tagName)) {
	                reporter.error("The html element name of [ ".concat(tagName, " ] contains special character."), event.line, event.col, _this, event.raw);
	            }
	        });
	    },
	};

	var titleRequire = {};

	Object.defineProperty(titleRequire, "__esModule", { value: true });
	titleRequire.default = {
	    id: 'title-require',
	    description: '<title> must be present in <head> tag.',
	    init: function (parser, reporter) {
	        var _this = this;
	        var headBegin = false;
	        var hasTitle = false;
	        var onTagStart = function (event) {
	            var tagName = event.tagName.toLowerCase();
	            if (tagName === 'head') {
	                headBegin = true;
	            }
	            else if (tagName === 'title' && headBegin) {
	                hasTitle = true;
	            }
	        };
	        var onTagEnd = function (event) {
	            var tagName = event.tagName.toLowerCase();
	            if (hasTitle && tagName === 'title') {
	                var lastEvent = event.lastEvent;
	                if (lastEvent.type !== 'text' ||
	                    (lastEvent.type === 'text' && /^\s*$/.test(lastEvent.raw) === true)) {
	                    reporter.error('<title></title> must not be empty.', event.line, event.col, _this, event.raw);
	                }
	            }
	            else if (tagName === 'head') {
	                if (hasTitle === false) {
	                    reporter.error('<title> must be present in <head> tag.', event.line, event.col, _this, event.raw);
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

	var __assign = (commonjsGlobal && commonjsGlobal.__assign) || function () {
	    __assign = Object.assign || function(t) {
	        for (var s, i = 1, n = arguments.length; i < n; i++) {
	            s = arguments[i];
	            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
	                t[p] = s[p];
	        }
	        return t;
	    };
	    return __assign.apply(this, arguments);
	};
	Object.defineProperty(tagsCheck, "__esModule", { value: true });
	var tagsTypings = {
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
	    init: function (parser, reporter, options) {
	        var _this = this;
	        tagsTypings = __assign(__assign({}, tagsTypings), options);
	        parser.addListener('tagstart', function (event) {
	            var attrs = event.attrs;
	            var col = event.col + event.tagName.length + 1;
	            var tagName = event.tagName.toLowerCase();
	            if (tagsTypings[tagName]) {
	                var currentTagType = tagsTypings[tagName];
	                if (currentTagType.selfclosing === true && !event.close) {
	                    reporter.warn("The <".concat(tagName, "> tag must be selfclosing."), event.line, event.col, _this, event.raw);
	                }
	                else if (currentTagType.selfclosing === false && event.close) {
	                    reporter.warn("The <".concat(tagName, "> tag must not be selfclosing."), event.line, event.col, _this, event.raw);
	                }
	                if (Array.isArray(currentTagType.attrsRequired)) {
	                    var attrsRequired = currentTagType.attrsRequired;
	                    attrsRequired.forEach(function (id) {
	                        if (Array.isArray(id)) {
	                            var copyOfId = id.map(function (a) { return a; });
	                            var realID_1 = copyOfId.shift();
	                            var values_1 = copyOfId;
	                            if (attrs.some(function (attr) { return attr.name === realID_1; })) {
	                                attrs.forEach(function (attr) {
	                                    if (attr.name === realID_1 &&
	                                        values_1.indexOf(attr.value) === -1) {
	                                        reporter.error("The <".concat(tagName, "> tag must have attr '").concat(realID_1, "' with one value of '").concat(values_1.join("' or '"), "'."), event.line, col, _this, event.raw);
	                                    }
	                                });
	                            }
	                            else {
	                                reporter.error("The <".concat(tagName, "> tag must have attr '").concat(realID_1, "'."), event.line, col, _this, event.raw);
	                            }
	                        }
	                        else if (!attrs.some(function (attr) { return id.split('|').indexOf(attr.name) !== -1; })) {
	                            reporter.error("The <".concat(tagName, "> tag must have attr '").concat(id, "'."), event.line, col, _this, event.raw);
	                        }
	                    });
	                }
	                if (Array.isArray(currentTagType.attrsOptional)) {
	                    var attrsOptional = currentTagType.attrsOptional;
	                    attrsOptional.forEach(function (id) {
	                        if (Array.isArray(id)) {
	                            var copyOfId = id.map(function (a) { return a; });
	                            var realID_2 = copyOfId.shift();
	                            var values_2 = copyOfId;
	                            if (attrs.some(function (attr) { return attr.name === realID_2; })) {
	                                attrs.forEach(function (attr) {
	                                    if (attr.name === realID_2 &&
	                                        values_2.indexOf(attr.value) === -1) {
	                                        reporter.error("The <".concat(tagName, "> tag must have optional attr '").concat(realID_2, "' with one value of '").concat(values_2.join("' or '"), "'."), event.line, col, _this, event.raw);
	                                    }
	                                });
	                            }
	                        }
	                    });
	                }
	                if (Array.isArray(currentTagType.redundantAttrs)) {
	                    var redundantAttrs = currentTagType.redundantAttrs;
	                    redundantAttrs.forEach(function (attrName) {
	                        if (attrs.some(function (attr) { return attr.name === attrName; })) {
	                            reporter.error("The attr '".concat(attrName, "' is redundant for <").concat(tagName, "> and should be omitted."), event.line, col, _this, event.raw);
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
	    init: function (parser, reporter, options) {
	        var _this = this;
	        var exceptions = Array.isArray(options) ? options : [];
	        parser.addListener('tagstart', function (event) {
	            var attrs = event.attrs;
	            var col = event.col + event.tagName.length + 1;
	            for (var i = 0; i < attrs.length; i++) {
	                if (exceptions.indexOf(attrs[i].name) === -1) {
	                    var match = /(\s*)=(\s*)/.exec(attrs[i].raw.trim());
	                    if (match && (match[1].length !== 0 || match[2].length !== 0)) {
	                        reporter.error("The attribute '".concat(attrs[i].name, "' must not have spaces between the name and value."), event.line, col + attrs[i].index, _this, attrs[i].raw);
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
	var htmlparser_1 = htmlparser;
	exports.HTMLParser = htmlparser_1.default;
	var reporter_1 = reporter;
	exports.Reporter = reporter_1.default;
	var HTMLRules = rules;
	exports.HTMLRules = HTMLRules;
	var HTMLHintCore = (function () {
	    function HTMLHintCore() {
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
	    HTMLHintCore.prototype.addRule = function (rule) {
	        this.rules[rule.id] = rule;
	    };
	    HTMLHintCore.prototype.verify = function (html, ruleset) {
	        if (ruleset === void 0) { ruleset = this.defaultRuleset; }
	        if (Object.keys(ruleset).length === 0) {
	            ruleset = this.defaultRuleset;
	        }
	        html = html.replace(/^\s*<!--\s*htmlhint\s+([^\r\n]+?)\s*-->/i, function (all, strRuleset) {
	            strRuleset.replace(/(?:^|,)\s*([^:,]+)\s*(?:\:\s*([^,\s]+))?/g, function (all, ruleId, value) {
	                ruleset[ruleId] =
	                    value !== undefined && value.length > 0 ? JSON.parse(value) : true;
	                return '';
	            });
	            return '';
	        });
	        var parser = new htmlparser_1.default();
	        var reporter = new reporter_1.default(html, ruleset);
	        var rules = this.rules;
	        var rule;
	        for (var id in ruleset) {
	            rule = rules[id];
	            if (rule !== undefined && ruleset[id] !== false) {
	                rule.init(parser, reporter, ruleset[id]);
	            }
	        }
	        parser.parse(html);
	        return reporter.messages;
	    };
	    HTMLHintCore.prototype.format = function (arrMessages, options) {
	        if (options === void 0) { options = {}; }
	        var arrLogs = [];
	        var colors = {
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
	        var indent = options.indent || 0;
	        arrMessages.forEach(function (hint) {
	            var leftWindow = 40;
	            var rightWindow = leftWindow + 20;
	            var evidence = hint.evidence;
	            var line = hint.line;
	            var col = hint.col;
	            var evidenceCount = evidence.length;
	            var leftCol = col > leftWindow + 1 ? col - leftWindow : 1;
	            var rightCol = evidence.length > col + rightWindow ? col + rightWindow : evidenceCount;
	            if (col < leftWindow + 1) {
	                rightCol += leftWindow - col + 1;
	            }
	            evidence = evidence.replace(/\t/g, ' ').substring(leftCol - 1, rightCol);
	            if (leftCol > 1) {
	                evidence = "...".concat(evidence);
	                leftCol -= 3;
	            }
	            if (rightCol < evidenceCount) {
	                evidence += '...';
	            }
	            arrLogs.push("".concat(colors.white + repeatStr(indent), "L").concat(line, " |").concat(colors.grey).concat(evidence).concat(colors.reset));
	            var pointCol = col - leftCol;
	            var match = evidence.substring(0, pointCol).match(/[^\u0000-\u00ff]/g);
	            if (match !== null) {
	                pointCol += match.length;
	            }
	            arrLogs.push("".concat(colors.white +
	                repeatStr(indent) +
	                repeatStr(String(line).length + 3 + pointCol), "^ ").concat(colors.red).concat(hint.message, " (").concat(hint.rule.id, ")").concat(colors.reset));
	        });
	        return arrLogs;
	    };
	    return HTMLHintCore;
	}());
	function repeatStr(n, str) {
	    return new Array(n + 1).join(str || ' ');
	}
	exports.HTMLHint = new HTMLHintCore();
	Object.keys(HTMLRules).forEach(function (key) {
	    exports.HTMLHint.addRule(HTMLRules[key]);
	});

	}(core$1));

	var core = /*@__PURE__*/getDefaultExportFromCjs(core$1);

	return core;

}));
