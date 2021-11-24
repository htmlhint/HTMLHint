"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    id: 'script-disabled',
    description: 'The <script> tag cannot be used.',
    init: function (parser, reporter) {
        var _this = this;
        parser.addListener('tagstart', function (event) {
            if (event.tagName.toLowerCase() === 'script') {
                reporter.error('The <script> tag cannot be used.', event.line, event.col, _this, event.raw);
            }
        });
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyaXB0LWRpc2FibGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvcmUvcnVsZXMvc2NyaXB0LWRpc2FibGVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsa0JBQWU7SUFDYixFQUFFLEVBQUUsaUJBQWlCO0lBQ3JCLFdBQVcsRUFBRSxrQ0FBa0M7SUFDL0MsSUFBSSxZQUFDLE1BQU0sRUFBRSxRQUFRO1FBQXJCLGlCQVlDO1FBWEMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsVUFBQyxLQUFLO1lBQ25DLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsS0FBSyxRQUFRLEVBQUU7Z0JBQzVDLFFBQVEsQ0FBQyxLQUFLLENBQ1osa0NBQWtDLEVBQ2xDLEtBQUssQ0FBQyxJQUFJLEVBQ1YsS0FBSyxDQUFDLEdBQUcsRUFDVCxLQUFJLEVBQ0osS0FBSyxDQUFDLEdBQUcsQ0FDVixDQUFBO2FBQ0Y7UUFDSCxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FDTSxDQUFBIn0=