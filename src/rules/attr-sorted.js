export default {
  id: 'attr-sorted',
  description: 'Attribute tags must be in proper order.',
  init: function(parser, reporter) {
    var self = this;
    var orderMap = {};
    var sortOrder = [
      'class',
      'id',
      'name',
      'src',
      'for',
      'type',
      'href',
      'value',
      'title',
      'alt',
      'role'
    ];
    for (var i = 0; i < sortOrder.length; i++) {
      orderMap[sortOrder[i]] = i;
    }

    parser.addListener('tagstart', function(event) {
      var attrs = event.attrs;
      var listOfAttributes = [];
      for (var i = 0; i < attrs.length; i++) {
        listOfAttributes.push(attrs[i].name);
      }
      var originalAttrs = JSON.stringify(listOfAttributes);
      listOfAttributes.sort(function(a, b) {
        if (orderMap[a] == undefined && orderMap[b] == undefined) {
          return 0;
        }
        if (orderMap[a] == undefined) {
          return 1;
        } else if (orderMap[b] == undefined) {
          return -1;
        }
        return orderMap[a] - orderMap[b] || a.localeCompare(b);
      });
      if (originalAttrs !== JSON.stringify(listOfAttributes)) {
        reporter.error(
          'Inaccurate order ' +
            originalAttrs +
            ' should be in hierarchy ' +
            JSON.stringify(listOfAttributes) +
            ' ',
          event.line,
          event.col,
          self
        );
      }
    });
  }
};
