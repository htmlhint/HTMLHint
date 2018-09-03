HTMLHint.addRule({
  id: 'tagname-lowercase',
  description: 'All html element names must be in lowercase.',
  init: function(parser, reporter) {
    var self = this;
    parser.addListener('tagstart,tagend', function(event) {
      var tagName = event.tagName;
      if (tagName !== tagName.toLowerCase()) {
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
});
