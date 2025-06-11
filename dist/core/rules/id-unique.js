"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    id: 'id-unique',
    description: 'The value of id attributes must be unique.',
    init(parser, reporter) {
        const mapIdCount = {};
        parser.addListener('tagstart', (event) => {
            const attrs = event.attrs;
            let attr;
            let id;
            const col = event.col + event.tagName.length + 1;
            for (let i = 0, l = attrs.length; i < l; i++) {
                attr = attrs[i];
                if (attr.name.toLowerCase() === 'id') {
                    id = attr.value;
                    if (id) {
                        if (mapIdCount[id] === undefined) {
                            mapIdCount[id] = 1;
                        }
                        else {
                            mapIdCount[id]++;
                        }
                        if (mapIdCount[id] > 1) {
                            reporter.error(`The id value [ ${id} ] must be unique.`, event.line, col + attr.index, this, attr.raw);
                        }
                    }
                    break;
                }
            }
        });
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWQtdW5pcXVlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvcmUvcnVsZXMvaWQtdW5pcXVlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsa0JBQWU7SUFDYixFQUFFLEVBQUUsV0FBVztJQUNmLFdBQVcsRUFBRSw0Q0FBNEM7SUFDekQsSUFBSSxDQUFDLE1BQU0sRUFBRSxRQUFRO1FBQ25CLE1BQU0sVUFBVSxHQUE2QixFQUFFLENBQUE7UUFFL0MsTUFBTSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUN2QyxNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFBO1lBQ3pCLElBQUksSUFBSSxDQUFBO1lBQ1IsSUFBSSxFQUFFLENBQUE7WUFDTixNQUFNLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQTtZQUVoRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7Z0JBQzdDLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUE7Z0JBRWYsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxLQUFLLElBQUksRUFBRSxDQUFDO29CQUNyQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQTtvQkFFZixJQUFJLEVBQUUsRUFBRSxDQUFDO3dCQUNQLElBQUksVUFBVSxDQUFDLEVBQUUsQ0FBQyxLQUFLLFNBQVMsRUFBRSxDQUFDOzRCQUNqQyxVQUFVLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFBO3dCQUNwQixDQUFDOzZCQUFNLENBQUM7NEJBQ04sVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUE7d0JBQ2xCLENBQUM7d0JBRUQsSUFBSSxVQUFVLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7NEJBQ3ZCLFFBQVEsQ0FBQyxLQUFLLENBQ1osa0JBQWtCLEVBQUUsb0JBQW9CLEVBQ3hDLEtBQUssQ0FBQyxJQUFJLEVBQ1YsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQ2hCLElBQUksRUFDSixJQUFJLENBQUMsR0FBRyxDQUNULENBQUE7d0JBQ0gsQ0FBQztvQkFDSCxDQUFDO29CQUNELE1BQUs7Z0JBQ1AsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FDTSxDQUFBIn0=