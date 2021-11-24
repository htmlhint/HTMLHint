"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    id: 'title-require',
    description: '<title> must be present in <head> tag.',
    init: function (parser, reporter) {
        var _this = this;
        var headBegin = false;
        var hasTitle = false;
        var onTagStart = function (event) {
            var tagName = event.tagName.toLowerCase();
            if (tagName === 'head') {
                headBegin = true;
            }
            else if (tagName === 'title' && headBegin) {
                hasTitle = true;
            }
        };
        var onTagEnd = function (event) {
            var tagName = event.tagName.toLowerCase();
            if (hasTitle && tagName === 'title') {
                var lastEvent = event.lastEvent;
                if (lastEvent.type !== 'text' ||
                    (lastEvent.type === 'text' && /^\s*$/.test(lastEvent.raw) === true)) {
                    reporter.error('<title></title> must not be empty.', event.line, event.col, _this, event.raw);
                }
            }
            else if (tagName === 'head') {
                if (hasTitle === false) {
                    reporter.error('<title> must be present in <head> tag.', event.line, event.col, _this, event.raw);
                }
                parser.removeListener('tagstart', onTagStart);
                parser.removeListener('tagend', onTagEnd);
            }
        };
        parser.addListener('tagstart', onTagStart);
        parser.addListener('tagend', onTagEnd);
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGl0bGUtcmVxdWlyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb3JlL3J1bGVzL3RpdGxlLXJlcXVpcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQSxrQkFBZTtJQUNiLEVBQUUsRUFBRSxlQUFlO0lBQ25CLFdBQVcsRUFBRSx3Q0FBd0M7SUFDckQsSUFBSSxFQUFKLFVBQUssTUFBTSxFQUFFLFFBQVE7UUFBckIsaUJBaURDO1FBaERDLElBQUksU0FBUyxHQUFHLEtBQUssQ0FBQTtRQUNyQixJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUE7UUFFcEIsSUFBTSxVQUFVLEdBQWEsVUFBQyxLQUFLO1lBQ2pDLElBQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUE7WUFDM0MsSUFBSSxPQUFPLEtBQUssTUFBTSxFQUFFO2dCQUN0QixTQUFTLEdBQUcsSUFBSSxDQUFBO2FBQ2pCO2lCQUFNLElBQUksT0FBTyxLQUFLLE9BQU8sSUFBSSxTQUFTLEVBQUU7Z0JBQzNDLFFBQVEsR0FBRyxJQUFJLENBQUE7YUFDaEI7UUFDSCxDQUFDLENBQUE7UUFFRCxJQUFNLFFBQVEsR0FBYSxVQUFDLEtBQUs7WUFDL0IsSUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQTtZQUMzQyxJQUFJLFFBQVEsSUFBSSxPQUFPLEtBQUssT0FBTyxFQUFFO2dCQUduQyxJQUFNLFNBQVMsR0FBVSxLQUFLLENBQUMsU0FBUyxDQUFBO2dCQUN4QyxJQUNFLFNBQVMsQ0FBQyxJQUFJLEtBQUssTUFBTTtvQkFDekIsQ0FBQyxTQUFTLENBQUMsSUFBSSxLQUFLLE1BQU0sSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsS0FBSyxJQUFJLENBQUMsRUFDbkU7b0JBQ0EsUUFBUSxDQUFDLEtBQUssQ0FDWixvQ0FBb0MsRUFDcEMsS0FBSyxDQUFDLElBQUksRUFDVixLQUFLLENBQUMsR0FBRyxFQUNULEtBQUksRUFDSixLQUFLLENBQUMsR0FBRyxDQUNWLENBQUE7aUJBQ0Y7YUFDRjtpQkFBTSxJQUFJLE9BQU8sS0FBSyxNQUFNLEVBQUU7Z0JBQzdCLElBQUksUUFBUSxLQUFLLEtBQUssRUFBRTtvQkFDdEIsUUFBUSxDQUFDLEtBQUssQ0FDWix3Q0FBd0MsRUFDeEMsS0FBSyxDQUFDLElBQUksRUFDVixLQUFLLENBQUMsR0FBRyxFQUNULEtBQUksRUFDSixLQUFLLENBQUMsR0FBRyxDQUNWLENBQUE7aUJBQ0Y7Z0JBRUQsTUFBTSxDQUFDLGNBQWMsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUE7Z0JBQzdDLE1BQU0sQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFBO2FBQzFDO1FBQ0gsQ0FBQyxDQUFBO1FBRUQsTUFBTSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUE7UUFDMUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFDeEMsQ0FBQztDQUNNLENBQUEifQ==