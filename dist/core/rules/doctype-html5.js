"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    id: 'doctype-html5',
    description: 'Invalid doctype. Use: "<!DOCTYPE html>"',
    init: function (parser, reporter) {
        var _this = this;
        var onComment = function (event) {
            if (event.long === false &&
                event.content.toLowerCase() !== 'doctype html') {
                reporter.warn('Invalid doctype. Use: "<!DOCTYPE html>"', event.line, event.col, _this, event.raw);
            }
        };
        var onTagStart = function () {
            parser.removeListener('comment', onComment);
            parser.removeListener('tagstart', onTagStart);
        };
        parser.addListener('all', onComment);
        parser.addListener('tagstart', onTagStart);
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jdHlwZS1odG1sNS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb3JlL3J1bGVzL2RvY3R5cGUtaHRtbDUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQSxrQkFBZTtJQUNiLEVBQUUsRUFBRSxlQUFlO0lBQ25CLFdBQVcsRUFBRSx5Q0FBeUM7SUFDdEQsSUFBSSxFQUFKLFVBQUssTUFBTSxFQUFFLFFBQVE7UUFBckIsaUJBdUJDO1FBdEJDLElBQU0sU0FBUyxHQUFhLFVBQUMsS0FBSztZQUNoQyxJQUNFLEtBQUssQ0FBQyxJQUFJLEtBQUssS0FBSztnQkFDcEIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsS0FBSyxjQUFjLEVBQzlDO2dCQUNBLFFBQVEsQ0FBQyxJQUFJLENBQ1gseUNBQXlDLEVBQ3pDLEtBQUssQ0FBQyxJQUFJLEVBQ1YsS0FBSyxDQUFDLEdBQUcsRUFDVCxLQUFJLEVBQ0osS0FBSyxDQUFDLEdBQUcsQ0FDVixDQUFBO2FBQ0Y7UUFDSCxDQUFDLENBQUE7UUFFRCxJQUFNLFVBQVUsR0FBYTtZQUMzQixNQUFNLENBQUMsY0FBYyxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQTtZQUMzQyxNQUFNLENBQUMsY0FBYyxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQTtRQUMvQyxDQUFDLENBQUE7UUFFRCxNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsQ0FBQTtRQUNwQyxNQUFNLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQTtJQUM1QyxDQUFDO0NBQ00sQ0FBQSJ9