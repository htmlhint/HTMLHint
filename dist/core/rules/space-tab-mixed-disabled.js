"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BhY2UtdGFiLW1peGVkLWRpc2FibGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvcmUvcnVsZXMvc3BhY2UtdGFiLW1peGVkLWRpc2FibGVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsa0JBQWU7SUFDYixFQUFFLEVBQUUsMEJBQTBCO0lBQzlCLFdBQVcsRUFBRSw2Q0FBNkM7SUFDMUQsSUFBSSxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsT0FBTztRQUM1QixJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUE7UUFDeEIsSUFBSSxrQkFBa0IsR0FBdUIsSUFBSSxDQUFBO1FBRWpELElBQUksT0FBTyxPQUFPLEtBQUssUUFBUSxFQUFFO1lBQy9CLE1BQU0sS0FBSyxHQUFHLGlCQUFpQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtZQUM3QyxJQUFJLEtBQUssRUFBRTtnQkFDVCxVQUFVLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBO2dCQUNyQixrQkFBa0IsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQTthQUN4RDtTQUNGO1FBRUQsTUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNuQyxNQUFNLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFBO1lBQ3JCLE1BQU0sT0FBTyxHQUFHLG9CQUFvQixDQUFBO1lBQ3BDLElBQUksS0FBSyxDQUFBO1lBRVQsT0FBTyxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7Z0JBQ2xDLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFBO2dCQUNwRSxJQUFJLFFBQVEsQ0FBQyxHQUFHLEtBQUssQ0FBQyxFQUFFO29CQUN0QixTQUFRO2lCQUNUO2dCQUVELE1BQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQTtnQkFDM0IsSUFBSSxVQUFVLEtBQUssT0FBTyxFQUFFO29CQUMxQixJQUFJLGtCQUFrQixFQUFFO3dCQUN0QixJQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssS0FBSzs0QkFDakMsVUFBVSxDQUFDLE1BQU0sR0FBRyxrQkFBa0IsS0FBSyxDQUFDLEVBQzVDOzRCQUNBLFFBQVEsQ0FBQyxJQUFJLENBQ1gsNkNBQTZDLGtCQUFrQixVQUFVLEVBQ3pFLFFBQVEsQ0FBQyxJQUFJLEVBQ2IsQ0FBQyxFQUNELElBQUksRUFDSixLQUFLLENBQUMsR0FBRyxDQUNWLENBQUE7eUJBQ0Y7cUJBQ0Y7eUJBQU07d0JBQ0wsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEtBQUssRUFBRTs0QkFDckMsUUFBUSxDQUFDLElBQUksQ0FDWCxtQ0FBbUMsRUFDbkMsUUFBUSxDQUFDLElBQUksRUFDYixDQUFDLEVBQ0QsSUFBSSxFQUNKLEtBQUssQ0FBQyxHQUFHLENBQ1YsQ0FBQTt5QkFDRjtxQkFDRjtpQkFDRjtxQkFBTSxJQUFJLFVBQVUsS0FBSyxLQUFLLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxLQUFLLEVBQUU7b0JBQ3JFLFFBQVEsQ0FBQyxJQUFJLENBQ1gsaUNBQWlDLEVBQ2pDLFFBQVEsQ0FBQyxJQUFJLEVBQ2IsQ0FBQyxFQUNELElBQUksRUFDSixLQUFLLENBQUMsR0FBRyxDQUNWLENBQUE7aUJBQ0Y7cUJBQU0sSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLElBQUksRUFBRTtvQkFDaEQsUUFBUSxDQUFDLElBQUksQ0FDWCw2Q0FBNkMsRUFDN0MsUUFBUSxDQUFDLElBQUksRUFDYixDQUFDLEVBQ0QsSUFBSSxFQUNKLEtBQUssQ0FBQyxHQUFHLENBQ1YsQ0FBQTtpQkFDRjthQUNGO1FBQ0gsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0NBQ00sQ0FBQSJ9