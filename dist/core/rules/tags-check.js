"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let tagsTypings = {
    a: {
        selfclosing: false,
        attrsRequired: ['href', 'title'],
        redundantAttrs: ['alt'],
    },
    div: {
        selfclosing: false,
    },
    main: {
        selfclosing: false,
        redundantAttrs: ['role'],
    },
    nav: {
        selfclosing: false,
        redundantAttrs: ['role'],
    },
    script: {
        attrsOptional: [
            ['async', 'async'],
            ['defer', 'defer'],
        ],
    },
    img: {
        selfclosing: true,
        attrsRequired: ['src', 'alt', 'title'],
    },
};
exports.default = {
    id: 'tags-check',
    description: 'Checks html tags.',
    init(parser, reporter, options) {
        tagsTypings = Object.assign(Object.assign({}, tagsTypings), options);
        parser.addListener('tagstart', (event) => {
            const attrs = event.attrs;
            const col = event.col + event.tagName.length + 1;
            const tagName = event.tagName.toLowerCase();
            if (tagsTypings[tagName]) {
                const currentTagType = tagsTypings[tagName];
                if (currentTagType.selfclosing === true && !event.close) {
                    reporter.warn(`The <${tagName}> tag must be selfclosing.`, event.line, event.col, this, event.raw);
                }
                else if (currentTagType.selfclosing === false && event.close) {
                    reporter.warn(`The <${tagName}> tag must not be selfclosing.`, event.line, event.col, this, event.raw);
                }
                if (Array.isArray(currentTagType.attrsRequired)) {
                    const attrsRequired = currentTagType.attrsRequired;
                    attrsRequired.forEach((id) => {
                        if (Array.isArray(id)) {
                            const copyOfId = id.map((a) => a);
                            const realID = copyOfId.shift();
                            const values = copyOfId;
                            if (attrs.some((attr) => attr.name === realID)) {
                                attrs.forEach((attr) => {
                                    if (attr.name === realID &&
                                        values.indexOf(attr.value) === -1) {
                                        reporter.error(`The <${tagName}> tag must have attr '${realID}' with one value of '${values.join("' or '")}'.`, event.line, col, this, event.raw);
                                    }
                                });
                            }
                            else {
                                reporter.error(`The <${tagName}> tag must have attr '${realID}'.`, event.line, col, this, event.raw);
                            }
                        }
                        else if (!attrs.some((attr) => id.split('|').indexOf(attr.name) !== -1)) {
                            reporter.error(`The <${tagName}> tag must have attr '${id}'.`, event.line, col, this, event.raw);
                        }
                    });
                }
                if (Array.isArray(currentTagType.attrsOptional)) {
                    const attrsOptional = currentTagType.attrsOptional;
                    attrsOptional.forEach((id) => {
                        if (Array.isArray(id)) {
                            const copyOfId = id.map((a) => a);
                            const realID = copyOfId.shift();
                            const values = copyOfId;
                            if (attrs.some((attr) => attr.name === realID)) {
                                attrs.forEach((attr) => {
                                    if (attr.name === realID &&
                                        values.indexOf(attr.value) === -1) {
                                        reporter.error(`The <${tagName}> tag must have optional attr '${realID}' with one value of '${values.join("' or '")}'.`, event.line, col, this, event.raw);
                                    }
                                });
                            }
                        }
                    });
                }
                if (Array.isArray(currentTagType.redundantAttrs)) {
                    const redundantAttrs = currentTagType.redundantAttrs;
                    redundantAttrs.forEach((attrName) => {
                        if (attrs.some((attr) => attr.name === attrName)) {
                            reporter.error(`The attr '${attrName}' is redundant for <${tagName}> and should be omitted.`, event.line, col, this, event.raw);
                        }
                    });
                }
            }
        });
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFncy1jaGVjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb3JlL3J1bGVzL3RhZ3MtY2hlY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSxJQUFJLFdBQVcsR0FBNEM7SUFDekQsQ0FBQyxFQUFFO1FBQ0QsV0FBVyxFQUFFLEtBQUs7UUFDbEIsYUFBYSxFQUFFLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQztRQUNoQyxjQUFjLEVBQUUsQ0FBQyxLQUFLLENBQUM7S0FDeEI7SUFDRCxHQUFHLEVBQUU7UUFDSCxXQUFXLEVBQUUsS0FBSztLQUNuQjtJQUNELElBQUksRUFBRTtRQUNKLFdBQVcsRUFBRSxLQUFLO1FBQ2xCLGNBQWMsRUFBRSxDQUFDLE1BQU0sQ0FBQztLQUN6QjtJQUNELEdBQUcsRUFBRTtRQUNILFdBQVcsRUFBRSxLQUFLO1FBQ2xCLGNBQWMsRUFBRSxDQUFDLE1BQU0sQ0FBQztLQUN6QjtJQUNELE1BQU0sRUFBRTtRQUNOLGFBQWEsRUFBRTtZQUNiLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQztZQUNsQixDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUM7U0FDbkI7S0FDRjtJQUNELEdBQUcsRUFBRTtRQUNILFdBQVcsRUFBRSxJQUFJO1FBQ2pCLGFBQWEsRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDO0tBQ3ZDO0NBQ0YsQ0FBQTtBQUVELGtCQUFlO0lBQ2IsRUFBRSxFQUFFLFlBQVk7SUFDaEIsV0FBVyxFQUFFLG1CQUFtQjtJQUNoQyxJQUFJLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxPQUFnRDtRQUNyRSxXQUFXLG1DQUFRLFdBQVcsR0FBSyxPQUFPLENBQUUsQ0FBQTtRQUU1QyxNQUFNLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ3ZDLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUE7WUFDekIsTUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUE7WUFFaEQsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQTtZQUUzQyxJQUFJLFdBQVcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO2dCQUN6QixNQUFNLGNBQWMsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUE7Z0JBRTNDLElBQUksY0FBYyxDQUFDLFdBQVcsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7b0JBQ3hELFFBQVEsQ0FBQyxJQUFJLENBQ1gsUUFBUSxPQUFPLDRCQUE0QixFQUMzQyxLQUFLLENBQUMsSUFBSSxFQUNWLEtBQUssQ0FBQyxHQUFHLEVBQ1QsSUFBSSxFQUNKLEtBQUssQ0FBQyxHQUFHLENBQ1YsQ0FBQTtnQkFDSCxDQUFDO3FCQUFNLElBQUksY0FBYyxDQUFDLFdBQVcsS0FBSyxLQUFLLElBQUksS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO29CQUMvRCxRQUFRLENBQUMsSUFBSSxDQUNYLFFBQVEsT0FBTyxnQ0FBZ0MsRUFDL0MsS0FBSyxDQUFDLElBQUksRUFDVixLQUFLLENBQUMsR0FBRyxFQUNULElBQUksRUFDSixLQUFLLENBQUMsR0FBRyxDQUNWLENBQUE7Z0JBQ0gsQ0FBQztnQkFFRCxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUM7b0JBQ2hELE1BQU0sYUFBYSxHQUNqQixjQUFjLENBQUMsYUFBYSxDQUFBO29CQUM5QixhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUU7d0JBQzNCLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDOzRCQUN0QixNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQTs0QkFDakMsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFBOzRCQUMvQixNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUE7NEJBRXZCLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxNQUFNLENBQUMsRUFBRSxDQUFDO2dDQUMvQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7b0NBQ3JCLElBQ0UsSUFBSSxDQUFDLElBQUksS0FBSyxNQUFNO3dDQUNwQixNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFDakMsQ0FBQzt3Q0FDRCxRQUFRLENBQUMsS0FBSyxDQUNaLFFBQVEsT0FBTyx5QkFBeUIsTUFBTSx3QkFBd0IsTUFBTSxDQUFDLElBQUksQ0FDL0UsUUFBUSxDQUNULElBQUksRUFDTCxLQUFLLENBQUMsSUFBSSxFQUNWLEdBQUcsRUFDSCxJQUFJLEVBQ0osS0FBSyxDQUFDLEdBQUcsQ0FDVixDQUFBO29DQUNILENBQUM7Z0NBQ0gsQ0FBQyxDQUFDLENBQUE7NEJBQ0osQ0FBQztpQ0FBTSxDQUFDO2dDQUNOLFFBQVEsQ0FBQyxLQUFLLENBQ1osUUFBUSxPQUFPLHlCQUF5QixNQUFNLElBQUksRUFDbEQsS0FBSyxDQUFDLElBQUksRUFDVixHQUFHLEVBQ0gsSUFBSSxFQUNKLEtBQUssQ0FBQyxHQUFHLENBQ1YsQ0FBQTs0QkFDSCxDQUFDO3dCQUNILENBQUM7NkJBQU0sSUFDTCxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUM5RCxDQUFDOzRCQUNELFFBQVEsQ0FBQyxLQUFLLENBQ1osUUFBUSxPQUFPLHlCQUF5QixFQUFFLElBQUksRUFDOUMsS0FBSyxDQUFDLElBQUksRUFDVixHQUFHLEVBQ0gsSUFBSSxFQUNKLEtBQUssQ0FBQyxHQUFHLENBQ1YsQ0FBQTt3QkFDSCxDQUFDO29CQUNILENBQUMsQ0FBQyxDQUFBO2dCQUNKLENBQUM7Z0JBRUQsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDO29CQUNoRCxNQUFNLGFBQWEsR0FBZSxjQUFjLENBQUMsYUFBYSxDQUFBO29CQUM5RCxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUU7d0JBQzNCLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDOzRCQUN0QixNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQTs0QkFDakMsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFBOzRCQUMvQixNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUE7NEJBRXZCLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxNQUFNLENBQUMsRUFBRSxDQUFDO2dDQUMvQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7b0NBQ3JCLElBQ0UsSUFBSSxDQUFDLElBQUksS0FBSyxNQUFNO3dDQUNwQixNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFDakMsQ0FBQzt3Q0FDRCxRQUFRLENBQUMsS0FBSyxDQUNaLFFBQVEsT0FBTyxrQ0FBa0MsTUFBTSx3QkFBd0IsTUFBTSxDQUFDLElBQUksQ0FDeEYsUUFBUSxDQUNULElBQUksRUFDTCxLQUFLLENBQUMsSUFBSSxFQUNWLEdBQUcsRUFDSCxJQUFJLEVBQ0osS0FBSyxDQUFDLEdBQUcsQ0FDVixDQUFBO29DQUNILENBQUM7Z0NBQ0gsQ0FBQyxDQUFDLENBQUE7NEJBQ0osQ0FBQzt3QkFDSCxDQUFDO29CQUNILENBQUMsQ0FBQyxDQUFBO2dCQUNKLENBQUM7Z0JBRUQsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDO29CQUNqRCxNQUFNLGNBQWMsR0FBYSxjQUFjLENBQUMsY0FBYyxDQUFBO29CQUM5RCxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7d0JBQ2xDLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxRQUFRLENBQUMsRUFBRSxDQUFDOzRCQUNqRCxRQUFRLENBQUMsS0FBSyxDQUNaLGFBQWEsUUFBUSx1QkFBdUIsT0FBTywwQkFBMEIsRUFDN0UsS0FBSyxDQUFDLElBQUksRUFDVixHQUFHLEVBQ0gsSUFBSSxFQUNKLEtBQUssQ0FBQyxHQUFHLENBQ1YsQ0FBQTt3QkFDSCxDQUFDO29CQUNILENBQUMsQ0FBQyxDQUFBO2dCQUNKLENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0NBQ00sQ0FBQSJ9