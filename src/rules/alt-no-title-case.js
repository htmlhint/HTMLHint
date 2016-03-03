HTMLHint.addRule({
  id: 'attr-no-title-case',
  description: 'All attribute names not be in title case, allows for camel case',
  init: function(parser, reporter){
    var self = this;
    parser.addListener('tagstart', function(event){
      var attrs = event.attrs,
        attr,
        col = event.col + event.tagName.length + 1;
      for(var i=0, l=attrs.length;i<l;i++){
        attr = attrs[i];
        var attrName = attr.name;
        if (/^\*[A-Z]/.test(attrName) ||
          /^[A-Z]/.test(attrName) ||
          /^\[[A-Z]/.test(attrName)) {
          reporter.error('The attribute name of [ '+attrName+' ] must not be in title case.', event.line, col + attr.index, self, attr.raw);
        }
      }
    });
  }
});