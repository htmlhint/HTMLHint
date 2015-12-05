/**
 * Copyright (c) 2015, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */
var unixFormatter = function(formatter, HTMLHint, options) {
  var nocolor = options.nocolor;
  formatter.on('file', function(event) {
    event.messages.forEach(function(message) {
      formatter.writeln([
          event.file,
          message.line,
          message.col,
          ' ' + message.message + ' [' + message.type + '/' + message.rule.id + ']',
      ].join(':'));
    });
  });

  formatter.on('end', function(event) {
    var allHintCount = event.allHintCount;
    if (allHintCount > 0) {
      formatter.writeln('');
      var message = '%d problems';
      formatter.writelnf(nocolor ? message : message.red, event.allHintCount);
    }
  });
};

module.exports = unixFormatter;
