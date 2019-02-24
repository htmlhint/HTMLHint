export default {
    id: 'title-require',
    description: '<title> must be present in <head> tag.',
    init: function(parser, reporter){
        var self = this;
        var headBegin = false;
        var hasTitle = false;
        function onTagStart(event){
            var tagName = event.tagName.toLowerCase();
            if(tagName === 'head'){
                headBegin = true;
            }
            else if(tagName === 'title' && headBegin){
                hasTitle = true;
            }
        }
        function onTagEnd(event){
            var tagName = event.tagName.toLowerCase();
            if(hasTitle && tagName === 'title'){
                var lastEvent = event.lastEvent;
                if(lastEvent.type !== 'text' || (lastEvent.type === 'text' && /^\s*$/.test(lastEvent.raw) === true)){
                    reporter.error('<title></title> must not be empty.', event.line, event.col, self, event.raw);
                }
            }
            else if(tagName === 'head'){
                if(hasTitle === false){
                    reporter.error('<title> must be present in <head> tag.', event.line, event.col, self, event.raw);
                }
                parser.removeListener('tagstart', onTagStart);
                parser.removeListener('tagend', onTagEnd);
            }
        }
        parser.addListener('tagstart', onTagStart);
        parser.addListener('tagend', onTagEnd);
    }
}