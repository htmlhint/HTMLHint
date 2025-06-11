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
Object.values(HTMLRules).forEach((rule) => {
    exports.HTMLHint.addRule(rule);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb3JlL2NvcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNkNBQXFDO0FBa0tQLHFCQWxLdkIsb0JBQVUsQ0FrS3VCO0FBakt4Qyx5Q0FBaUM7QUFpS2IsbUJBaktiLGtCQUFRLENBaUthO0FBaEs1QixxQ0FBb0M7QUFnSzNCLDhCQUFTO0FBeEpsQixNQUFNLFlBQVk7SUFBbEI7UUFDUyxVQUFLLEdBQTJCLEVBQUUsQ0FBQTtRQUN6QixtQkFBYyxHQUFZO1lBQ3hDLG1CQUFtQixFQUFFLElBQUk7WUFDekIsZ0JBQWdCLEVBQUUsSUFBSTtZQUN0QiwwQkFBMEIsRUFBRSxJQUFJO1lBQ2hDLGVBQWUsRUFBRSxJQUFJO1lBQ3JCLFVBQVUsRUFBRSxJQUFJO1lBQ2hCLGtCQUFrQixFQUFFLElBQUk7WUFDeEIsV0FBVyxFQUFFLElBQUk7WUFDakIsZUFBZSxFQUFFLElBQUk7WUFDckIscUJBQXFCLEVBQUUsSUFBSTtZQUMzQixlQUFlLEVBQUUsSUFBSTtTQUN0QixDQUFBO0lBOEhILENBQUM7SUE1SFEsT0FBTyxDQUFDLElBQVU7UUFDdkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFBO0lBQzVCLENBQUM7SUFFTSxNQUFNLENBQUMsSUFBWSxFQUFFLFVBQW1CLElBQUksQ0FBQyxjQUFjO1FBQ2hFLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDdEMsT0FBTyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUE7UUFDL0IsQ0FBQztRQUdELElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUNqQiwwQ0FBMEMsRUFDMUMsQ0FBQyxHQUFHLEVBQUUsVUFBa0IsRUFBRSxFQUFFO1lBSTFCLFVBQVUsQ0FBQyxPQUFPLENBQ2hCLDJDQUEyQyxFQUMzQyxD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