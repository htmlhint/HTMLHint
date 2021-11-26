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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWQtdW5pcXVlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvcmUvcnVsZXMvaWQtdW5pcXVlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsa0JBQWU7SUFDYixFQUFFLEVBQUUsV0FBVztJQUNmLFdBQVcsRUFBRSw0Q0FBNEM7SUFDekQsSUFBSSxDQUFDLE1BQU0sRUFBRSxRQUFRO1FBQ25CLE1BQU0sVUFBVSxHQUE2QixFQUFFLENBQUE7UUFFL0MsTUFBTSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUN2QyxNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFBO1lBQ3pCLElBQUksSUFBSSxDQUFBO1lBQ1IsSUFBSSxFQUFFLENBQUE7WUFDTixNQUFNLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQTtZQUVoRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUM1QyxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBO2dCQUVmLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsS0FBSyxJQUFJLEVBQUU7b0JBQ3BDLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFBO29CQUVmLElBQUksRUFBRSxFQUFFO3dCQUNOLElBQUksVUFBVSxDQUFDLEVBQUUsQ0FBQyxLQUFLLFNBQVMsRUFBRTs0QkFDaEMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQTt5QkFDbkI7NkJBQU07NEJBQ0wsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUE7eUJBQ2pCO3dCQUVELElBQUksVUFBVSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRTs0QkFDdEIsUUFBUSxDQUFDLEtBQUssQ0FDWixrQkFBa0IsRUFBRSxvQkFBb0IsRUFDeEMsS0FBSyxDQUFDLElBQUksRUFDVixHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFDaEIsSUFBSSxFQUNKLElBQUksQ0FBQyxHQUFHLENBQ1QsQ0FBQTt5QkFDRjtxQkFDRjtvQkFDRCxNQUFLO2lCQUNOO2FBQ0Y7UUFDSCxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FDTSxDQUFBIn0=