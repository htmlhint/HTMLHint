"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    id: 'tag-self-close',
    description: 'Empty tags must be self closed.',
    init: function (parser, reporter) {
        var _this = this;
        var mapEmptyTags = parser.makeMap('area,base,basefont,bgsound,br,col,frame,hr,img,input,isindex,link,meta,param,embed,track,command,source,keygen,wbr');
        parser.addListener('tagstart', function (event) {
            var tagName = event.tagName.toLowerCase();
            if (mapEmptyTags[tagName] !== undefined) {
                if (!event.close) {
                    reporter.warn("The empty tag : [ " + tagName + " ] must be self closed.", event.line, event.col, _this, event.raw);
                }
            }
        });
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnLXNlbGYtY2xvc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29yZS9ydWxlcy90YWctc2VsZi1jbG9zZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLGtCQUFlO0lBQ2IsRUFBRSxFQUFFLGdCQUFnQjtJQUNwQixXQUFXLEVBQUUsaUNBQWlDO0lBQzlDLElBQUksWUFBQyxNQUFNLEVBQUUsUUFBUTtRQUFyQixpQkFtQkM7UUFsQkMsSUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FDakMsb0hBQW9ILENBQ3JILENBQUE7UUFFRCxNQUFNLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxVQUFDLEtBQUs7WUFDbkMsSUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQTtZQUMzQyxJQUFJLFlBQVksQ0FBQyxPQUFPLENBQUMsS0FBSyxTQUFTLEVBQUU7Z0JBQ3ZDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFO29CQUNoQixRQUFRLENBQUMsSUFBSSxDQUNYLHVCQUFxQixPQUFPLDRCQUF5QixFQUNyRCxLQUFLLENBQUMsSUFBSSxFQUNWLEtBQUssQ0FBQyxHQUFHLEVBQ1QsS0FBSSxFQUNKLEtBQUssQ0FBQyxHQUFHLENBQ1YsQ0FBQTtpQkFDRjthQUNGO1FBQ0gsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0NBQ00sQ0FBQSJ9