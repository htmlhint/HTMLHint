export default {
  id: 'spec-char-escape',
  description: 'Special characters must be escaped.',
  init: function(parser, reporter, options) {
    var self = this;
    parser.addListener('text', function(event) {
      var raw = event.raw,
        reSpecChar = /[<>]/g,
        match;
      if (options['raw-ignore-regex']) {
        const regex = new RegExp(options['raw-ignore-regex'], 'g');
        if (regex.test(raw)) {
          return;
        }
      }
      while ((match = reSpecChar.exec(raw))) {
        var fixedPos = parser.fixPos(event, match.index);
        reporter.error(
          'Special characters must be escaped : [ ' + match[0] + ' ].',
          fixedPos.line,
          fixedPos.col,
          self,
          event.raw
        );
      }
    });
  }
};
