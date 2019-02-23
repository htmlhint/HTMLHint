export default {
  id: 'tagname-lowercase',
  description: 'All html element names must be in lowercase.',
  init: function(parser, reporter, options) {
    var self = this;
    var exceptions = Array.isArray(options) ? options : [];
    parser.addListener('tagstart,tagend', function(event) {
      var tagName = event.tagName;
      if (
        exceptions.indexOf(tagName) === -1 &&
        tagName !== tagName.toLowerCase()
      ) {
        reporter.error(
          'The html element name of [ ' + tagName + ' ] must be in lowercase.',
          event.line,
          event.col,
          self,
          event.raw
        );
      }
    });
  }
};
