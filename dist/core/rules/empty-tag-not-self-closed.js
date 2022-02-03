"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    id: 'empty-tag-not-self-closed',
    description: 'Empty tags must not use self closed syntax.',
    init(parser, reporter) {
        const mapEmptyTags = parser.makeMap('area,base,basefont,bgsound,br,col,frame,hr,img,input,isindex,link,meta,param,embed,track,command,source,keygen,wbr');
        parser.addListener('tagstart', (event) => {
            const tagName = event.tagName.toLowerCase();
            if (mapEmptyTags[tagName] !== undefined) {
                if (event.close) {
                    reporter.error(`The empty tag : [ ${tagName} ] must not use self closed syntax.`, event.line, event.col, this, event.raw);
                }
            }
        });
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1wdHktdGFnLW5vdC1zZWxmLWNsb3NlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb3JlL3J1bGVzL2VtcHR5LXRhZy1ub3Qtc2VsZi1jbG9zZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSxrQkFBZTtJQUNiLEVBQUUsRUFBRSwyQkFBMkI7SUFDL0IsV0FBVyxFQUFFLDZDQUE2QztJQUMxRCxJQUFJLENBQUMsTUFBTSxFQUFFLFFBQVE7UUFDbkIsTUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FDakMsb0hBQW9ILENBQ3JILENBQUE7UUFFRCxNQUFNLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ3ZDLE1BQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUE7WUFDM0MsSUFBSSxZQUFZLENBQUMsT0FBTyxDQUFDLEtBQUssU0FBUyxFQUFFO2dCQUN2QyxJQUFJLEtBQUssQ0FBQyxLQUFLLEVBQUU7b0JBQ2YsUUFBUSxDQUFDLEtBQUssQ0FDWixxQkFBcUIsT0FBTyxxQ0FBcUMsRUFDakUsS0FBSyxDQUFDLElBQUksRUFDVixLQUFLLENBQUMsR0FBRyxFQUNULElBQUksRUFDSixLQUFLLENBQUMsR0FBRyxDQUNWLENBQUE7aUJBQ0Y7YUFDRjtRQUNILENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNNLENBQUEifQ==