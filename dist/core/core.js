"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTMLParser = exports.Reporter = exports.HTMLRules = exports.HTMLHint = void 0;
const htmlparser_1 = require("./htmlparser");
exports.HTMLParser = htmlparser_1.default;
const reporter_1 = require("./reporter");
exports.Reporter = reporter_1.default;
const HTMLRules = require("./rules");
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
        const disabledRulesMap = this.parseDisableComments(html);
        const parser = new htmlparser_1.default();
        const reporter = new reporter_1.default(html, ruleset, disabledRulesMap);
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
    parseDisableComments(html) {
        var _a;
        const disabledRulesMap = {};
        const lines = html.split(/\r?\n/);
        const regComment = /<!--\s*htmlhint-(disable|enable)(?:-next-line)?(?:\s+([^\r\n]+?))?\s*-->/gi;
        const comments = [];
        let match;
        while ((match = regComment.exec(html)) !== null) {
            const beforeMatch = html.substring(0, match.index);
            const lineNumber = beforeMatch.split(/\r?\n/).length;
            const command = match[1].toLowerCase();
            const isNextLine = match[0].includes('-next-line');
            const rulesStr = (_a = match[2]) === null || _a === void 0 ? void 0 : _a.trim();
            comments.push({
                line: lineNumber,
                command,
                isNextLine,
                rulesStr,
            });
        }
        let currentDisabledRules = null;
        let isAllDisabled = false;
        for (let i = 0; i < lines.length; i++) {
            const line = i + 1;
            const commentOnLine = comments.find((c) => c.line === line);
            if (commentOnLine) {
                if (commentOnLine.command === 'disable') {
                    if (commentOnLine.isNextLine) {
                        const nextLine = line + 1;
                        if (commentOnLine.rulesStr) {
                            const rules = commentOnLine.rulesStr
                                .split(/\s+/)
                                .filter((r) => r.length > 0);
                            if (!disabledRulesMap[nextLine]) {
                                disabledRulesMap[nextLine] = {};
                            }
                            if (!disabledRulesMap[nextLine].rules) {
                                disabledRulesMap[nextLine].rules = new Set();
                            }
                            rules.forEach((r) => disabledRulesMap[nextLine].rules.add(r));
                        }
                        else {
                            if (!disabledRulesMap[nextLine]) {
                                disabledRulesMap[nextLine] = {};
                            }
                            disabledRulesMap[nextLine].all = true;
                        }
                    }
                    else {
                        if (commentOnLine.rulesStr) {
                            const rules = commentOnLine.rulesStr
                                .split(/\s+/)
                                .filter((r) => r.length > 0);
                            currentDisabledRules = new Set(rules);
                            isAllDisabled = false;
                        }
                        else {
                            currentDisabledRules = null;
                            isAllDisabled = true;
                        }
                    }
                }
                else if (commentOnLine.command === 'enable') {
                    currentDisabledRules = null;
                    isAllDisabled = false;
                }
            }
            if (currentDisabledRules !== null || isAllDisabled) {
                if (!disabledRulesMap[line]) {
                    disabledRulesMap[line] = {};
                }
                if (isAllDisabled && disabledRulesMap[line].all !== true) {
                    disabledRulesMap[line].all = true;
                }
                else if (currentDisabledRules) {
                    if (!disabledRulesMap[line].rules) {
                        disabledRulesMap[line].rules = new Set();
                    }
                    currentDisabledRules.forEach((r) => disabledRulesMap[line].rules.add(r));
                }
            }
        }
        return disabledRulesMap;
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
Object.values(HTMLRules).forEach((rule) => {
    exports.HTMLHint.addRule(rule);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb3JlL2NvcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNkNBQXFDO0FBaVJQLHFCQWpSdkIsb0JBQVUsQ0FpUnVCO0FBaFJ4Qyx5Q0FBaUM7QUFnUmIsbUJBaFJiLGtCQUFRLENBZ1JhO0FBL1E1QixxQ0FBb0M7QUErUTNCLDhCQUFTO0FBdlFsQixNQUFNLFlBQVk7SUFBbEI7UUFDUyxVQUFLLEdBQTJCLEVBQUUsQ0FBQTtRQUN6QixtQkFBYyxHQUFZO1lBQ3hDLG1CQUFtQixFQUFFLElBQUk7WUFDekIsZ0JBQWdCLEVBQUUsSUFBSTtZQUN0QiwwQkFBMEIsRUFBRSxJQUFJO1lBQ2hDLGVBQWUsRUFBRSxJQUFJO1lBQ3JCLFVBQVUsRUFBRSxJQUFJO1lBQ2hCLGtCQUFrQixFQUFFLElBQUk7WUFDeEIsV0FBVyxFQUFFLElBQUk7WUFDakIsZUFBZSxFQUFFLElBQUk7WUFDckIscUJBQXFCLEVBQUUsSUFBSTtZQUMzQixlQUFlLEVBQUUsSUFBSTtTQUN0QixDQUFBO0lBNk9ILENBQUM7SUEzT1EsT0FBTyxDQUFDLElBQVU7UUFDdkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFBO0lBQzVCLENBQUM7SUFFTSxNQUFNLENBQUMsSUFBWSxFQUFFLFVBQW1CLElBQUksQ0FBQyxjQUFjO1FBQ2hFLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDdEMsT0FBTyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUE7UUFDL0IsQ0FBQztRQUdELElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUNqQiwwQ0FBMEMsRUFDMUMsQ0FBQyxHQUFHLEVBQUUsVUFBa0IsRUFBRSxFQUFFO1lBSTFCLFVBQVUsQ0FBQyxPQUFPLENBQ2hCLDJDQUEyQyxFQUMzQyxD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