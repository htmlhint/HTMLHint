/**
 * Copyright (c) 2013, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */
var HTMLHint = (function (undefined) {

    function extend() {
        var args = arguments, parent = args[0];
        for (var i = 1, prop, len = args.length; i < len; i++) {
            var arg = args[i];
            for (prop in arg) {
                if (arg.hasOwnProperty(prop)) {
                    parent[prop] = arg[prop];
                }
            }
        }
        return parent;
    }

    var HTMLHint = {};

    HTMLHint.version = '@VERSION';

    HTMLHint.rules = {};

    //默认配置
    HTMLHint.defaultRuleset = {
        'tagname-lowercase': true,
        'attr-lowercase': true,
        'attr-value-double-quotes': true,
        'doctype-first': true,
        'tag-pair': true,
        'spec-char-escape': true,
        'id-unique': true
    };

    HTMLHint.addRule = function(rule){
        HTMLHint.rules[rule.id] = rule;
    };

    HTMLHint.verify = function(html, ruleset){
        ruleset = extend({}, HTMLHint.defaultRuleset, ruleset);

        var parser = new HTMLParser(),
            reporter = new HTMLHint.Reporter(html.split(/\r?\n/), ruleset);

        var rules = HTMLHint.rules,
            rule;
        for (var id in ruleset){
            if (ruleset.hasOwnProperty(id) && ruleset[id]) {
                rule = rules[id];
                if (rule !== undefined){
                    rule.init(parser, reporter, ruleset[id]);
                }
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