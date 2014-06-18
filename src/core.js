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
        'attr-no-duplication': true
    };

    HTMLHint.addRule = function(rule){
        HTMLHint.rules[rule.id] = rule;
    };

    HTMLHint.verify = function(html, newRuleset){
        var id;
        var ruleset;
        // parse inline ruleset
        html = html.replace(/^\s*<!--\s*htmlhint\s+([^\r\n]+?)\s*-->\s*/i, function(all, strRuleset){
            ruleset = {};
            strRuleset.replace(/(?:^|,)\s*([^:]+)\s*:\s*([^,\s]+)/g, function(all, key, value){
                if(value === 'false'){
                    value = false;
                }
                else if(value === 'true'){
                    value = true;
                }
                ruleset[key] = value;
            });
            return all;
        });
        if(newRuleset !== undefined){
            ruleset = ruleset || {};
            for (id in newRuleset){
                ruleset[id] = newRuleset[id];
            }
        }
        if(ruleset === undefined){
            ruleset = HTMLHint.defaultRuleset;
        }

        var parser = new HTMLParser();
        var reporter = new HTMLHint.Reporter(html.split(/\r?\n/), ruleset);

        var rules = HTMLHint.rules,
            rule;
        for (id in ruleset){
            rule = rules[id];
            if (rule !== undefined && ruleset[id] !== false){
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