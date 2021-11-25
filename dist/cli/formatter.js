"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk = require("chalk");
var events_1 = require("events");
var glob_1 = require("glob");
var path_1 = require("path");
var HTMLHint;
var options;
var mapFormatters = loadFormatters();
var arrSupportedFormatters = [];
for (var formatterName in mapFormatters) {
    if (formatterName !== 'default') {
        arrSupportedFormatters.push(formatterName);
    }
}
function loadFormatters() {
    var arrFiles = (0, glob_1.sync)('./formatters/*.js', {
        cwd: __dirname,
        dot: false,
        nodir: true,
        strict: false,
        silent: true,
    });
    var mapFormatters = {};
    arrFiles.forEach(function (file) {
        var fileInfo = (0, path_1.parse)(file);
        var formatterPath = (0, path_1.resolve)(__dirname, file);
        mapFormatters[fileInfo.name] = require(formatterPath);
    });
    return mapFormatters;
}
var formatter = new events_1.EventEmitter();
formatter.getSupported = function () {
    return arrSupportedFormatters;
};
formatter.init = function (tmpHTMLHint, tmpOptions) {
    HTMLHint = tmpHTMLHint;
    options = tmpOptions;
};
formatter.setFormat = function (format) {
    var formatHandel = mapFormatters[format];
    if (formatHandel === undefined) {
        console.log(chalk.red('No supported formatter, supported formatters: %s'), arrSupportedFormatters.join(', '));
        process.exit(1);
    }
    else {
        formatHandel(formatter, HTMLHint, options);
    }
};
module.exports = formatter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWF0dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NsaS9mb3JtYXR0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2QkFBOEI7QUFDOUIsaUNBQXFDO0FBQ3JDLDZCQUF1QztBQUN2Qyw2QkFBcUM7QUFJckMsSUFBSSxRQUEwQixDQUFBO0FBQzlCLElBQUksT0FBOEIsQ0FBQTtBQUdsQyxJQUFNLGFBQWEsR0FBRyxjQUFjLEVBQUUsQ0FBQTtBQUN0QyxJQUFNLHNCQUFzQixHQUFhLEVBQUUsQ0FBQTtBQUUzQyxLQUFLLElBQU0sYUFBYSxJQUFJLGFBQWEsRUFBRTtJQUN6QyxJQUFJLGFBQWEsS0FBSyxTQUFTLEVBQUU7UUFDL0Isc0JBQXNCLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFBO0tBQzNDO0NBQ0Y7QUFHRCxTQUFTLGNBQWM7SUFDckIsSUFBTSxRQUFRLEdBQUcsSUFBQSxXQUFRLEVBQUMsbUJBQW1CLEVBQUU7UUFDN0MsR0FBRyxFQUFFLFNBQVM7UUFDZCxHQUFHLEVBQUUsS0FBSztRQUNWLEtBQUssRUFBRSxJQUFJO1FBQ1gsTUFBTSxFQUFFLEtBQUs7UUFDYixNQUFNLEVBQUUsSUFBSTtLQUNiLENBQUMsQ0FBQTtJQUVGLElBQU0sYUFBYSxHQUEwQyxFQUFFLENBQUE7SUFDL0QsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQUk7UUFDcEIsSUFBTSxRQUFRLEdBQUcsSUFBQSxZQUFLLEVBQUMsSUFBSSxDQUFDLENBQUE7UUFDNUIsSUFBTSxhQUFhLEdBQUcsSUFBQSxjQUFPLEVBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFBO1FBQzlDLGFBQWEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFBO0lBQ3ZELENBQUMsQ0FBQyxDQUFBO0lBRUYsT0FBTyxhQUFhLENBQUE7QUFDdEIsQ0FBQztBQXlDRCxJQUFNLFNBQVMsR0FBYyxJQUFJLHFCQUFZLEVBQWUsQ0FBQTtBQUU1RCxTQUFTLENBQUMsWUFBWSxHQUFHO0lBQ3ZCLE9BQU8sc0JBQXNCLENBQUE7QUFDL0IsQ0FBQyxDQUFBO0FBRUQsU0FBUyxDQUFDLElBQUksR0FBRyxVQUFVLFdBQVcsRUFBRSxVQUFVO0lBQ2hELFFBQVEsR0FBRyxXQUFXLENBQUE7SUFDdEIsT0FBTyxHQUFHLFVBQVUsQ0FBQTtBQUN0QixDQUFDLENBQUE7QUFFRCxTQUFTLENBQUMsU0FBUyxHQUFHLFVBQVUsTUFBTTtJQUNwQyxJQUFNLFlBQVksR0FBRyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUE7SUFFMUMsSUFBSSxZQUFZLEtBQUssU0FBUyxFQUFFO1FBQzlCLE9BQU8sQ0FBQyxHQUFHLENBQ1QsS0FBSyxDQUFDLEdBQUcsQ0FBQyxrREFBa0QsQ0FBQyxFQUM3RCxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQ2xDLENBQUE7UUFDRCxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO0tBQ2hCO1NBQU07UUFDTCxZQUFZLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQTtLQUMzQztBQUNILENBQUMsQ0FBQTtBQVFELE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFBIn0=