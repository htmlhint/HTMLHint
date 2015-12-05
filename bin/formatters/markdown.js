/**
 * Copyright (c) 2015, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */
var markdownFormatter = function(formatter, HTMLHint) {
  formatter.on('end', function(event) {
    formatter.writeln('# TOC');
    var arrToc = [];
    var arrContents = [];
    var arrAllMessages = event.arrAllMessages;
    arrAllMessages.forEach(function(fileInfo) {
      var filePath = fileInfo.file;
      var arrMessages = fileInfo.messages;
      var errorCount = 0;
      var warningCount = 0;
      arrMessages.forEach(function(message) {
        if (message.type === 'error') {
          errorCount++;
        } else {
          warningCount++;
        }
      });

      arrToc.push('   - [' + filePath + '](#' + filePath + ')');
      arrContents.push('<a name="' + filePath + '" />');
      arrContents.push('# ' + filePath);
      arrContents.push('');
      arrContents.push('Found ' + errorCount + ' errors, ' + warningCount + ' warnings');
      var arrLogs = HTMLHint.format(arrMessages);
      arrContents.push('');
      arrLogs.forEach(function(log) {
        arrContents.push('    ' + log);
      });

      arrContents.push('');
    });

    formatter.writeln(arrToc.join('\r\n') + '\r\n');
    formatter.writeln(arrContents.join('\r\n'));
  });
};

module.exports = markdownFormatter;
