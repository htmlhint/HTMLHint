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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jdHlwZS1odG1sNS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb3JlL3J1bGVzL2RvY3R5cGUtaHRtbDUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQSxrQkFBZTtJQUNiLEVBQUUsRUFBRSxlQUFlO0lBQ25CLFdBQVcsRUFBRSx5Q0FBeUM7SUFDdEQsSUFBSSxDQUFDLE1BQU0sRUFBRSxRQUFRO1FBQ25CLE1BQU0sU0FBUyxHQUFhLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDcEMsSUFDRSxLQUFLLENBQUMsSUFBSSxLQUFLLEtBQUs7Z0JBQ3BCLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEtBQUssY0FBYyxFQUM5QztnQkFDQSxRQUFRLENBQUMsSUFBSSxDQUNYLHlDQUF5QyxFQUN6QyxLQUFLLENBQUMsSUFBSSxFQUNWLEtBQUssQ0FBQyxHQUFHLEVBQ1QsSUFBSSxFQUNKLEtBQUssQ0FBQyxHQUFHLENBQ1YsQ0FBQTthQUNGO1FBQ0gsQ0FBQyxDQUFBO1FBRUQsTUFBTSxVQUFVLEdBQWEsR0FBRyxFQUFFO1lBQ2hDLE1BQU0sQ0FBQyxjQUFjLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFBO1lBQzNDLE1BQU0sQ0FBQyxjQUFjLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFBO1FBQy9DLENBQUMsQ0FBQTtRQUVELE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFBO1FBQ3BDLE1BQU0sQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFBO0lBQzVDLENBQUM7Q0FDTSxDQUFBIn0=