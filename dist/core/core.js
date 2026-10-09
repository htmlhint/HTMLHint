"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTMLParser = exports.Reporter = exports.HTMLRules = exports.HTMLHint = void 0;
const htmlparser_1 = __importDefault(require("./htmlparser"));
exports.HTMLParser = htmlparser_1.default;
const reporter_1 = __importDefault(require("./reporter"));
exports.Reporter = reporter_1.default;
const HTMLRules = __importStar(require("./rules"));
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
        ruleset = { ...ruleset };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb3JlL2NvcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOERBQXFDO0FBcVJQLHFCQXJSdkIsb0JBQVUsQ0FxUnVCO0FBcFJ4QywwREFBaUM7QUFvUmIsbUJBcFJiLGtCQUFRLENBb1JhO0FBblI1QixtREFBb0M7QUFtUjNCLDhCQUFTO0FBM1FsQixNQUFNLFlBQVk7SUFBbEI7UUFDUyxVQUFLLEdBQTJCLEVBQUUsQ0FBQTtRQUN6QixtQkFBYyxHQUFZO1lBQ3hDLG1CQUFtQixFQUFFLElBQUk7WUFDekIsZ0JBQWdCLEVBQUUsSUFBSTtZQUN0QiwwQkFBMEIsRUFBRSxJQUFJO1lBQ2hDLGVBQWUsRUFBRSxJQUFJO1lBQ3JCLFVBQVUsRUFBRSxJQUFJO1lBQ2hCLGtCQUFrQixFQUFFLElBQUk7WUFDeEIsV0FBVyxFQUFFLElBQUk7WUFDakIsZUFBZSxFQUFFLElBQUk7WUFDckIscUJBQXFCLEVBQUUsSUFBSTtZQUMzQixlQUFlLEVBQUUsSUFBSTtTQUN0QixDQUFBO0lBaVBILENBQUM7SUEvT1EsT0FBTyxDQUFDLElBQVU7UUFDdkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFBO0lBQzVCLENBQUM7SUFFTSxNQUFNLENBQUMsSUFBWSxFQUFFLFVBQW1CLElBQUksQ0FBQyxjQUFjO1FBQ2hFLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDdEMsT0FBTyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUE7UUFDL0IsQ0FBQztRQUlELE9BQU8sR0FBRyxFQUFFLEdBQUcsT0FBTyxFQUFFLENBQUE7UUFHeEIsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQ2pCLDBDQUEwQyxF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