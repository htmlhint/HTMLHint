"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    id: 'doctype-html5',
    description: 'Invalid doctype. Use: "<!DOCTYPE html>"',
    init(parser, reporter) {
        const onComment = (event) => {
            if (event.long === false &&
                event.content.toLowerCase() !== 'doctype html') {
                reporter.warn('Invalid doctype. Use: "<!DOCTYPE html>"', event.line, event.col, this, event.raw);
            }
        };
        const onTagStart = () => {
            parser.removeListener('comment', onComment);
            parser.removeListener('tagstart', onTagStart);
        };
        parser.addListener('all', onComment);
        parser.addListener('tagstart', onTagStart);
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jdHlwZS1odG1sNS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb3JlL3J1bGVzL2RvY3R5cGUtaHRtbDUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQSxrQkFBZTtJQUNiLEVBQUUsRUFBRSxlQUFlO0lBQ25CLFdBQVcsRUFBRSx5Q0FBeUM7SUFDdEQsSUFBSSxDQUFDLE1BQU0sRUFBRSxRQUFRO1FBQ25CLE1BQU0sU0FBUyxHQUFhLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDcEMsSUFDRSxLQUFLLENBQUMsSUFBSSxLQUFLLEtBQUs7Z0JBQ3BCLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEtBQUssY0FBYyxFQUM5QyxDQUFDO2dCQUNELFFBQVEsQ0FBQyxJQUFJLENBQ1gseUNBQXlDLEVBQ3pDLEtBQUssQ0FBQyxJQUFJLEVBQ1YsS0FBSyxDQUFDLEdBQUcsRUFDVCxJQUFJLEVBQ0osS0FBSyxDQUFDLEdBQUcsQ0FDVixDQUFBO1lBQ0gsQ0FBQztRQUNILENBQUMsQ0FBQTtRQUVELE1BQU0sVUFBVSxHQUFhLEdBQUcsRUFBRTtZQUNoQyxNQUFNLENBQUMsY0FBYyxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQTtZQUMzQyxNQUFNLENBQUMsY0FBYyxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQTtRQUMvQyxDQUFDLENBQUE7UUFFRCxNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsQ0FBQTtRQUNwQyxNQUFNLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQTtJQUM1QyxDQUFDO0NBQ00sQ0FBQSJ9