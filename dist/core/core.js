"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTMLParser = exports.Reporter = exports.HTMLRules = exports.HTMLHint = void 0;
var htmlparser_1 = require("./htmlparser");
exports.HTMLParser = htmlparser_1.default;
var reporter_1 = require("./reporter");
exports.Reporter = reporter_1.default;
var HTMLRules = require("./rules");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb3JlL2NvcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkNBQXFDO0FBb0tQLHFCQXBLdkIsb0JBQVUsQ0FvS3VCO0FBbkt4Qyx1Q0FBaUM7QUFtS2IsbUJBbktiLGtCQUFRLENBbUthO0FBbEs1QixtQ0FBb0M7QUFrSzNCLDhCQUFTO0FBMUpsQjtJQUFBO1FBQ1MsVUFBSyxHQUEyQixFQUFFLENBQUE7UUFDekIsbUJBQWMsR0FBWTtZQUN4QyxtQkFBbUIsRUFBRSxJQUFJO1lBQ3pCLGdCQUFnQixFQUFFLElBQUk7WUFDdEIsMEJBQTBCLEVBQUUsSUFBSTtZQUNoQyxlQUFlLEVBQUUsSUFBSTtZQUNyQixVQUFVLEVBQUUsSUFBSTtZQUNoQixrQkFBa0IsRUFBRSxJQUFJO1lBQ3hCLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLGVBQWUsRUFBRSxJQUFJO1lBQ3JCLHFCQUFxQixFQUFFLElBQUk7WUFDM0IsZUFBZSxFQUFFLElBQUk7U0FDdEIsQ0FBQTtJQThISCxDQUFDO0lBNUhRLDhCQUFPLEdBQWQsVUFBZSxJQUFVO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQTtJQUM1QixDQUFDO0lBRU0sNkJBQU0sR0FBYixVQUFjLElBQVksRUFBRSxPQUFzQztRQUF0Qyx3QkFBQSxFQUFBLFVBQW1CLElBQUksQ0FBQyxjQUFjO1FBQ2hFLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ3JDLE9BQU8sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFBO1NBQzlCO1FBR0QsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQ2pCLDBDQUEwQyxFQUMxQyxVQUFDLEdBQUcsRUFBRSxVQUFrQjtZQUl0QixVQUFVLENBQUMsT0FBTyxDQUNoQiwyQ0FBMkMsRUFD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