"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsonFormatter = function (formatter) {
    formatter.on('end', function (event) {
        console.log(JSON.stringify(event.arrAllMessages));
    });
};
module.exports = jsonFormatter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jbGkvZm9ybWF0dGVycy9qc29uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsSUFBTSxhQUFhLEdBQXNCLFVBQVUsU0FBUztJQUMxRCxTQUFTLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxVQUFDLEtBQUs7UUFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFBO0lBQ25ELENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFBO0FBRUQsTUFBTSxDQUFDLE9BQU8sR0FBRyxhQUFhLENBQUEifQ==