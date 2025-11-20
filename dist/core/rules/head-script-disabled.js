"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    id: 'head-script-disabled',
    description: 'The <script> tag cannot be used in a <head> tag.',
    init(parser, reporter, options) {
        const reScript = /^(text\/javascript|application\/javascript)$/i;
        let isInHead = false;
        const onTagStart = (event) => {
            const mapAttrs = parser.getMapAttrs(event.attrs);
            const type = mapAttrs.type;
            const defer = mapAttrs.defer;
            const tagName = event.tagName.toLowerCase();
            if (tagName === 'head') {
                isInHead = true;
            }
            if (isInHead === true && tagName === 'script') {
                const isModule = type === 'module';
                const isDeferred = defer !== undefined;
                const isAsync = mapAttrs.async !== undefined;
                const isExecutableScript = !type || reScript.test(type) === true || isModule;
                if (isExecutableScript) {
                    if (options === 'allow-non-blocking') {
                        if (!isModule && !isDeferred && !isAsync) {
                            reporter.warn('The <script> tag cannot be used in a <head> tag unless it has type="module", defer, or async attribute.', event.line, event.col, this, event.raw);
                        }
                    }
                    else {
                        reporter.warn('The <script> tag cannot be used in a <head> tag.', event.line, event.col, this, event.raw);
                    }
                }
            }
        };
        const onTagEnd = (event) => {
            if (event.tagName.toLowerCase() === 'head') {
                parser.removeListener('tagstart', onTagStart);
                parser.removeListener('tagend', onTagEnd);
            }
        };
        parser.addListener('tagstart', onTagStart);
        parser.addListener('tagend', onTagEnd);
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZC1zY3JpcHQtZGlzYWJsZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29yZS9ydWxlcy9oZWFkLXNjcmlwdC1kaXNhYmxlZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBLGtCQUFlO0lBQ2IsRUFBRSxFQUFFLHNCQUFzQjtJQUMxQixXQUFXLEVBQUUsa0RBQWtEO0lBQy9ELElBQUksQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLE9BQU87UUFDNUIsTUFBTSxRQUFRLEdBQUcsK0NBQStDLENBQUE7UUFDaEUsSUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFBO1FBRXBCLE1BQU0sVUFBVSxHQUFhLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDckMsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUE7WUFDaEQsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQTtZQUMxQixNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFBO1lBQzVCLE1BQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUE7WUFFM0MsSUFBSSxPQUFPLEtBQUssTUFBTSxFQUFFLENBQUM7Z0JBQ3ZCLFFBQVEsR0FBRyxJQUFJLENBQUE7WUFDakIsQ0FBQztZQUVELElBQUksUUFBUSxLQUFLLElBQUksSUFBSSxPQUFPLEtBQUssUUFBUSxFQUFFLENBQUM7Z0JBRTlDLE1BQU0sUUFBUSxHQUFHLElBQUksS0FBSyxRQUFRLENBQUE7Z0JBR2xDLE1BQU0sVUFBVSxHQUFHLEtBQUssS0FBSyxTQUFTLENBQUE7Z0JBR3RDLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxLQUFLLEtBQUssU0FBUyxDQUFBO2dCQUc1QyxNQUFNLGtCQUFrQixHQUN0QixDQUFDLElBQUksSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxRQUFRLENBQUE7Z0JBRW5ELElBQUksa0JBQWtCLEVBQUUsQ0FBQztvQkFFdkIsSUFBSSxPQUFPLEtBQUssb0JBQW9CLEVBQUUsQ0FBQzt3QkFFckMsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLFVBQVUsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDOzRCQUN6QyxRQUFRLENBQUMsSUFBSSxDQUNYLHlHQUF5RyxFQUN6RyxLQUFLLENBQUMsSUFBSSxFQUNWLEtBQUssQ0FBQyxHQUFHLEVBQ1QsSUFBSSxFQUNKLEtBQUssQ0FBQyxHQUFHLENBQ1YsQ0FBQTt3QkFDSCxDQUFDO29CQUNILENBQUM7eUJBQU0sQ0FBQzt3QkFFTixRQUFRLENBQUMsSUFBSSxDQUNYLGtEQUFrRCxFQUNsRCxLQUFLLENBQUMsSUFBSSxFQUNWLEtBQUssQ0FBQyxHQUFHLEVBQ1QsSUFBSSxFQUNKLEtBQUssQ0FBQyxHQUFHLENBQ1YsQ0FBQTtvQkFDSCxDQUFDO2dCQUNILENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQyxDQUFBO1FBRUQsTUFBTSxRQUFRLEdBQWEsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNuQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEtBQUssTUFBTSxFQUFFLENBQUM7Z0JBQzNDLE1BQU0sQ0FBQyxjQUFjLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFBO2dCQUM3QyxNQUFNLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQTtZQUMzQyxDQUFDO1FBQ0gsQ0FBQyxDQUFBO1FBRUQsTUFBTSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUE7UUFDMUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFDeEMsQ0FBQztDQUNNLENBQUEifQ==