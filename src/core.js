/**
 * Copyright (c) 2013, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */
var HTMLHint = (function (undefined) {

    var rules = [];

    var HTMLHint = {};

    HTMLHint.version = '@VERSION';

    HTMLHint.addRule = function(rule){
        rules[rule.id] = rule;
    };

    HTMLHint.verify = function(html, ruleset){
        var parser = new HTMLParser(),
            reporter = new HTMLHint.Reporter(html.split(/\r?\n/), ruleset);

        var rule;
        for (var id in ruleset){
            rule = rules[id];
            if (rule !== undefined){
                rule.init(parser, reporter, ruleset[id]);
            }
        }

        parser.parse(html);

        return reporter.messages;
    };

    return HTMLHint;

})();

if (typeof exports === 'object' && exports){
    exports.HTMLHint = HTMLHint;
}