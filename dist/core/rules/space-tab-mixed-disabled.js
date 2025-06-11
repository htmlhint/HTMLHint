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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BhY2UtdGFiLW1peGVkLWRpc2FibGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvcmUvcnVsZXMvc3BhY2UtdGFiLW1peGVkLWRpc2FibGVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsa0JBQWU7SUFDYixFQUFFLEVBQUUsMEJBQTBCO0lBQzlCLFdBQVcsRUFBRSw2Q0FBNkM7SUFDMUQsSUFBSSxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsT0FBTztRQUM1QixJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUE7UUFDeEIsSUFBSSxrQkFBa0IsR0FBdUIsSUFBSSxDQUFBO1FBRWpELElBQUksT0FBTyxPQUFPLEtBQUssUUFBUSxFQUFFLENBQUM7WUFDaEMsTUFBTSxLQUFLLEdBQUcsaUJBQWlCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1lBQzdDLElBQUksS0FBSyxFQUFFLENBQUM7Z0JBQ1YsVUFBVSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQTtnQkFDckIsa0JBQWtCLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUE7WUFDekQsQ0FBQztRQUNILENBQUM7UUFFRCxNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ25DLE1BQU0sR0FBRyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUE7WUFDckIsTUFBTSxPQUFPLEdBQUcsb0JBQW9CLENBQUE7WUFDcEMsSUFBSSxLQUFLLENBQUE7WUFFVCxPQUFPLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDO2dCQUNuQyxNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQTtnQkFDcEUsSUFBSSxRQUFRLENBQUMsR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDO29CQUN2QixTQUFRO2dCQUNWLENBQUM7Z0JBRUQsTUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBO2dCQUMzQixJQUFJLFVBQVUsS0FBSyxPQUFPLEVBQUUsQ0FBQztvQkFDM0IsSUFBSSxrQkFBa0IsRUFBRSxDQUFDO3dCQUN2QixJQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssS0FBSzs0QkFDakMsVUFBVSxDQUFDLE1BQU0sR0FBRyxrQkFBa0IsS0FBSyxDQUFDLEVBQzVDLENBQUM7NEJBQ0QsUUFBUSxDQUFDLElBQUksQ0FDWCw2Q0FBNkMsa0JBQWtCLFVBQVUsRUFDekUsUUFBUSxDQUFDLElBQUksRUFDYixDQUFDLEVBQ0QsSUFBSSxFQUNKLEtBQUssQ0FBQyxHQUFHLENBQ1YsQ0FBQTt3QkFDSCxDQUFDO29CQUNILENBQUM7eUJBQU0sQ0FBQzt3QkFDTixJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssS0FBSyxFQUFFLENBQUM7NEJBQ3RDLFFBQVEsQ0FBQyxJQUFJLENBQ1gsbUNBQW1DLEVBQ25DLFFBQVEsQ0FBQyxJQUFJLEVBQ2IsQ0FBQyxFQUNELElBQUksRUFDSixLQUFLLENBQUMsR0FBRyxDQUNWLENBQUE7d0JBQ0gsQ0FBQztvQkFDSCxDQUFDO2dCQUNILENBQUM7cUJBQU0sSUFBSSxVQUFVLEtBQUssS0FBSyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssS0FBSyxFQUFFLENBQUM7b0JBQ3RFLFFBQVEsQ0FBQyxJQUFJLENBQ1gsaUNBQWlDLEVBQ2pDLFFBQVEsQ0FBQyxJQUFJLEVBQ2IsQ0FBQyxFQUNELElBQUksRUFDSixLQUFLLENBQUMsR0FBRyxDQUNWLENBQUE7Z0JBQ0gsQ0FBQztxQkFBTSxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUM7b0JBQ2pELFFBQVEsQ0FBQyxJQUFJLENBQ1gsNkNBQTZDLEVBQzdDLFFBQVEsQ0FBQyxJQUFJLEVBQ2IsQ0FBQyxFQUNELElBQUksRUFDSixLQUFLLENBQUMsR0FBRyxDQUNWLENBQUE7Z0JBQ0gsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FDTSxDQUFBIn0=