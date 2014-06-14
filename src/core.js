/**
 * Copyright (c) 2013, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */
var HTMLHint = (function (undefined) {

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
        'id-unique': true,
        'src-not-empty': true,
        'attr-no-duplication': true // added: 2014-6-14
    };

    HTMLHint.addRule = function(rule){
        HTMLHint.rules[rule.id] = rule;
    };

    HTMLHint.verify = function(html, ruleset){
        if(ruleset === undefined){
            ruleset = HTMLHint.defaultRuleset;
        }
        var parser = new HTMLParser(),
            reporter = new HTMLHint.Reporter(html.split(/\r?\n/), ruleset);

        var rules = HTMLHint.rules,
            rule;
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