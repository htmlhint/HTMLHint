"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    id: 'doctype-first',
    description: 'Doctype must be declared first.',
    init: function (parser, reporter) {
        var _this = this;
        var allEvent = function (event) {
            if (event.type === 'start' ||
                (event.type === 'text' && /^\s*$/.test(event.raw))) {
                return;
            }
            if ((event.type !== 'comment' && event.long === false) ||
                /^DOCTYPE\s+/i.test(event.content) === false) {
                reporter.error('Doctype must be declared first.', event.line, event.col, _this, event.raw);
            }
            parser.removeListener('all', allEvent);
        };
        parser.addListener('all', allEvent);
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jdHlwZS1maXJzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb3JlL3J1bGVzL2RvY3R5cGUtZmlyc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQSxrQkFBZTtJQUNiLEVBQUUsRUFBRSxlQUFlO0lBQ25CLFdBQVcsRUFBRSxpQ0FBaUM7SUFDOUMsSUFBSSxFQUFKLFVBQUssTUFBTSxFQUFFLFFBQVE7UUFBckIsaUJBMEJDO1FBekJDLElBQU0sUUFBUSxHQUFhLFVBQUMsS0FBSztZQUMvQixJQUNFLEtBQUssQ0FBQyxJQUFJLEtBQUssT0FBTztnQkFDdEIsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLE1BQU0sSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUNsRDtnQkFDQSxPQUFNO2FBQ1A7WUFFRCxJQUNFLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxTQUFTLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxLQUFLLENBQUM7Z0JBQ2xELGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEtBQUssRUFDNUM7Z0JBQ0EsUUFBUSxDQUFDLEtBQUssQ0FDWixpQ0FBaUMsRUFDakMsS0FBSyxDQUFDLElBQUksRUFDVixLQUFLLENBQUMsR0FBRyxFQUNULEtBQUksRUFDSixLQUFLLENBQUMsR0FBRyxDQUNWLENBQUE7YUFDRjtZQUVELE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFBO1FBQ3hDLENBQUMsQ0FBQTtRQUVELE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBQ3JDLENBQUM7Q0FDTSxDQUFBIn0=