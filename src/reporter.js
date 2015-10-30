/**
 * Copyright (c) 2015, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */
(function(HTMLHint, undefined){

    var Reporter = function(){
        var self = this;
        self._init.apply(self,arguments);
    };

    Reporter.prototype = {
        _init: function(lines, ruleset){
            var self = this;
            self.lines = lines;
            self.ruleset = ruleset;
            self.messages = [];
        },
        // error message
        error: function(message, line, col, rule, raw){
            this.report('error', message, line, col, rule, raw);
        },
        // warning message
        warn: function(message, line, col, rule, raw){
            this.report('warning', message, line, col, rule, raw);
        },
        // info message
        info: function(message, line, col, rule, raw){
            this.report('info', message, line, col, rule, raw);
        },
        // save report
        report: function(type, message, line, col, rule, raw){
            var self = this;
            var lines = self.lines;
            var evidence, evidenceLen;
            for(var i=line-1, lineCount=lines.length;i<lineCount;i++){
                evidence = lines[i];
                evidenceLen = evidence.length;
                if(col > evidenceLen && line < lineCount){
                    line ++;
                    col -= evidenceLen;
                }
                else{
                    break;
                }
            }
            self.messages.push({
                type: type,
                message: message,
                raw: raw,
                evidence: evidence,
                line: line,
                col: col,
                rule: {
                    id: rule.id,
                    description: rule.description,
                    link: 'https://github.com/yaniswang/HTMLHint/wiki/' + rule.id
                }
            });
        }
    };

    HTMLHint.Reporter = Reporter;

})(HTMLHint);
