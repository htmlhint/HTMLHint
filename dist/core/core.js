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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb3JlL2NvcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4REFBcUM7QUFvS1AscUJBcEt2QixvQkFBVSxDQW9LdUI7QUFuS3hDLDBEQUFpQztBQW1LYixtQkFuS2Isa0JBQVEsQ0FtS2E7QUFsSzVCLG1EQUFvQztBQWtLM0IsOEJBQVM7QUExSmxCLE1BQU0sWUFBWTtJQUFsQjtRQUNTLFVBQUssR0FBMkIsRUFBRSxDQUFBO1FBQ3pCLG1CQUFjLEdBQVk7WUFDeEMsbUJBQW1CLEVBQUUsSUFBSTtZQUN6QixnQkFBZ0IsRUFBRSxJQUFJO1lBQ3RCLDBCQUEwQixFQUFFLElBQUk7WUFDaEMsZUFBZSxFQUFFLElBQUk7WUFDckIsVUFBVSxFQUFFLElBQUk7WUFDaEIsa0JBQWtCLEVBQUUsSUFBSTtZQUN4QixXQUFXLEVBQUUsSUFBSTtZQUNqQixlQUFlLEVBQUUsSUFBSTtZQUNyQixxQkFBcUIsRUFBRSxJQUFJO1lBQzNCLGVBQWUsRUFBRSxJQUFJO1NBQ3RCLENBQUE7SUE4SEgsQ0FBQztJQTVIUSxPQUFPLENBQUMsSUFBVTtRQUN2QixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUE7SUFDNUIsQ0FBQztJQUVNLE1BQU0sQ0FBQyxJQUFZLEVBQUUsVUFBbUIsSUFBSSxDQUFDLGNBQWM7UUFDaEUsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDckMsT0FBTyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUE7U0FDOUI7UUFHRCxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FDakIsMENBQTBDLEVBQzFDLENBQUMsR0FBRyxFQUFFLFVBQWtCLEVBQUUsRUFBRTtZQUkxQixVQUFVLENBQUMsT0FBTyxDQUNo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