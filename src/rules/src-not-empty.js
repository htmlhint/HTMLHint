HTMLHint.addRule({
  id: 'src-not-empty',
  description: 'The src attribute of an img(script,link) must have a value.',
  init: function(parser, reporter) {
    var self = this;
    parser.addListener('tagstart', function(event) {
      var tagName = event.tagName,
        attrs = event.attrs,
        attr,
        col = event.col + tagName.length + 1;
      for (var i = 0, l = attrs.length; i < l; i++) {
        attr = attrs[i];
        if (
          ((/^(img|script|embed|bgsound|iframe)$/.test(tagName) === true &&
            attr.name === 'src') ||
            (tagName === 'link' && attr.name === 'href') ||
            (tagName === 'object' && attr.name === 'data')) &&
          attr.value === ''
        ) {
          reporter.error(
            'The attribute [ ' +
              attr.name +
              ' ] of the tag [ ' +
              tagName +
              ' ] must have a value.',
            event.line,
            col + attr.index,
            self,
            attr.raw
          );
        }
      }
    });
  }
});
