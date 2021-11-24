"use strict";
var __assign = (this && this.__assign) || function () {
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
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = {
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
                    reporter.warn("The <" + tagName + "> tag must be selfclosing.", event.line, event.col, _this, event.raw);
                }
                else if (currentTagType.selfclosing === false && event.close) {
                    reporter.warn("The <" + tagName + "> tag must not be selfclosing.", event.line, event.col, _this, event.raw);
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
                                        reporter.error("The <" + tagName + "> tag must have attr '" + realID_1 + "' with one value of '" + values_1.join("' or '") + "'.", event.line, col, _this, event.raw);
                                    }
                                });
                            }
                            else {
                                reporter.error("The <" + tagName + "> tag must have attr '" + realID_1 + "'.", event.line, col, _this, event.raw);
                            }
                        }
                        else if (!attrs.some(function (attr) { return id.split('|').indexOf(attr.name) !== -1; })) {
                            reporter.error("The <" + tagName + "> tag must have attr '" + id + "'.", event.line, col, _this, event.raw);
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
                                        reporter.error("The <" + tagName + "> tag must have optional attr '" + realID_2 + "' with one value of '" + values_2.join("' or '") + "'.", event.line, col, _this, event.raw);
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
                            reporter.error("The attr '" + attrName + "' is redundant for <" + tagName + "> and should be omitted.", event.line, col, _this, event.raw);
                        }
                    });
                }
            }
        });
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFncy1jaGVjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb3JlL3J1bGVzL3RhZ3MtY2hlY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUVBLElBQUksV0FBVyxHQUE0QztJQUN6RCxDQUFDLEVBQUU7UUFDRCxXQUFXLEVBQUUsS0FBSztRQUNsQixhQUFhLEVBQUUsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDO1FBQ2hDLGNBQWMsRUFBRSxDQUFDLEtBQUssQ0FBQztLQUN4QjtJQUNELEdBQUcsRUFBRTtRQUNILFdBQVcsRUFBRSxLQUFLO0tBQ25CO0lBQ0QsSUFBSSxFQUFFO1FBQ0osV0FBVyxFQUFFLEtBQUs7UUFDbEIsY0FBYyxFQUFFLENBQUMsTUFBTSxDQUFDO0tBQ3pCO0lBQ0QsR0FBRyxFQUFFO1FBQ0gsV0FBVyxFQUFFLEtBQUs7UUFDbEIsY0FBYyxFQUFFLENBQUMsTUFBTSxDQUFDO0tBQ3pCO0lBQ0QsTUFBTSxFQUFFO1FBQ04sYUFBYSxFQUFFO1lBQ2IsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDO1lBQ2xCLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQztTQUNuQjtLQUNGO0lBQ0QsR0FBRyxFQUFFO1FBQ0gsV0FBVyxFQUFFLElBQUk7UUFDakIsYUFBYSxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUM7S0FDdkM7Q0FDRixDQUFBO0FBRUQsa0JBQWU7SUFDYixFQUFFLEVBQUUsWUFBWTtJQUNoQixXQUFXLEVBQUUsbUJBQW1CO0lBQ2hDLElBQUksRUFBSixVQUFLLE1BQU0sRUFBRSxRQUFRLEVBQUUsT0FBZ0Q7UUFBdkUsaUJBNkhDO1FBNUhDLFdBQVcseUJBQVEsV0FBVyxHQUFLLE9BQU8sQ0FBRSxDQUFBO1FBRTVDLE1BQU0sQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLFVBQUMsS0FBSztZQUNuQyxJQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsS0FB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