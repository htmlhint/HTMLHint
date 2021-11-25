"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    id: 'tag-pair',
    description: 'Tag must be paired.',
    init: function (parser, reporter) {
        var _this = this;
        var stack = [];
        var mapEmptyTags = parser.makeMap('area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed,track,command,source,keygen,wbr');
        parser.addListener('tagstart', function (event) {
            var tagName = event.tagName.toLowerCase();
            if (mapEmptyTags[tagName] === undefined && !event.close) {
                stack.push({
                    tagName: tagName,
                    line: event.line,
                    raw: event.raw,
                });
            }
        });
        parser.addListener('tagend', function (event) {
            var tagName = event.tagName.toLowerCase();
            var pos;
            for (pos = stack.length - 1; pos >= 0; pos--) {
                if (stack[pos].tagName === tagName) {
                    break;
                }
            }
            if (pos >= 0) {
                var arrTags = [];
                for (var i = stack.length - 1; i > pos; i--) {
                    arrTags.push("</".concat(stack[i].tagName, ">"));
                }
                if (arrTags.length > 0) {
                    var lastEvent = stack[stack.length - 1];
                    reporter.error("Tag must be paired, missing: [ ".concat(arrTags.join(''), " ], start tag match failed [ ").concat(lastEvent.raw, " ] on line ").concat(lastEvent.line, "."), event.line, event.col, _this, event.raw);
                }
                stack.length = pos;
            }
            else {
                reporter.error("Tag must be paired, no start tag: [ ".concat(event.raw, " ]"), event.line, event.col, _this, event.raw);
            }
        });
        parser.addListener('end', function (event) {
            var arrTags = [];
            for (var i = stack.length - 1; i >= 0; i--) {
                arrTags.push("</".concat(stack[i].tagName, ">"));
            }
            if (arrTags.length > 0) {
                var lastEvent = stack[stack.length - 1];
                reporter.error("Tag must be paired, missing: [ ".concat(arrTags.join(''), " ], open tag match failed [ ").concat(lastEvent.raw, " ] on line ").concat(lastEvent.line, "."), event.line, event.col, _this, '');
            }
        });
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnLXBhaXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29yZS9ydWxlcy90YWctcGFpci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBLGtCQUFlO0lBQ2IsRUFBRSxFQUFFLFVBQVU7SUFDZCxXQUFXLEVBQUUscUJBQXFCO0lBQ2xDLElBQUksRUFBSixVQUFLLE1BQU0sRUFBRSxRQUFRO1FBQXJCLGlCQWtGQztRQWpGQyxJQUFNLEtBQUssR0FBMEIsRUFBRSxDQUFBO1FBQ3ZDLElBQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQ2pDLDRHQUE0RyxDQUM3RyxDQUFBO1FBRUQsTUFBTSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsVUFBQyxLQUFLO1lBQ25DLElBQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUE7WUFDM0MsSUFBSSxZQUFZLENBQUMsT0FBTyxDQUFDLEtBQUssU0FBUyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRTtnQkFDdkQsS0FBSyxDQUFDLElBQUksQ0FBQztvQkFDVCxPQUFPLEVBQUUsT0FBTztvQkFDaEIsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJO29CQUNoQixHQUFHLEVBQUUsS0FBSyxDQUFDLEdBQUc7aUJBQ2YsQ0FBQyxDQUFBO2FBQ0g7UUFDSCxDQUFDLENBQUMsQ0FBQTtRQUVGLE1BQU0sQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLFVBQUMsS0FBSztZQUNqQyxJQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFBO1lBRzNDLElBQUksR0FBRyxDQUFBO1lBQ1AsS0FBSyxHQUFHLEdBQUcsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFBRTtnQkFDNUMsSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxLQUFLLE9BQU8sRUFBRTtvQkFDbEMsTUFBSztpQkFDTjthQUNGO1lBRUQsSUFBSSxHQUFHLElBQUksQ0FBQyxFQUFFO2dCQUNaLElBQU0sT0FBTyxHQUFHLEVBQUUsQ0FBQTtnQkFDbEIsS0FBSyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUMzQyxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sTUFBRyxDQUFDLENBQUE7aUJBQ3ZDO2dCQUVELElBQUksT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7b0JBQ3RCLElBQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFBO29CQUN6QyxRQUFRLENBQUMsS0FBSyxDQUNaLHlDQUFrQyxPQUFPLENBQUMsSUFBSSxDQUM1QyxFQUFFLENBQ0gsMENBQWdDLFNBQVMsQ0FBQyxHQUFHLHdCQUM1QyxTQUFTLENBQUMsSUFBSSxNQUNiLEVBQ0gsS0FBSyxDQUFDLElBQUksRUFDVixLQUFLLENBQUMsR0FBRyxFQUNULEtBQUksRUFDSixLQUFLLENBQUMsR0FBRyxDQUNWLENBQUE7aUJBQ0Y7Z0JBQ0QsS0FBSyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUE7YUFDbkI7aUJBQU07Z0JBQ0wsUUFBUSxDQUFDLEtBQUssQ0FDWiw4Q0FBdUMsS0FBSyxDQUFDLEdBQUcsT0FBSSxFQUNwRCxLQUFLLENBQUMsSUFBSSxFQUNWLEtBQUssQ0FBQyxHQUFHLEVBQ1QsS0FBSSxFQUNKLEtBQUssQ0FBQyxHQUFHLENBQ1YsQ0FBQTthQUNGO1FBQ0gsQ0FBQyxDQUFDLENBQUE7UUFFRixNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxVQUFDLEtBQUs7WUFDOUIsSUFBTSxPQUFPLEdBQUcsRUFBRSxDQUFBO1lBRWxCLEtBQUssSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDMUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLE1BQUcsQ0FBQyxDQUFBO2FBQ3ZDO1lBRUQsSUFBSSxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDdEIsSUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUE7Z0JBQ3pDLFFBQVEsQ0FBQyxLQUFLLENBQ1oseUNBQWtDLE9BQU8sQ0FBQyxJQUFJLENBQzVDLEVBQUUsQ0FDSCx5Q0FBK0IsU0FBUyxDQUFDLEdBQUcsd0JBQzNDLFNBQVMsQ0FBQyxJQUFJLE1BQ2IsRUFDSCxLQUFLLENBQUMsSUFBSSxFQUNWLEtBQUssQ0FBQyxHQUFHLEVBQ1QsS0FBSSxFQUNKLEVBQUUsQ0FDSCxDQUFBO2FBQ0Y7UUFDSCxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FDTSxDQUFBIn0=