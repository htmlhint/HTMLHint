"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    id: 'tag-pair',
    description: 'Tag must be paired.',
    init(parser, reporter) {
        const stack = [];
        const mapEmptyTags = parser.makeMap('area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed,track,command,source,keygen,wbr');
        parser.addListener('tagstart', (event) => {
            const tagName = event.tagName.toLowerCase();
            if (mapEmptyTags[tagName] === undefined && !event.close) {
                stack.push({
                    tagName: tagName,
                    line: event.line,
                    col: event.col,
                    raw: event.raw,
                });
            }
        });
        parser.addListener('tagend', (event) => {
            const tagName = event.tagName.toLowerCase();
            let pos;
            for (pos = stack.length - 1; pos >= 0; pos--) {
                if (stack[pos].tagName === tagName) {
                    break;
                }
            }
            if (pos >= 0) {
                const arrTags = [];
                for (let i = stack.length - 1; i > pos; i--) {
                    arrTags.push(`</${stack[i].tagName}>`);
                }
                if (arrTags.length > 0) {
                    const lastEvent = stack[stack.length - 1];
                    reporter.error(`Tag must be paired, missing: [ ${arrTags.join('')} ], start tag match failed [ ${lastEvent.raw} ] on line ${lastEvent.line}.`, lastEvent.line || event.line, lastEvent.col || event.col, this, event.raw);
                }
                stack.length = pos;
            }
            else {
                reporter.error(`Tag must be paired, no start tag: [ ${event.raw} ]`, event.line, event.col, this, event.raw);
            }
        });
        parser.addListener('end', (event) => {
            const arrTags = [];
            for (let i = stack.length - 1; i >= 0; i--) {
                arrTags.push(`</${stack[i].tagName}>`);
            }
            if (arrTags.length > 0) {
                const lastEvent = stack[stack.length - 1];
                reporter.error(`Tag must be paired, missing: [ ${arrTags.join('')} ], open tag match failed [ ${lastEvent.raw} ] on line ${lastEvent.line}.`, event.line, event.col, this, '');
            }
        });
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnLXBhaXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29yZS9ydWxlcy90YWctcGFpci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBLGtCQUFlO0lBQ2IsRUFBRSxFQUFFLFVBQVU7SUFDZCxXQUFXLEVBQUUscUJBQXFCO0lBQ2xDLElBQUksQ0FBQyxNQUFNLEVBQUUsUUFBUTtRQUNuQixNQUFNLEtBQUssR0FBMEIsRUFBRSxDQUFBO1FBQ3ZDLE1BQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQ2pDLDRHQUE0RyxDQUM3RyxDQUFBO1FBRUQsTUFBTSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUN2QyxNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFBO1lBQzNDLElBQUksWUFBWSxDQUFDLE9BQU8sQ0FBQyxLQUFLLFNBQVMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUU7Z0JBQ3ZELEtBQUssQ0FBQyxJQUFJLENBQUM7b0JBQ1QsT0FBTyxFQUFFLE9BQU87b0JBQ2hCLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSTtvQkFDaEIsR0FBRyxFQUFFLEtBQUssQ0FBQyxHQUFHO29CQUNkLEdBQUcsRUFBRSxLQUFLLENBQUMsR0FBRztpQkFDZixDQUFDLENBQUE7YUFDSDtRQUNILENBQUMsQ0FBQyxDQUFBO1FBRUYsTUFBTSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNyQyxNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFBO1lBRzNDLElBQUksR0FBRyxDQUFBO1lBQ1AsS0FBSyxHQUFHLEdBQUcsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFBRTtnQkFDNUMsSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxLQUFLLE9BQU8sRUFBRTtvQkFDbEMsTUFBSztpQkFDTjthQUNGO1lBRUQsSUFBSSxHQUFHLElBQUksQ0FBQyxFQUFFO2dCQUNaLE1BQU0sT0FBTyxHQUFHLEVBQUUsQ0FBQTtnQkFDbEIsS0FBSyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUMzQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUE7aUJBQ3ZDO2dCQUVELElBQUksT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7b0JBQ3RCLE1BQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFBO29CQUN6QyxRQUFRLENBQUMsS0FBSyxDQUNaLGtDQUFrQyxPQUFPLENBQUMsSUFBSSxDQUM1QyxFQUFFLENBQ0gsZ0NBQWdDLFNBQVMsQ0FBQyxHQUFHLGNBQzVDLFNBQVMsQ0FBQyxJQUNaLEdBQUcsRUFDSCxTQUFTLENBQUMsSUFBSSxJQUFJLEtBQUssQ0FBQyxJQUFJLEVBQzVCLFNBQVMsQ0FBQyxHQUFHLElBQUksS0FBSyxDQUFDLEdBQUcsRUFDMUIsSUFBSSxFQUNKLEtBQUssQ0FBQyxHQUFHLENBQ1YsQ0FBQTtpQkFDRjtnQkFDRCxLQUFLLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQTthQUNuQjtpQkFBTTtnQkFDTCxRQUFRLENBQUMsS0FBSyxDQUNaLHVDQUF1QyxLQUFLLENBQUMsR0FBRyxJQUFJLEVBQ3BELEtBQUssQ0FBQyxJQUFJLEVBQ1YsS0FBSyxDQUFDLEdBQUcsRUFDVCxJQUFJLEVBQ0osS0FBSyxDQUFDLEdBQUcsQ0FDVixDQUFBO2FBQ0Y7UUFDSCxDQUFDLENBQUMsQ0FBQTtRQUVGLE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDbEMsTUFBTSxPQUFPLEdBQUcsRUFBRSxDQUFBO1lBRWxCLEtBQUssSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDMUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFBO2FBQ3ZDO1lBRUQsSUFBSSxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDdEIsTUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUE7Z0JBQ3pDLFFBQVEsQ0FBQyxLQUFLLENBQ1osa0NBQWtDLE9BQU8sQ0FBQyxJQUFJLENBQzVDLEVBQUUsQ0FDSCwrQkFBK0IsU0FBUyxDQUFDLEdBQUcsY0FDM0MsU0FBUyxDQUFDLElBQ1osR0FBRyxFQUNILEtBQUssQ0FBQyxJQUFJLEVBQ1YsS0FBSyxDQUFDLEdBQUcsRUFDVCxJQUFJLEVBQ0osRUFBRSxDQUNILENBQUE7YUFDRjtRQUNILENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNNLENBQUEifQ==