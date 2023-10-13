"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseGlob = void 0;
const is_glob_1 = __importDefault(require("is-glob"));
function parseGlob(target) {
    const recursiveTokenIndex = Math.max(target.indexOf('**/'), target.indexOf('**\\'));
    const lastSlashIndex = Math.max(target.lastIndexOf('/'), target.lastIndexOf('\\'));
    const baseGlobSepIndex = recursiveTokenIndex >= 0 ? recursiveTokenIndex : Math.max(lastSlashIndex, 0);
    return {
        base: target.substring(0, baseGlobSepIndex).replace(/[/\\]$/, '') || '.',
        glob: target.substring(baseGlobSepIndex).replace(/^[/\\]/, ''),
        is: {
            glob: (0, is_glob_1.default)(target),
        },
        path: {
            basename: target
                .substring(Math.max(lastSlashIndex, 0))
                .replace(/^[/\\]/, ''),
        },
    };
}
exports.parseGlob = parseGlob;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2UtZ2xvYi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGkvcGFyc2UtZ2xvYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxzREFBNEI7QUFFNUIsU0FBZ0IsU0FBUyxDQUFDLE1BQWM7SUFVdEMsTUFBTSxtQkFBbUIsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUNsQyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUNyQixNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUN2QixDQUFBO0lBQ0QsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FDN0IsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsRUFDdkIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FDekIsQ0FBQTtJQUNELE1BQU0sZ0JBQWdCLEdBQ3BCLG1CQUFtQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFBO0lBRTlFLE9BQU87UUFDTCxJQUFJLEVBQUUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEdBQUc7UUFDeEUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQztRQUM5RCxFQUFFLEVBQUU7WUFDRixJQUFJLEVBQUUsSUFBQSxpQkFBTSxFQUFDLE1BQU0sQ0FBQztTQUNyQjtRQUNELElBQUksRUFBRTtZQUNKLFFBQVEsRUFBRSxNQUFNO2lCQUNiLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQztpQkFDdEMsT0FBTyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUM7U0FDekI7S0FDRixDQUFBO0FBQ0gsQ0FBQztBQWpDRCw4QkFpQ0MifQ==