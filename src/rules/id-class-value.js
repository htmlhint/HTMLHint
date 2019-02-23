export default {
  id: 'id-class-value',
  description:
    'The id and class attribute values must meet the specified rules.',
  init: function(parser, reporter, options) {
    var self = this;
    var arrRules = {
        underline: {
          regId: /^[a-z\d]+(_[a-z\d]+)*$/,
          message:
            'The id and class attribute values must be in lowercase and split by an underscore.'
        },
        dash: {
          regId: /^[a-z\d]+(-[a-z\d]+)*$/,
          message:
            'The id and class attribute values must be in lowercase and split by a dash.'
        },
        hump: {
          regId: /^[a-z][a-zA-Z\d]*([A-Z][a-zA-Z\d]*)*$/,
          message:
            'The id and class attribute values must meet the camelCase style.'
        }
      },
      rule;
    if (typeof options === 'string') {
      rule = arrRules[options];
    } else {
      rule = options;
    }
    if (rule && rule.regId) {
      var regId = rule.regId,
        message = rule.message;
      parser.addListener('tagstart', function(event) {
        var attrs = event.attrs,
          attr,
          col = event.col + event.tagName.length + 1;
        for (var i = 0, l1 = attrs.length; i < l1; i++) {
          attr = attrs[i];
          if (attr.name.toLowerCase() === 'id') {
            if (regId.test(attr.value) === false) {
              reporter.warn(
                message,
                event.line,
                col + attr.index,
                self,
                attr.raw
              );
            }
          }
          if (attr.name.toLowerCase() === 'class') {
            var arrClass = attr.value.split(/\s+/g),
              classValue;
            for (var j = 0, l2 = arrClass.length; j < l2; j++) {
              classValue = arrClass[j];
              if (classValue && regId.test(classValue) === false) {
                reporter.warn(
                  message,
                  event.line,
                  col + attr.index,
                  self,
                  classValue
                );
              }
            }
          }
        }
      });
    }
  }
};
