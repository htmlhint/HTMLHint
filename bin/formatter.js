var path = require('path');
var events = require('events');
var glob = require('glob');
var util = require('util');

var mapFormatters;
var arrSupportedFormatters;
var HTMLHint;
var options;

// load formatters
mapFormatters = loadFormatters();
arrSupportedFormatters = [];
for (var formatterName in mapFormatters) {
  if (formatterName !== 'default') {
    arrSupportedFormatters.push(formatterName);
  }
}

// load all formatters
function loadFormatters() {
  var arrFiles = glob.sync('./formatters/*.js', {
    cwd: __dirname,
    dot: false,
    nodir: true,
    strict: false,
    silent: true,
  });
  var mapFormatters = {};
  arrFiles.forEach(function(file) {
    var fileInfo = path.parse(file);
    var formatterPath = path.resolve(__dirname, file);
    mapFormatters[fileInfo.name] = require(formatterPath);
  });

  return mapFormatters;
}

var formatter = new events.EventEmitter();
formatter.getSupported = function() {
  return arrSupportedFormatters;
};

formatter.init = function(tmpHTMLHint, tmpOptions) {
  HTMLHint = tmpHTMLHint;
  options = tmpOptions;
};

formatter.setFormat = function(format) {
  var formatHandel = mapFormatters[format];
  if (formatHandel === undefined) {
    formatter.writeln('No supported formatter, supported formatters: %s'.red, arrSupportedFormatters.join(', '));
    process.exit(1);
  } else {
    formatHandel(formatter, HTMLHint, options);
  }
};

formatter.unflushedWrites = 0;
formatter.writelnf = function() {
  formatter.writeln(util.format.apply(null, arguments));
};

formatter.writeln = function(str) {
  formatter.unflushedWrites++;
  process.stdout.write(str + '\n', function() {
    formatter.unflushedWrites--;
    if(formatter.writesFinished) {
      formatter.emit('done');
    }
  });
};

Object.defineProperty(formatter, 'writesFinished', {
  get: function() {
    return formatter.unflushedWrites === 0;
  },
});

module.exports = formatter;
