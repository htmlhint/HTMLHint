export default {
  id: 'inline-script-disabled',
  description: 'Inline script cannot be used.',
  init: function(parser, reporter) {
    var self = this;
    parser.addListener('tagstart', function(event) {
      var attrs = event.attrs;
      var attr;
      var col = event.col + event.tagName.length + 1;
      var attrName;
      var reEvent = /^on(unload|message|submit|select|scroll|resize|mouseover|mouseout|mousemove|mouseleave|mouseenter|mousedown|load|keyup|keypress|keydown|focus|dblclick|click|change|blur|error)$/i;

      for (var i = 0, l = attrs.length; i < l; i++) {
        attr = attrs[i];
        attrName = attr.name.toLowerCase();
        if (reEvent.test(attrName) === true) {
          reporter.warn(
            'Inline script [ ' + attr.raw + ' ] cannot be used.',
            event.line,
            col + attr.index,
            self,
            attr.raw
          );
        } else if (attrName === 'src' || attrName === 'href') {
          if (/^\s*javascript:/i.test(attr.value)) {
            reporter.warn(
              'Inline script [ ' + attr.raw + ' ] cannot be used.',
              event.line,
              col + attr.index,
              self,
              attr.raw
            );
          }
        }
      }
    });
  }
};
