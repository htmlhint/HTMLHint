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
                    reporter.error(`Tag must be paired, missing: [ ${arrTags.join('')} ], start tag match failed [ ${lastEvent.raw} ] on line ${lastEvent.line}.`, event.line, event.col, this, event.raw);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnLXBhaXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29yZS9ydWxlcy90YWctcGFpci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBLGtCQUFlO0lBQ2IsRUFBRSxFQUFFLFVBQVU7SUFDZCxXQUFXLEVBQUUscUJBQXFCO0lBQ2xDLElBQUksQ0FBQyxNQUFNLEVBQUUsUUFBUTtRQUNuQixNQUFNLEtBQUssR0FBMEIsRUFBRSxDQUFBO1FBQ3ZDLE1BQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQ2pDLDRHQUE0RyxDQUM3RyxDQUFBO1FBRUQsTUFBTSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUN2QyxNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFBO1lBQzNDLElBQUksWUFBWSxDQUFDLE9BQU8sQ0FBQyxLQUFLLFNBQVMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUU7Z0JBQ3ZELEtBQUssQ0FBQyxJQUFJLENBQUM7b0JBQ1QsT0FBTyxFQUFFLE9BQU87b0JBQ2hCLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSTtvQkFDaEIsR0FBRyxFQUFFLEtBQUssQ0FBQyxHQUFHO2lCQUNmLENBQUMsQ0FBQTthQUNIO1FBQ0gsQ0FBQyxDQUFDLENBQUE7UUFFRixNQUFNLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ3JDLE1BQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUE7WUFHM0MsSUFBSSxHQUFHLENBQUE7WUFDUCxLQUFLLEdBQUcsR0FBRyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFO2dCQUM1QyxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLEtBQUssT0FBTyxFQUFFO29CQUNsQyxNQUFLO2lCQUNOO2FBQ0Y7WUFFRCxJQUFJLEdBQUcsSUFBSSxDQUFDLEVBQUU7Z0JBQ1osTUFBTSxPQUFPLEdBQUcsRUFBRSxDQUFBO2dCQUNsQixLQUFLLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQzNDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQTtpQkFDdkM7Z0JBRUQsSUFBSSxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtvQkFDdEIsTUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUE7b0JBQ3pDLFFBQVEsQ0FBQyxLQUFLLENBQ1osa0NBQWtDLE9BQU8sQ0FBQyxJQUFJLENBQzVDLEVBQUUsQ0FDSCxnQ0FBZ0MsU0FBUyxDQUFDLEdBQUcsY0FDNUMsU0FBUyxDQUFDLElBQ1osR0FBRyxFQUNILEtBQUssQ0FBQyxJQUFJLEVBQ1YsS0FBSyxDQUFDLEdBQUcsRUFDVCxJQUFJLEVBQ0osS0FBSyxDQUFDLEdBQUcsQ0FDVixDQUFBO2lCQUNGO2dCQUNELEtBQUssQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFBO2FBQ25CO2lCQUFNO2dCQUNMLFFBQVEsQ0FBQyxLQUFLLENBQ1osdUNBQXVDLEtBQUssQ0FBQyxHQUFHLElBQUksRUFDcEQsS0FBSyxDQUFDLElBQUksRUFDVixLQUFLLENBQUMsR0FBRyxFQUNULElBQUksRUFDSixLQUFLLENBQUMsR0FBRyxDQUNWLENBQUE7YUFDRjtRQUNILENBQUMsQ0FBQyxDQUFBO1FBRUYsTUFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNsQyxNQUFNLE9BQU8sR0FBRyxFQUFFLENBQUE7WUFFbEIsS0FBSyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUMxQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUE7YUFDdkM7WUFFRCxJQUFJLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUN0QixNQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQTtnQkFDekMsUUFBUSxDQUFDLEtBQUssQ0FDWixrQ0FBa0MsT0FBTyxDQUFDLElBQUksQ0FDNUMsRUFBRSxDQUNILCtCQUErQixTQUFTLENBQUMsR0FBRyxjQUMzQyxTQUFTLENBQUMsSUFDWixHQUFHLEVBQ0gsS0FBSyxDQUFDLElBQUksRUFDVixLQUFLLENBQUMsR0FBRyxFQUNULElBQUksRUFDSixFQUFFLENBQ0gsQ0FBQTthQUNGO1FBQ0gsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0NBQ00sQ0FBQSJ9