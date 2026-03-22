"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_util_1 = require("node:util");
const defaultFormatter = function (formatter, HTMLHint, options) {
    const nocolor = !!options.nocolor;
    formatter.on('start', () => {
        console.log('');
    });
    formatter.on('config', (event) => {
        const configPath = event.configPath;
        console.log('   Config loaded: %s', nocolor ? configPath : (0, node_util_1.styleText)('cyan', configPath));
        console.log('');
    });
    formatter.on('file', (event) => {
        console.log(`   ${(0, node_util_1.styleText)('white', event.file)}`);
        const arrLogs = HTMLHint.format(event.messages, {
            colors: !nocolor,
            indent: 6,
        });
        arrLogs.forEach((str) => {
            console.log(str);
        });
        console.log('');
    });
    formatter.on('end', (event) => {
        const allFileCount = event.allFileCount;
        const allHintCount = event.allHintCount;
        const allHintFileCount = event.allHintFileCount;
        const time = event.time;
        let message;
        if (allHintCount > 0) {
            message = 'Scanned %d files, found %d errors in %d files (%d ms)';
            console.log(nocolor ? message : (0, node_util_1.styleText)('red', message), allFileCount, allHintCount, allHintFileCount, time);
        }
        else {
            message = 'Scanned %d files, no errors found (%d ms).';
            console.log(nocolor ? message : (0, node_util_1.styleText)('green', message), allFileCount, time);
        }
    });
};
module.exports = defaultFormatter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jbGkvZm9ybWF0dGVycy9kZWZhdWx0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEseUNBQXFDO0FBR3JDLE1BQU0sZ0JBQWdCLEdBQXNCLFVBQzFDLFNBQVMsRUFDVCxRQUFRLEVBQ1IsT0FBTztJQUVQLE1BQU0sT0FBTyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFBO0lBRWpDLFNBQVMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTtRQUN6QixPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFBO0lBQ2pCLENBQUMsQ0FBQyxDQUFBO0lBRUYsU0FBUyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUMvQixNQUFNLFVBQVUsR0FBRyxLQUFLLENBQUMsVUFBVyxDQUFBO1FBQ3BDLE9BQU8sQ0FBQyxHQUFHLENBQ1Qsc0JBQXNCLEVBQ3RCLE9BQU8sQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFBLHFCQUFTLEVBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUNyRCxDQUFBO1FBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUNqQixDQUFDLENBQUMsQ0FBQTtJQUVGLFNBQVMsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDN0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLElBQUEscUJBQVMsRUFBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUVuRCxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUU7WUFDOUMsTUFBTSxFQUFFLENBQUMsT0FBTztZQUNoQixNQUFNLEVBQUUsQ0FBQztTQUNWLENBQUMsQ0FBQTtRQUVGLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ2xCLENBQUMsQ0FBQyxDQUFBO1FBRUYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUNqQixDQUFDLENBQUMsQ0FBQTtJQUVGLFNBQVMsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDNUIsTUFBTSxZQUFZLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQTtRQUN2QyxNQUFNLFlBQVksR0FBRyxLQUFLLENBQUMsWUFBWSxDQUFBO1FBQ3ZDLE1BQU0sZ0JBQWdCLEdBQUcsS0FBSyxDQUFDLGdCQUFnQixDQUFBO1FBQy9DLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUE7UUFDdkIsSUFBSSxPQUFPLENBQUE7UUFFWCxJQUFJLFlBQVksR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUNyQixPQUFPLEdBQUcsdURBQXVELENBQUE7WUFDakUsT0FBTyxDQUFDLEdBQUcsQ0FDVCxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBQSxxQkFBUyxFQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsRUFDN0MsWUFBWSxFQUNaLFlBQVksRUFDWixnQkFBZ0IsRUFDaEIsSUFBSSxDQUNMLENBQUE7UUFDSCxDQUFDO2FBQU0sQ0FBQztZQUNOLE9BQU8sR0FBRyw0Q0FBNEMsQ0FBQTtZQUN0RCxPQUFPLENBQUMsR0FBRyxDQUNULE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFBLHFCQUFTLEVBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxFQUMvQyxZQUFZLEVBQ1osSUFBSSxDQUNMLENBQUE7UUFDSCxDQUFDO0lBQ0gsQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDLENBQUE7QUFFRCxNQUFNLENBQUMsT0FBTyxHQUFHLGdCQUFnQixDQUFBIn0=