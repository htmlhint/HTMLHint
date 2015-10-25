var path = require('path');
var events = require('events');
var glob = require('glob');

var mapFormatters;
var arrSupportedFormatters;
var HTMLHint;
var options;

// load formatters
mapFormatters = loadFormatters();
arrSupportedFormatters = [];
for(var formatterName in mapFormatters){
    if(formatterName !== 'default'){
        arrSupportedFormatters.push(formatterName);
    }
}

// load all formatters
function loadFormatters(){
    var arrFiles = glob.sync('./formatters/*.js', {
        'cwd': __dirname,
        'dot': false,
        'nodir': true,
        'strict': false,
        'silent': true
    });
    var mapFormatters = {};
    arrFiles.forEach(function(file){
        var fileInfo = path.parse(file);
        var formatterPath = path.resolve(__dirname, file);
        mapFormatters[fileInfo.name] = require(formatterPath);
    });
    return mapFormatters;
}

var formatter =new events.EventEmitter();
formatter.getSupported = function(){
    return arrSupportedFormatters;
}
formatter.init = function(tmpHTMLHint, tmpOptions){
    HTMLHint = tmpHTMLHint;
    options = tmpOptions;
}
formatter.setFormat = function(format){
    var formatHandel = mapFormatters[format];
    if(formatHandel === undefined){
        console.log('No supported formatter, supported formatters: %s'.red, arrSupportedFormatters.join(', '));
        process.exit(1);
    }
    else{
        formatHandel(formatter, HTMLHint, options)
    }
}

module.exports = formatter;
