"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BhY2UtdGFiLW1peGVkLWRpc2FibGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvcmUvcnVsZXMvc3BhY2UtdGFiLW1peGVkLWRpc2FibGVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsa0JBQWU7SUFDYixFQUFFLEVBQUUsMEJBQTBCO0lBQzlCLFdBQVcsRUFBRSw2Q0FBNkM7SUFDMUQsSUFBSSxFQUFKLFVBQUssTUFBTSxFQUFFLFFBQVEsRUFBRSxPQUFPO1FBQTlCLGlCQW9FQztRQW5FQyxJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUE7UUFDeEIsSUFBSSxrQkFBa0IsR0FBdUIsSUFBSSxDQUFBO1FBRWpELElBQUksT0FBTyxPQUFPLEtBQUssUUFBUSxFQUFFO1lBQy9CLElBQU0sS0FBSyxHQUFHLGlCQUFpQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtZQUM3QyxJQUFJLEtBQUssRUFBRTtnQkFDVCxVQUFVLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBO2dCQUNyQixrQkFBa0IsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQTthQUN4RDtTQUNGO1FBRUQsTUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsVUFBQyxLQUFLO1lBQy9CLElBQU0sR0FBRyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUE7WUFDckIsSUFBTSxPQUFPLEdBQUcsb0JBQW9CLENBQUE7WUFDcEMsSUFBSSxLQUFLLENBQUE7WUFFVCxPQUFPLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtnQkFDbEMsSUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUE7Z0JBQ3BFLElBQUksUUFBUSxDQUFDLEdBQUcsS0FBSyxDQUFDLEVBQUU7b0JBQ3RCLFNBQVE7aUJBQ1Q7Z0JBRUQsSUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBO2dCQUMzQixJQUFJLFVBQVUsS0FBSyxPQUFPLEVBQUU7b0JBQzFCLElBQUksa0JBQWtCLEVBQUU7d0JBQ3RCLElBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxLQUFLOzRCQUNqQyxVQUFVLENBQUMsTUFBTSxHQUFHLGtCQUFrQixLQUFLLENBQUMsRUFDNUM7NEJBQ0EsUUFBUSxDQUFDLElBQUksQ0FDWCxvREFBNkMsa0JBQWtCLGFBQVUsRUFDekUsUUFBUSxDQUFDLElBQUksRUFDYixDQUFDLEVBQ0QsS0FBSSxFQUNKLEtBQUssQ0FBQyxHQUFHLENBQ1YsQ0FBQTt5QkFDRjtxQkFDRjt5QkFBTTt3QkFDTCxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssS0FBSyxFQUFFOzRCQUNyQyxRQUFRLENBQUMsSUFBSSxDQUNYLG1DQUFtQyxFQUNuQyxRQUFRLENBQUMsSUFBSSxFQUNiLENBQUMsRUFDRCxLQUFJLEVBQ0osS0FBSyxDQUFDLEdBQUcsQ0FDVixDQUFBO3lCQUNGO3FCQUNGO2lCQUNGO3FCQUFNLElBQUksVUFBVSxLQUFLLEtBQUssSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEtBQUssRUFBRTtvQkFDckUsUUFBUSxDQUFDLElBQUksQ0FDWCxpQ0FBaUMsRUFDakMsUUFBUSxDQUFDLElBQUksRUFDYixDQUFDLEVBQ0QsS0FBSSxFQUNKLEtBQUssQ0FBQyxHQUFHLENBQ1YsQ0FBQTtpQkFDRjtxQkFBTSxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssSUFBSSxFQUFFO29CQUNoRCxRQUFRLENBQUMsSUFBSSxDQUNYLDZDQUE2QyxFQUM3QyxRQUFRLENBQUMsSUFBSSxFQUNiLENBQUMsRUFDRCxLQUFJLEVBQ0osS0FBSyxDQUFDLEdBQUcsQ0FDVixDQUFBO2lCQUNGO2FBQ0Y7UUFDSCxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FDTSxDQUFBIn0=