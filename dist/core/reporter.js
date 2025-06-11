"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Reporter {
    constructor(html, ruleset) {
        this.html = html;
        this.lines = html.split(/\r?\n/);
        const match = /\r?\n/.exec(html);
        this.brLen = match !== null ? match[0].length : 0;
        this.ruleset = ruleset;
        this.messages = [];
    }
    info(message, line, col, rule, raw) {
        this.report("info", message, line, col, rule, raw);
    }
    warn(message, line, col, rule, raw) {
        this.report("warning", message, line, col, rule, raw);
    }
    error(message, line, col, rule, raw) {
        this.report("error", message, line, col, rule, raw);
    }
    report(type, message, line, col, rule, raw) {
        const lines = this.lines;
        const brLen = this.brLen;
        let evidence = '';
        let evidenceLen = 0;
        for (let i = line - 1, lineCount = lines.length; i < lineCount; i++) {
            evidence = lines[i];
            evidenceLen = evidence.length;
            if (col > evidenceLen && line < lineCount) {
                line++;
                col -= evidenceLen;
                if (col !== 1) {
                    col -= brLen;
                }
            }
            else {
                break;
            }
        }
        this.messages.push({
            type: type,
            message: message,
            raw: raw,
            evidence: evidence,
            line: line,
            col: col,
            rule: {
                id: rule.id,
                description: rule.description,
                link: `https://htmlhint.com/rules/${rule.id}`,
            },
        });
    }
}
exports.default = Reporter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29yZS9yZXBvcnRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLE1BQXFCLFFBQVE7SUFPM0IsWUFBbUIsSUFBWSxFQUFFLE9BQWdCO1FBQy9DLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFBO1FBQ2hCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUNoQyxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBRWhDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ2pELElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFBO1FBQ3RCLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFBO0lBQ3BCLENBQUM7SUFFTSxJQUFJLENBQ1QsT0FBZSxFQUNmLElBQVksRUFDWixHQUFXLEVBQ1gsSUFBVSxFQUNWLEdBQVc7UUFFWCxJQUFJLENBQUMsTUFBTSxTQUFrQixPQUFPLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUE7SUFDN0QsQ0FBQztJQUVNLElBQUksQ0FDVCxPQUFlLEVBQ2YsSUFBWSxFQUNaLEdBQVcsRUFDWCxJQUFVLEVBQ1YsR0FBVztRQUVYLElBQUksQ0FBQyxNQUFNLFlBQXFCLE9BQU8sRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQTtJQUNoRSxDQUFDO0lBRU0sS0FBSyxDQUNWLE9BQWUsRUFDZixJQUFZLEVBQ1osR0FBVyxFQUNYLElBQVUsRUFDVixHQUFXO1FBRVgsSUFBSSxDQUFDLE1BQU0sVUFBbUIsT0FBTyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFBO0lBQzlELENBQUM7SUFFTyxNQUFNLENBQ1osSUFBZ0IsRUFDaEIsT0FBZSxFQUNmLElBQVksRUFDWixHQUFXLEVBQ1gsSUFBVSxFQUNWLEdBQVc7UUFFWCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFBO1FBQ3hCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUE7UUFDeEIsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFBO1FBQ2pCLElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQTtRQUVuQixLQUFLLElBQUksQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLEVBQUUsU0FBUyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLFNBQVMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ3BFLFFBQVEsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDbkIsV0FBVyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUE7WUFDN0IsSUFBSSxHQUFHLEdBQUcsV0FBVyxJQUFJLElBQUksR0FBRyxTQUFTLEVBQUUsQ0FBQztnQkFDMUMsSUFBSSxFQUFFLENBQUE7Z0JBQ04sR0FBRyxJQUFJLFdBQVcsQ0FBQTtnQkFDbEIsSUFBSSxHQUFHLEtBQUssQ0FBQyxFQUFFLENBQUM7b0JBQ2QsR0FBRyxJQUFJLEtBQUssQ0FBQTtnQkFDZCxDQUFDO1lBQ0gsQ0FBQztpQkFBTSxDQUFDO2dCQUNOLE1BQUs7WUFDUCxDQUFDO1FBQ0gsQ0FBQztRQUVELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO1lBQ2pCLElBQUksRUFBRSxJQUFJO1lBQ1YsT0FBTyxFQUFFLE9BQU87WUFDaEIsR0FBRyxFQUFFLEdBQUc7WUFDUixRQUFRLEVBQUUsUUFBUTtZQUNsQixJQUFJLEVBQUUsSUFBSTtZQUNWLEdBQUcsRUFBRSxHQUFHO1lBQ1IsSUFBSSxFQUFFO2dCQUNKLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRTtnQkFDWCxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7Z0JBQzdCLElBQUksRUFBRSw4QkFBOEIsSUFBSSxDQUFDLEVBQUUsRUFBRTthQUN0QztTQUNWLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FDRjtBQXhGRCwyQkF3RkMifQ==