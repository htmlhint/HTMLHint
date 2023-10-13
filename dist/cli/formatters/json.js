"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonFormatter = function jsonFormatter(formatter) {
    formatter.on('end', (event) => {
        console.log(JSON.stringify(event.arrAllMessages));
    });
};
exports.default = jsonFormatter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jbGkvZm9ybWF0dGVycy9qc29uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsTUFBTSxhQUFhLEdBQXNCLFNBQVMsYUFBYSxDQUFDLFNBQVM7SUFDdkUsU0FBUyxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUM1QixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUE7SUFDbkQsQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDLENBQUE7QUFFRCxrQkFBZSxhQUFhLENBQUEifQ==