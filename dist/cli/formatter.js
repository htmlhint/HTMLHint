"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatter = void 0;
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
exports.formatter = new events_1.EventEmitter();
exports.formatter.getSupported = function () {
    return arrSupportedFormatters;
};
exports.formatter.init = function (tmpHTMLHint, tmpOptions) {
    HTMLHint = tmpHTMLHint;
    options = tmpOptions;
};
exports.formatter.setFormat = function (format) {
    const formatHandel = mapFormatters[format];
    if (formatHandel === undefined) {
        console.log(chalk.red('No supported formatter, supported formatters: %s'), arrSupportedFormatters.join(', '));
        process.exit(1);
    }
    else {
        formatHandel(exports.formatter, HTMLHint, options);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWF0dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NsaS9mb3JtYXR0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0JBQThCO0FBQzlCLG1DQUFxQztBQUNyQywrQkFBdUM7QUFDdkMsK0JBQXFDO0FBSXJDLElBQUksUUFBMEIsQ0FBQTtBQUM5QixJQUFJLE9BQThCLENBQUE7QUFHbEMsTUFBTSxhQUFhLEdBQUcsY0FBYyxFQUFFLENBQUE7QUFDdEMsTUFBTSxzQkFBc0IsR0FBYSxFQUFFLENBQUE7QUFFM0MsS0FBSyxNQUFNLGFBQWEsSUFBSSxhQUFhLEVBQUU7SUFDekMsSUFBSSxhQUFhLEtBQUssU0FBUyxFQUFFO1FBQy9CLHNCQUFzQixDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQTtLQUMzQztDQUNGO0FBR0QsU0FBUyxjQUFjO0lBQ3JCLE1BQU0sUUFBUSxHQUFHLElBQUEsV0FBUSxFQUFDLG1CQUFtQixFQUFFO1FBQzdDLEdBQUcsRUFBRSxTQUFTO1FBQ2QsR0FBRyxFQUFFLEtBQUs7UUFDVixLQUFLLEVBQUUsSUFBSTtRQUNYLE1BQU0sRUFBRSxLQUFLO1FBQ2IsTUFBTSxFQUFFLElBQUk7S0FDYixDQUFDLENBQUE7SUFFRixNQUFNLGFBQWEsR0FBMEMsRUFBRSxDQUFBO0lBQy9ELFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUN4QixNQUFNLFFBQVEsR0FBRyxJQUFBLFlBQUssRUFBQyxJQUFJLENBQUMsQ0FBQTtRQUM1QixNQUFNLGFBQWEsR0FBRyxJQUFBLGNBQU8sRUFBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFDOUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUE7SUFDdkQsQ0FBQyxDQUFDLENBQUE7SUFFRixPQUFPLGFBQWEsQ0FBQTtBQUN0QixDQUFDO0FBeUNZLFFBQUEsU0FBUyxHQUFjLElBQUkscUJBQVksRUFBZSxDQUFBO0FBRW5FLGlCQUFTLENBQUMsWUFBWSxHQUFHO0lBQ3ZCLE9BQU8sc0JBQXNCLENBQUE7QUFDL0IsQ0FBQyxDQUFBO0FBRUQsaUJBQVMsQ0FBQyxJQUFJLEdBQUcsVUFBVSxXQUFXLEVBQUUsVUFBVTtJQUNoRCxRQUFRLEdBQUcsV0FBVyxDQUFBO0lBQ3RCLE9BQU8sR0FBRyxVQUFVLENBQUE7QUFDdEIsQ0FBQyxDQUFBO0FBRUQsaUJBQVMsQ0FBQyxTQUFTLEdBQUcsVUFBVSxNQUFNO0lBQ3BDLE1BQU0sWUFBWSxHQUFHLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUUxQyxJQUFJLFlBQVksS0FBSyxTQUFTLEVBQUU7UUFDOUIsT0FBTyxDQUFDLEdBQUcsQ0FDVCxLQUFLLENBQUMsR0FBRyxDQUFDLGtEQUFrRCxDQUFDLEVBQzdELHNCQUFzQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FDbEMsQ0FBQTtRQUNELE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7S0FDaEI7U0FBTTtRQUNMLFlBQVksQ0FBQyxpQkFBUyxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQTtLQUMzQztBQUNILENBQUMsQ0FBQSJ9