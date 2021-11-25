"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Reporter = (function () {
    function Reporter(html, ruleset) {
        this.html = html;
        this.lines = html.split(/\r?\n/);
        var match = /\r?\n/.exec(html);
        this.brLen = match !== null ? match[0].length : 0;
        this.ruleset = ruleset;
        this.messages = [];
    }
    Reporter.prototype.info = function (message, line, col, rule, raw) {
        this.report("info", message, line, col, rule, raw);
    };
    Reporter.prototype.warn = function (message, line, col, rule, raw) {
        this.report("warning", message, line, col, rule, raw);
    };
    Reporter.prototype.error = function (message, line, col, rule, raw) {
        this.report("error", message, line, col, rule, raw);
    };
    Reporter.prototype.report = function (type, message, line, col, rule, raw) {
        var lines = this.lines;
        var brLen = this.brLen;
        var evidence = '';
        var evidenceLen = 0;
        for (var i = line - 1, lineCount = lines.length; i < lineCount; i++) {
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
                link: "https://github.com/thedaviddias/HTMLHint/wiki/".concat(rule.id),
            },
        });
    };
    return Reporter;
}());
exports.default = Reporter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29yZS9yZXBvcnRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBO0lBT0Usa0JBQW1CLElBQVksRUFBRSxPQUFnQjtRQUMvQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQTtRQUNoQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDaEMsSUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUVoQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNqRCxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQTtRQUN0QixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQTtJQUNwQixDQUFDO0lBRU0sdUJBQUksR0FBWCxVQUNFLE9BQWUsRUFDZixJQUFZLEVBQ1osR0FBVyxFQUNYLElBQVUsRUFDVixHQUFXO1FBRVgsSUFBSSxDQUFDLE1BQU0sU0FBa0IsT0FBTyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFBO0lBQzdELENBQUM7SUFFTSx1QkFBSSxHQUFYLFVBQ0UsT0FBZSxFQUNmLElBQVksRUFDWixHQUFXLEVBQ1gsSUFBVSxFQUNWLEdBQVc7UUFFWCxJQUFJLENBQUMsTUFBTSxZQUFxQixPQUFPLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUE7SUFDaEUsQ0FBQztJQUVNLHdCQUFLLEdBQVosVUFDRSxPQUFlLEVBQ2YsSUFBWSxFQUNaLEdBQVcsRUFDWCxJQUFVLEVBQ1YsR0FBVztRQUVYLElBQUksQ0FBQyxNQUFNLFVBQW1CLE9BQU8sRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQTtJQUM5RCxDQUFDO0lBRU8seUJBQU0sR0FBZCxVQUNFLElBQWdCLEVBQ2hCLE9BQWUsRUFDZixJQUFZLEVBQ1osR0FBVyxFQUNYLElBQVUsRUFDVixHQUFXO1FBRVgsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQTtRQUN4QixJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFBO1FBQ3hCLElBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQTtRQUNqQixJQUFJLFdBQVcsR0FBRyxDQUFDLENBQUE7UUFFbkIsS0FBSyxJQUFJLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxFQUFFLFNBQVMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxTQUFTLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDbkUsUUFBUSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUNuQixXQUFXLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQTtZQUM3QixJQUFJLEdBQUcsR0FBRyxXQUFXLElBQUksSUFBSSxHQUFHLFNBQVMsRUFBRTtnQkFDekMsSUFBSSxFQUFFLENBQUE7Z0JBQ04sR0FBRyxJQUFJLFdBQVcsQ0FBQTtnQkFDbEIsSUFBSSxHQUFHLEtBQUssQ0FBQyxFQUFFO29CQUNiLEdBQUcsSUFBSSxLQUFLLENBQUE7aUJBQ2I7YUFDRjtpQkFBTTtnQkFDTCxNQUFLO2FBQ047U0FDRjtRQUVELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO1lBQ2pCLElBQUksRUFBRSxJQUFJO1lBQ1YsT0FBTyxFQUFFLE9BQU87WUFDaEIsR0FBRyxFQUFFLEdBQUc7WUFDUixRQUFRLEVBQUUsUUFBUTtZQUNsQixJQUFJLEVBQUUsSUFBSTtZQUNWLEdBQUcsRUFBRSxHQUFHO1lBQ1IsSUFBSSxFQUFFO2dCQUNKLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRTtnQkFDWCxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7Z0JBQzdCLElBQUksRUFBRSx3REFBaUQsSUFBSSxDQUFDLEVBQUUsQ0FBRTthQUN6RDtTQUNWLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFDSCxlQUFDO0FBQUQsQ0FBQyxBQXhGRCxJQXdGQyJ9