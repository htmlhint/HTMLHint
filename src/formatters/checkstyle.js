var xmlEscapes = {
    '"': '&quot;',
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;'
};
var regexUnescapedXml = /[\"&><]/g;
function escapeXmlChar(match) {
    return xmlEscapes[match];
}
function escape(str) {
    return str ? str.replace(regexUnescapedXml, escapeXmlChar): '';
}

module.exports = {
    start: function () {
        return '<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<checkstyle>';
    },
    format: function (results, filename) {
        var output = [], length = results.length, result;
        if (results.length > 0) {
            output.push('\t<file name="' + filename + '">\n');
            for (var i = 0; i < length; i++) {
                result = results[i];
                output.push('\t\t<error' +
                    ' line="' + result.line + '"' +
                    ' column="' + result.col + '"' +
                    ' severity="' + result.type + '"' +
                    ' message="' + escape(result.message) + '"' +
                    ' source="htmlhint.' + result.rule.id + '"/>\n');
            }
            output.push('\t</file>');
        }
        return output.join('');
    },
    end: function () {
        return "</checkstyle>";
    }
};
