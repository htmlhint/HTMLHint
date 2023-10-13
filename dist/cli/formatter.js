"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const events_1 = require("events");
const glob_1 = require("glob");
const path_1 = require("path");
let HTMLHint;
let options;
const mapFormatters = loadFormatters();
const arrSupportedFormatters = [];
for (const formatterName in mapFormatters) {
    if (formatterName !== 'default') {
        arrSupportedFormatters.push(formatterName);
    }
}
function loadFormatters() {
    const arrFiles = (0, glob_1.sync)('./formatters/*.js', {
        cwd: __dirname,
        dot: false,
        nodir: true,
        strict: false,
        silent: true,
    });
    const mapFormatters = {};
    arrFiles.forEach((file) => {
        const fileInfo = (0, path_1.parse)(file);
        const formatterPath = (0, path_1.resolve)(__dirname, file);
        mapFormatters[fileInfo.name] = require(formatterPath);
    });
    return mapFormatters;
}
const formatter = new events_1.EventEmitter();
formatter.getSupported = function () {
    return arrSupportedFormatters;
};
formatter.init = function (tmpHTMLHint, tmpOptions) {
    HTMLHint = tmpHTMLHint;
    options = tmpOptions;
};
formatter.setFormat = function (format) {
    const formatHandel = mapFormatters[format];
    if (formatHandel === undefined) {
        console.log(chalk_1.default.red('No supported formatter, supported formatters: %s'), arrSupportedFormatters.join(', '));
        process.exit(1);
    }
    else {
        formatHandel(formatter, HTMLHint, options);
    }
};
module.exports = formatter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWF0dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NsaS9mb3JtYXR0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxrREFBeUI7QUFDekIsbUNBQXFDO0FBQ3JDLCtCQUF1QztBQUN2QywrQkFBcUM7QUFJckMsSUFBSSxRQUEwQixDQUFBO0FBQzlCLElBQUksT0FBOEIsQ0FBQTtBQUdsQyxNQUFNLGFBQWEsR0FBRyxjQUFjLEVBQUUsQ0FBQTtBQUN0QyxNQUFNLHNCQUFzQixHQUFhLEVBQUUsQ0FBQTtBQUUzQyxLQUFLLE1BQU0sYUFBYSxJQUFJLGFBQWEsRUFBRTtJQUN6QyxJQUFJLGFBQWEsS0FBSyxTQUFTLEVBQUU7UUFDL0Isc0JBQXNCLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFBO0tBQzNDO0NBQ0Y7QUFHRCxTQUFTLGNBQWM7SUFDckIsTUFBTSxRQUFRLEdBQUcsSUFBQSxXQUFRLEVBQUMsbUJBQW1CLEVBQUU7UUFDN0MsR0FBRyxFQUFFLFNBQVM7UUFDZCxHQUFHLEVBQUUsS0FBSztRQUNWLEtBQUssRUFBRSxJQUFJO1FBQ1gsTUFBTSxFQUFFLEtBQUs7UUFDYixNQUFNLEVBQUUsSUFBSTtLQUNiLENBQUMsQ0FBQTtJQUVGLE1BQU0sYUFBYSxHQUEwQyxFQUFFLENBQUE7SUFDL0QsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ3hCLE1BQU0sUUFBUSxHQUFHLElBQUEsWUFBSyxFQUFDLElBQUksQ0FBQyxDQUFBO1FBQzVCLE1BQU0sYUFBYSxHQUFHLElBQUEsY0FBTyxFQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQTtRQUM5QyxhQUFhLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQTtJQUN2RCxDQUFDLENBQUMsQ0FBQTtJQUVGLE9BQU8sYUFBYSxDQUFBO0FBQ3RCLENBQUM7QUF5Q0QsTUFBTSxTQUFTLEdBQWMsSUFBSSxxQkFBWSxFQUFlLENBQUE7QUFFNUQsU0FBUyxDQUFDLFlBQVksR0FBRztJQUN2QixPQUFPLHNCQUFzQixDQUFBO0FBQy9CLENBQUMsQ0FBQTtBQUVELFNBQVMsQ0FBQyxJQUFJLEdBQUcsVUFBVSxXQUFXLEVBQUUsVUFBVTtJQUNoRCxRQUFRLEdBQUcsV0FBVyxDQUFBO0lBQ3RCLE9BQU8sR0FBRyxVQUFVLENBQUE7QUFDdEIsQ0FBQyxDQUFBO0FBRUQsU0FBUyxDQUFDLFNBQVMsR0FBRyxVQUFVLE1BQU07SUFDcEMsTUFBTSxZQUFZLEdBQUcsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBRTFDLElBQUksWUFBWSxLQUFLLFNBQVMsRUFBRTtRQUM5QixPQUFPLENBQUMsR0FBRyxDQUNULGVBQUssQ0FBQyxHQUFHLENBQUMsa0RBQWtELENBQUMsRUFDN0Qsc0JBQXNCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUNsQyxDQUFBO1FBQ0QsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtLQUNoQjtTQUFNO1FBQ0wsWUFBWSxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUE7S0FDM0M7QUFDSCxDQUFDLENBQUE7QUFRRCxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQSJ9