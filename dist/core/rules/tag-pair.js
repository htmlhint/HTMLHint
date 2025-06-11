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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnLXBhaXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29yZS9ydWxlcy90YWctcGFpci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBLGtCQUFlO0lBQ2IsRUFBRSxFQUFFLFVBQVU7SUFDZCxXQUFXLEVBQUUscUJBQXFCO0lBQ2xDLElBQUksQ0FBQyxNQUFNLEVBQUUsUUFBUTtRQUNuQixNQUFNLEtBQUssR0FBMEIsRUFBRSxDQUFBO1FBQ3ZDLE1BQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQ2pDLDRHQUE0RyxDQUM3RyxDQUFBO1FBRUQsTUFBTSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUN2QyxNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFBO1lBQzNDLElBQUksWUFBWSxDQUFDLE9BQU8sQ0FBQyxLQUFLLFNBQVMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDeEQsS0FBSyxDQUFDLElBQUksQ0FBQztvQkFDVCxPQUFPLEVBQUUsT0FBTztvQkFDaEIsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJO29CQUNoQixHQUFHLEVBQUUsS0FBSyxDQUFDLEdBQUc7b0JBQ2QsR0FBRyxFQUFFLEtBQUssQ0FBQyxHQUFHO2lCQUNmLENBQUMsQ0FBQTtZQUNKLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQTtRQUVGLE1BQU0sQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDckMsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQTtZQUczQyxJQUFJLEdBQUcsQ0FBQTtZQUNQLEtBQUssR0FBRyxHQUFHLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQztn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