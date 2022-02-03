"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    id: 'attr-no-duplication',
    description: 'Elements cannot have duplicate attributes.',
    init(parser, reporter) {
        parser.addListener('tagstart', (event) => {
            const attrs = event.attrs;
            let attr;
            let attrName;
            const col = event.col + event.tagName.length + 1;
            const mapAttrName = {};
            for (let i = 0, l = attrs.length; i < l; i++) {
                attr = attrs[i];
                attrName = attr.name;
                if (mapAttrName[attrName] === true) {
                    reporter.error(`Duplicate of attribute name [ ${attr.name} ] was found.`, event.line, col + attr.index, this, attr.raw);
                }
                mapAttrName[attrName] = true;
            }
        });
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXR0ci1uby1kdXBsaWNhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb3JlL3J1bGVzL2F0dHItbm8tZHVwbGljYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSxrQkFBZTtJQUNiLEVBQUUsRUFBRSxxQkFBcUI7SUFDekIsV0FBVyxFQUFFLDRDQUE0QztJQUN6RCxJQUFJLENBQUMsTUFBTSxFQUFFLFFBQVE7UUFDbkIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUN2QyxNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFBO1lBQ3pCLElBQUksSUFBSSxDQUFBO1lBQ1IsSUFBSSxRQUFnQixDQUFBO1lBQ3BCLE1BQU0sR0FBRyxHQUFHLEtBQUssQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFBO1lBRWhELE1BQU0sV0FBVyxHQUFnQyxFQUFFLENBQUE7WUFFbkQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDNUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQTtnQkFDZixRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQTtnQkFFcEIsSUFBSSxXQUFXLENBQUMsUUFBUSxDQUFDLEtBQUssSUFBSSxFQUFFO29CQUNsQyxRQUFRLENBQUMsS0FBSyxDQUNaLGlDQUFpQyxJQUFJLENBQUMsSUFBSSxlQUFlLEVBQ3pELEtBQUssQ0FBQyxJQUFJLEVBQ1YsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQ2hCLElBQUksRUFDSixJQUFJLENBQUMsR0FBRyxDQUNULENBQUE7aUJBQ0Y7Z0JBQ0QsV0FBVyxDQUFDLFFBQVEsQ0FBQyxHQUFHLElBQUksQ0FBQTthQUM3QjtRQUNILENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNNLENBQUEifQ==