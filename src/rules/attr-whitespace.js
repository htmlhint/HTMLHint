HTMLHint.addRule({
  id: 'attr-whitespace',
  description:
    'All attributes should be separated by only one space and not have leading/trailing whitespace.',
  init: function(parser, reporter, options) {
    var self = this;
    var exceptions = Array.isArray(options) ? options : [];
    //console.log(exceptions);
    if (exceptions.length == 0) {
    }
    parser.addListener('tagstart', function(event) {
      var attrs = event.attrs,
        attr,
        col = event.col + event.tagName.length + 1;
      attrs.forEach(function(elem) {
        attr = elem;
        var attrName = elem.name;
        //Check first and last characters for spaces
        if (elem.value.trim(elem.value) !== elem.value) {
          reporter.error(
            'The attributes of [ ' +
              attrName +
              ' ] must not have trailing whitespace.',
            event.line,
            col + attr.index,
            self,
            attr.raw
          );
        }
        if (elem.value.replace(/ +(?= )/g, '') !== elem.value) {
          reporter.error(
            'The attributes of [ ' +
              attrName +
              ' ] must be separated by only one space.',
            event.line,
            col + attr.index,
            self,
            attr.raw
          );
        }
      });
    });
  }
});
