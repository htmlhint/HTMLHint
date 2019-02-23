import { CSSLint } from 'csslint'

export default {
  id: 'csslint',
  description: 'Scan css with csslint.',
  init: function(parser, reporter, options) {
    var self = this;
    parser.addListener('cdata', function(event) {
      if (event.tagName.toLowerCase() === 'style') {
        var cssVerify = CSSLint.verify;

        if (options !== undefined) {
          var styleLine = event.line - 1,
            styleCol = event.col - 1;
          try {
            var messages = cssVerify(event.raw, options).messages;
            messages.forEach(function(error) {
              var line = error.line;
              reporter[error.type === 'warning' ? 'warn' : 'error'](
                '[' + error.rule.id + '] ' + error.message,
                styleLine + line,
                (line === 1 ? styleCol : 0) + error.col,
                self,
                error.evidence
              );
            });
          } catch (e) {}
        }
      }
    });
  }
}
