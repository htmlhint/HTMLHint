/**
 * Copyright (c) 2013, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */
(function(HTMLHint, undefined){

    var Reporter = function(){
        var self = this;
        self._init.apply(self,arguments);
    }

    Reporter.prototype = {
        _init: function(lines, ruleset){
            var self = this;
            self.lines = lines;
            self.ruleset = ruleset;
            self.messages = [];
        },
        //错误
        error: function(message, line, col, rule, raw){
            this.report('error', message, line, col, rule, raw);
        },
        //警告
        warn: function(message, line, col, rule, raw){
            this.report('warning', message, line, col, rule, raw);
        },
        //信息
        info: function(message, line, col, rule, raw){
            this.report('info', message, line, col, rule, raw);
        },
        //报告
        report: function(type, message, line, col, rule, raw){
            var self = this;
            self.messages.push({
                type: type,
                message: message,
                raw: raw,
                evidence: self.lines[line-1],
                line: line,
                col: col,
                rule: rule
            });
        }
    };

    HTMLHint.Reporter = Reporter;

})(HTMLHint);