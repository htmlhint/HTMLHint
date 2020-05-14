/**
 * testAgainstStringOrRegExp
 * @param {string} value string to test
 * @param {string|RegExp} comparison raw string or regex string
 * @returns {boolean}
 */
function testAgainstStringOrRegExp(value, comparison) {
  // If it's a RegExp, test directly
  if (comparison instanceof RegExp) {
    return comparison.test(value)
      ? { match: value, pattern: comparison }
      : false;
  }

  // Check if it's RegExp in a string
  const firstComparisonChar = comparison[0];
  const lastComparisonChar = comparison[comparison.length - 1];
  const secondToLastComparisonChar = comparison[comparison.length - 2];

  const comparisonIsRegex =
    firstComparisonChar === '/' &&
    (lastComparisonChar === '/' ||
      (secondToLastComparisonChar === '/' && lastComparisonChar === 'i'));

  const hasCaseInsensitiveFlag =
    comparisonIsRegex && lastComparisonChar === 'i';

  // If so, create a new RegExp from it
  if (comparisonIsRegex) {
    const valueMatches = hasCaseInsensitiveFlag
      ? new RegExp(comparison.slice(1, -2), 'i').test(value)
      : new RegExp(comparison.slice(1, -1)).test(value);

    return valueMatches;
  }

  // Otherwise, it's a string. Do a strict comparison
  return value === comparison;
}

export default {
  id: 'attr-lowercase',
  description: 'All attribute names must be in lowercase.',
  init: function(parser, reporter, options) {
    var self = this;
    var exceptions = Array.isArray(options) ? options : [];
    parser.addListener('tagstart', function(event) {
      var attrs = event.attrs,
        attr,
        col = event.col + event.tagName.length + 1;
      for (var i = 0, l = attrs.length; i < l; i++) {
        attr = attrs[i];
        var attrName = attr.name;
        if (
          !exceptions.find(exp => testAgainstStringOrRegExp(attrName, exp)) &&
          attrName !== attrName.toLowerCase()
        ) {
          reporter.error(
            'The attribute name of [ ' + attrName + ' ] must be in lowercase.',
            event.line,
            col + attr.index,
            self,
            attr.raw
          );
        }
      }
    });
  }
};
