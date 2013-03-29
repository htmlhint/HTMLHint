/**
 * Copyright (c) 2013, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */
HTMLHint.addRule({
    id: 'jshint',
    description: 'Scan script with jshint.',
    init: function(parser, reporter, options){
        var self = this;
        parser.addListener('cdata', function(event){
            if(event.tagName.toLowerCase() === 'script'){

                var jsVerify = options.verify,
                    jsOptions = options.options;

                if(jsVerify !== undefined && jsOptions !== undefined){
                    var styleLine = event.line - 1,
                        styleCol = event.col - 1;
                    var code = event.raw.replace(/\t/g,' ');
                    var status = jsVerify(code, jsOptions);
                    if(status === false){
                        jsVerify.errors.forEach(function(error){
                            var line = error.line;
                            reporter.warn(error.reason, styleLine + line, (line === 1 ? styleCol : 0) + error.character, self, error.evidence);
                        });
                    }
                }

            }
        });
    }
});