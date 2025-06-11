"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    id: 'tag-self-close',
    description: 'Empty tags must be self closed.',
    init(parser, reporter) {
        const mapEmptyTags = parser.makeMap('area,base,basefont,bgsound,br,col,frame,hr,img,input,isindex,link,meta,param,embed,track,command,source,keygen,wbr');
        parser.addListener('tagstart', (event) => {
            const tagName = event.tagName.toLowerCase();
            if (mapEmptyTags[tagName] !== undefined) {
                if (!event.close) {
                    reporter.warn(`The empty tag : [ ${tagName} ] must be self closed.`, event.line, event.col, this, event.raw);
                }
            }
        });
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnLXNlbGYtY2xvc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29yZS9ydWxlcy90YWctc2VsZi1jbG9zZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLGtCQUFlO0lBQ2IsRUFBRSxFQUFFLGdCQUFnQjtJQUNwQixXQUFXLEVBQUUsaUNBQWlDO0lBQzlDLElBQUksQ0FBQyxNQUFNLEVBQUUsUUFBUTtRQUNuQixNQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsT0FBTyxDQUNqQyxvSEFBb0gsQ0FDckgsQ0FBQTtRQUVELE1BQU0sQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDdkMsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQTtZQUMzQyxJQUFJLFlBQVksQ0FBQyxPQUFPLENBQUMsS0FBSyxTQUFTLEVBQUUsQ0FBQztnQkFDeEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFDakIsUUFBUSxDQUFDLElBQUksQ0FDWCxxQkFBcUIsT0FBTyx5QkFBeUIsRUFDckQsS0FBSyxDQUFDLElBQUksRUFDVixLQUFLLENBQUMsR0FBRyxFQUNULElBQUksRUFDSixLQUFLLENBQUMsR0FBRyxDQUNWLENBQUE7Z0JBQ0gsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FDTSxDQUFBIn0=