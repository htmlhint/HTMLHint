"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk = require("chalk");
const events_1 = require("events");
const fs_1 = require("fs");
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
    const arrFiles = (0, fs_1.readdirSync)((0, path_1.join)(__dirname, './formatters'), {
        withFileTypes: true,
    })
        .filter((entry) => !entry.isDirectory() && entry.name.endsWith('.js'))
        .map((entry) => (0, path_1.join)('./formatters', entry.name));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWF0dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NsaS9mb3JtYXR0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrQkFBOEI7QUFDOUIsbUNBQXFDO0FBQ3JDLDJCQUFnQztBQUNoQywrQkFBMkM7QUFJM0MsSUFBSSxRQUEwQixDQUFBO0FBQzlCLElBQUksT0FBOEIsQ0FBQTtBQUdsQyxNQUFNLGFBQWEsR0FBRyxjQUFjLEVBQUUsQ0FBQTtBQUN0QyxNQUFNLHNCQUFzQixHQUFhLEVBQUUsQ0FBQTtBQUUzQyxLQUFLLE1BQU0sYUFBYSxJQUFJLGFBQWEsRUFBRTtJQUN6QyxJQUFJLGFBQWEsS0FBSyxTQUFTLEVBQUU7UUFDL0Isc0JBQXNCLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFBO0tBQzNDO0NBQ0Y7QUFHRCxTQUFTLGNBQWM7SUFDckIsTUFBTSxRQUFRLEdBQUcsSUFBQSxnQkFBVyxFQUFDLElBQUEsV0FBSSxFQUFDLFNBQVMsRUFBRSxjQUFjLENBQUMsRUFBRTtRQUM1RCxhQUFhLEVBQUUsSUFBSTtLQUNwQixDQUFDO1NBQ0MsTUFBTSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNyRSxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLElBQUEsV0FBSSxFQUFDLGNBQWMsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtJQUVuRCxNQUFNLGFBQWEsR0FBMEMsRUFBRSxDQUFBO0lBQy9ELFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUN4QixNQUFNLFFBQVEsR0FBRyxJQUFBLFlBQUssRUFBQyxJQUFJLENBQUMsQ0FBQTtRQUM1QixNQUFNLGFBQWEsR0FBRyxJQUFBLGNBQU8sRUFBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFDOUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUE7SUFDdkQsQ0FBQyxDQUFDLENBQUE7SUFFRixPQUFPLGFBQWEsQ0FBQTtBQUN0QixDQUFDO0FBeUNELE1BQU0sU0FBUyxHQUFjLElBQUkscUJBQVksRUFBZSxDQUFBO0FBRTVELFNBQVMsQ0FBQyxZQUFZLEdBQUc7SUFDdkIsT0FBTyxzQkFBc0IsQ0FBQTtBQUMvQixDQUFDLENBQUE7QUFFRCxTQUFTLENBQUMsSUFBSSxHQUFHLFVBQVUsV0FBVyxFQUFFLFVBQVU7SUFDaEQsUUFBUSxHQUFHLFdBQVcsQ0FBQTtJQUN0QixPQUFPLEdBQUcsVUFBVSxDQUFBO0FBQ3RCLENBQUMsQ0FBQTtBQUVELFNBQVMsQ0FBQyxTQUFTLEdBQUcsVUFBVSxNQUFNO0lBQ3BDLE1BQU0sWUFBWSxHQUFHLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUUxQyxJQUFJLFlBQVksS0FBSyxTQUFTLEVBQUU7UUFDOUIsT0FBTyxDQUFDLEdBQUcsQ0FDVCxLQUFLLENBQUMsR0FBRyxDQUFDLGtEQUFrRCxDQUFDLEVBQzdELHNCQUFzQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FDbEMsQ0FBQTtRQUNELE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7S0FDaEI7U0FBTTtRQUNMLFlBQVksQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFBO0tBQzNDO0FBQ0gsQ0FBQyxDQUFBO0FBUUQsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUEifQ==