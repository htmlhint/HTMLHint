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

module.exports = {
    cleanRules: function (rules) {
        return extend({
            'tagname-lowercase': false,
            'attr-lowercase': false,
            'attr-value-double-quotes': false,
            'doctype-first': false,
            'tag-pair': false,
            'spec-char-escape': false,
            'id-unique': false
        }, rules);
    }
};
