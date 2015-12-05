/**
* Copyright (c) 2015, Yanis Wang <yanis.wang@gmail.com>
* MIT Licensed
*/
var defaultFormatter = function(formatter, HTMLHint, options) {
  var nocolor = options.nocolor;
  formatter.on('start', function() {
    formatter.writeln('');
  });

  formatter.on('config', function(event) {
    var configPath = event.configPath;
    formatter.writelnf('   Config loaded: %s', nocolor ? configPath : configPath.cyan);
    formatter.writeln('');
  });

  formatter.on('file', function(event) {
    formatter.writeln('   ' + event.file.white);
    var arrLogs = HTMLHint.format(event.messages, {
      colors: nocolor ? false : true,
      indent: 6,
    });
    arrLogs.forEach(function(str) {
      formatter.writeln(str);
    });

    formatter.writeln('');
  });

  formatter.on('end', function(event) {
    var allFileCount = event.allFileCount;
    var allHintCount = event.allHintCount;
    var allHintFileCount = event.allHintFileCount;
    var time = event.time;
    var message;
    if (allHintCount > 0) {
      message = 'Scan %d files, found %d errors in %d files (%d ms)';
      formatter.writelnf(nocolor ? message : message.red, allFileCount, allHintCount, allHintFileCount, time);
    } else {
      message = 'Scan %d files, without errors (%d ms).';
      formatter.writelnf(nocolor ? message : message.green, allFileCount, time);
    }
  });
};

module.exports = defaultFormatter;
