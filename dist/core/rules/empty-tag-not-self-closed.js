"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    id: 'empty-tag-not-self-closed',
    description: 'Empty tags must not use self closed syntax.',
    init: function (parser, reporter) {
        var _this = this;
        var mapEmptyTags = parser.makeMap('area,base,basefont,bgsound,br,col,frame,hr,img,input,isindex,link,meta,param,embed,track,command,source,keygen,wbr');
        parser.addListener('tagstart', function (event) {
            var tagName = event.tagName.toLowerCase();
            if (mapEmptyTags[tagName] !== undefined) {
                if (event.close) {
                    reporter.error("The empty tag : [ " + tagName + " ] must not use self closed syntax.", event.line, event.col, _this, event.raw);
                }
            }
        });
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1wdHktdGFnLW5vdC1zZWxmLWNsb3NlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb3JlL3J1bGVzL2VtcHR5LXRhZy1ub3Qtc2VsZi1jbG9zZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSxrQkFBZTtJQUNiLEVBQUUsRUFBRSwyQkFBMkI7SUFDL0IsV0FBVyxFQUFFLDZDQUE2QztJQUMxRCxJQUFJLFlBQUMsTUFBTSxFQUFFLFFBQVE7UUFBckIsaUJBbUJDO1FBbEJDLElBQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQ2pDLG9IQUFvSCxDQUNySCxDQUFBO1FBRUQsTUFBTSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsVUFBQyxLQUFLO1lBQ25DLElBQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUE7WUFDM0MsSUFBSSxZQUFZLENBQUMsT0FBTyxDQUFDLEtBQUssU0FBUyxFQUFFO2dCQUN2QyxJQUFJLEtBQUssQ0FBQyxLQUFLLEVBQUU7b0JBQ2YsUUFBUSxDQUFDLEtBQUssQ0FDWix1QkFBcUIsT0FBTyx3Q0FBcUMsRUFDakUsS0FBSyxDQUFDLElBQUksRUFDVixLQUFLLENBQUMsR0FBRyxFQUNULEtBQUksRUFDSixLQUFLLENBQUMsR0FBRyxDQUNWLENBQUE7aUJBQ0Y7YUFDRjtRQUNILENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNNLENBQUEifQ==