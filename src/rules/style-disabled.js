HTMLHint.addRule({
    id: 'style-disabled',
    description: '<style> tags cannot be used.',
    init: function(parser, reporter){
        var self = this;
        parser.addListener('tagstart', function(event){
            if(event.tagName.toLowerCase() === 'style'){
                reporter.warn('The <style> tag cannot be used.', event.line, event.col, self, event.raw);
            }
        });
    }
});
