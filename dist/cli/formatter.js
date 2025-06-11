"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk = require("chalk");
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
        console.log(chalk.red('No supported formatter, supported formatters: %s'), arrSupportedFormatters.join(', '));
        process.exit(1);
    }
    else {
        formatHandel(formatter, HTMLHint, options);
    }
};
module.exports = formatter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWF0dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NsaS9mb3JtYXR0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrQkFBOEI7QUFDOUIsbUNBQXFDO0FBQ3JDLCtCQUF1QztBQUN2QywrQkFBcUM7QUFJckMsSUFBSSxRQUEwQixDQUFBO0FBQzlCLElBQUksT0FBOEIsQ0FBQTtBQUdsQyxNQUFNLGFBQWEsR0FBRyxjQUFjLEVBQUUsQ0FBQTtBQUN0QyxNQUFNLHNCQUFzQixHQUFhLEVBQUUsQ0FBQTtBQUUzQyxLQUFLLE1BQU0sYUFBYSxJQUFJLGFBQWEsRUFBRSxDQUFDO0lBQzFDLElBQUksYUFBYSxLQUFLLFNBQVMsRUFBRSxDQUFDO1FBQ2hDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQTtJQUM1QyxDQUFDO0FBQ0gsQ0FBQztBQUdELFNBQVMsY0FBYztJQUNyQixNQUFNLFFBQVEsR0FBRyxJQUFBLFdBQVEsRUFBQyxtQkFBbUIsRUFBRTtRQUM3QyxHQUFHLEVBQUUsU0FBUztRQUNkLEdBQUcsRUFBRSxLQUFLO1FBQ1YsS0FBSyxFQUFFLElBQUk7UUFDWCxNQUFNLEVBQUUsS0FBSztRQUNiLE1BQU0sRUFBRSxJQUFJO0tBQ2IsQ0FBQyxDQUFBO0lBRUYsTUFBTSxhQUFhLEdBQTBDLEVBQUUsQ0FBQTtJQUMvRCxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDeEIsTUFBTSxRQUFRLEdBQUcsSUFBQSxZQUFLLEVBQUMsSUFBSSxDQUFDLENBQUE7UUFDNUIsTUFBTSxhQUFhLEdBQUcsSUFBQSxjQUFPLEVBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFBO1FBQzlDLGFBQWEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFBO0lBQ3ZELENBQUMsQ0FBQyxDQUFBO0lBRUYsT0FBTyxhQUFhLENBQUE7QUFDdEIsQ0FBQztBQXlDRCxNQUFNLFNBQVMsR0FBYyxJQUFJLHFCQUFZLEVBQWUsQ0FBQTtBQUU1RCxTQUFTLENBQUMsWUFBWSxHQUFHO0lBQ3ZCLE9BQU8sc0JBQXNCLENBQUE7QUFDL0IsQ0FBQyxDQUFBO0FBRUQsU0FBUyxDQUFDLElBQUksR0FBRyxVQUFVLFdBQVcsRUFBRSxVQUFVO0lBQ2hELFFBQVEsR0FBRyxXQUFXLENBQUE7SUFDdEIsT0FBTyxHQUFHLFVBQVUsQ0FBQTtBQUN0QixDQUFDLENBQUE7QUFFRCxTQUFTLENBQUMsU0FBUyxHQUFHLFVBQVUsTUFBTTtJQUNwQyxNQUFNLFlBQVksR0FBRyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUE7SUFFMUMsSUFBSSxZQUFZLEtBQUssU0FBUyxFQUFFLENBQUM7UUFDL0IsT0FBTyxDQUFDLEdBQUcsQ0FDVCxLQUFLLENBQUMsR0FBRyxDQUFDLGtEQUFrRCxDQUFDLEVBQzdELHNCQUFzQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FDbEMsQ0FBQTtRQUNELE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDakIsQ0FBQztTQUFNLENBQUM7UUFDTixZQUFZLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQTtJQUM1QyxDQUFDO0FBQ0gsQ0FBQyxDQUFBO0FBUUQsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUEifQ==