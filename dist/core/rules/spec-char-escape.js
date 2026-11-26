"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function parseEntityNames(table) {
    return table.replace(/#.*$/gm, '').trim().split(/\s+/);
}
const legacyNames = parseEntityNames(`
AElig AMP Aacute Acirc Agrave Aring Atilde Auml COPY Ccedil ETH Eacute
Ecirc Egrave Euml GT Iacute Icirc Igrave Iuml LT Ntilde Oacute Ocirc
Ograve Oslash Otilde Ouml QUOT REG THORN Uacute Ucirc Ugrave Uuml Yacute
aacute acirc acute aelig agrave amp aring atilde auml brvbar ccedil cedil
cent copy curren deg divide eacute ecirc egrave eth euml frac12 frac14 # codespell:ignore curren
frac34 gt iacute icirc iexcl igrave iquest iuml laquo lt macr micro middot
nbsp not ntilde oacute ocirc ograve ordf ordm oslash otilde ouml para
plusmn pound quot raquo reg sect shy sup1 sup2 sup3 szlig thorn times
uacute ucirc ugrave uml uuml yacute yen yuml
`);
const longerNames = parseEntityNames(`
centerdot copysr divideontimes gtcc gtcir gtdot gtlPar gtquest gtrapprox
gtrarr gtrdot gtreqless gtreqqless gtrless gtrsim ltcc ltcir ltdot lthree
ltimes ltlarr ltquest ltrPar ltri ltrie ltrif notin notinE notindot # codespell:ignore notin
notinva notinvb notinvc notni notniva notnivb notnivc parallel timesb
timesbar timesd
`);
const legacyPrefix = new RegExp(`^(?:${legacyNames.join('|')})`);
const completeNames = new Set([...legacyNames, ...longerNames]);
const rawTextElement = /^(?:iframe|noembed|noframes|plaintext|script|style|xmp)$/i;
function isUnterminatedReference(reference) {
    const terminated = reference.endsWith(';');
    if (reference.startsWith('&#')) {
        return !terminated;
    }
    const name = reference.slice(1, terminated ? -1 : undefined);
    return legacyPrefix.test(name) && !(terminated && completeNames.has(name));
}
exports.default = {
    id: 'spec-char-escape',
    description: 'Special characters must be escaped.',
    init(parser, reporter) {
        let rawTextTag = '';
        parser.addListener('tagstart', ({ tagName, attrs }) => {
            var _a;
            if (rawTextTag || !rawTextElement.test(tagName)) {
                return;
            }
            const name = tagName.toLowerCase();
            const type = (_a = attrs.find((attr) => attr.name === 'type')) === null || _a === void 0 ? void 0 : _a.value;
            if (name === 'script' && (type === null || type === void 0 ? void 0 : type.includes('text/ng-template'))) {
                return;
            }
            rawTextTag = name;
        });
        parser.addListener('tagend', ({ tagName }) => {
            if (rawTextTag !== 'plaintext' && rawTextTag === tagName.toLowerCase()) {
                rawTextTag = '';
            }
        });
        parser.addListener('text', (event) => {
            const raw = event.raw;
            const reSpecChar = /[<>]|&(?:#[xX][\dA-Fa-f]+|#\d+|[A-Za-z][A-Za-z0-9]*);?/g;
            let match;
            while ((match = reSpecChar.exec(raw))) {
                let message = `Special characters must be escaped : [ ${match[0]} ].`;
                if (match[0].startsWith('&')) {
                    if (rawTextTag || !isUnterminatedReference(match[0])) {
                        continue;
                    }
                    message = 'Character references must end with a semicolon.';
                }
                const fixedPos = parser.fixPos(event, match.index);
                reporter.error(message, fixedPos.line, fixedPos.col, this, raw);
            }
        });
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BlYy1jaGFyLWVzY2FwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb3JlL3J1bGVzL3NwZWMtY2hhci1lc2NhcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSxTQUFTLGdCQUFnQixDQUFDLEtBQWE7SUFFckMsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUE7QUFDeEQsQ0FBQztBQU1ELE1BQU0sV0FBVyxHQUFHLGdCQUFnQixDQUFDOzs7Ozs7Ozs7O0NBVXBDLENBQUMsQ0FBQTtBQUdGLE1BQU0sV0FBVyxHQUFHLGdCQUFnQixDQUFDOzs7Ozs7Q0FNcEMsQ0FBQyxDQUFBO0FBR0YsTUFBTSxZQUFZLEdBQUcsSUFBSSxNQUFNLENBQUMsT0FBTyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtBQUNoRSxNQUFNLGFBQWEsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsV0FBVyxFQUFFLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQTtBQUMvRCxNQUFNLGNBQWMsR0FDbEIsMkRBQTJELENBQUE7QUFFN0QsU0FBUyx1QkFBdUIsQ0FBQyxTQUFpQjtJQUNoRCxNQUFNLFVBQVUsR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQzFDLElBQUksU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBQy9CLE9BQU8sQ0FBQyxVQUFVLENBQUE7SUFDcEIsQ0FBQztJQUdELE1BQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBQzVELE9BQU8sWUFBWSxDQUFDLElBQUksQ0FBQyxJ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