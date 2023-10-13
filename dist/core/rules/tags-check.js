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
        tagsTypings = { ...tagsTypings, ...options };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFncy1jaGVjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb3JlL3J1bGVzL3RhZ3MtY2hlY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSxJQUFJLFdBQVcsR0FBNEM7SUFDekQsQ0FBQyxFQUFFO1FBQ0QsV0FBVyxFQUFFLEtBQUs7UUFDbEIsYUFBYSxFQUFFLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQztRQUNoQyxjQUFjLEVBQUUsQ0FBQyxLQUFLLENBQUM7S0FDeEI7SUFDRCxHQUFHLEVBQUU7UUFDSCxXQUFXLEVBQUUsS0FBSztLQUNuQjtJQUNELElBQUksRUFBRTtRQUNKLFdBQVcsRUFBRSxLQUFLO1FBQ2xCLGNBQWMsRUFBRSxDQUFDLE1BQU0sQ0FBQztLQUN6QjtJQUNELEdBQUcsRUFBRTtRQUNILFdBQVcsRUFBRSxLQUFLO1FBQ2xCLGNBQWMsRUFBRSxDQUFDLE1BQU0sQ0FBQztLQUN6QjtJQUNELE1BQU0sRUFBRTtRQUNOLGFBQWEsRUFBRTtZQUNiLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQztZQUNsQixDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUM7U0FDbkI7S0FDRjtJQUNELEdBQUcsRUFBRTtRQUNILFdBQVcsRUFBRSxJQUFJO1FBQ2pCLGFBQWEsRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDO0tBQ3ZDO0NBQ0YsQ0FBQTtBQUVELGtCQUFlO0lBQ2IsRUFBRSxFQUFFLFlBQVk7SUFDaEIsV0FBVyxFQUFFLG1CQUFtQjtJQUNoQyxJQUFJLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxPQUFnRDtRQUNyRSxXQUFXLEdBQUcsRUFBRSxHQUFHLFdBQVcsRUFBRSxHQUFHLE9BQU8sRUFBRSxDQUFBO1FBRTVDLE1BQU0sQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDdkMsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FB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