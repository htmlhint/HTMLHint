"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_sarif_builder_1 = require("node-sarif-builder");
const path = require("path");
const url_1 = require("url");
const pkg = require('../../../package.json');
const sarifFormatter = function (formatter) {
    formatter.on('end', (event) => {
        const arrAllMessages = event.arrAllMessages;
        const sarifBuilder = new node_sarif_builder_1.SarifBuilder();
        const sarifRunBuilder = new node_sarif_builder_1.SarifRunBuilder().initSimple({
            toolDriverName: 'HTMLHint',
            toolDriverVersion: pkg.version,
            url: 'https://htmlhint.com/',
        });
        const addedRuleSet = new Set();
        arrAllMessages.forEach((result) => {
            result.messages.forEach((message) => {
                const rule = message.rule;
                if (addedRuleSet.has(rule.id)) {
                    return;
                }
                addedRuleSet.add(rule.id);
                const sarifRuleBuiler = new node_sarif_builder_1.SarifRuleBuilder().initSimple({
                    ruleId: rule.id,
                    shortDescriptionText: rule.description,
                    helpUri: rule.link,
                });
                sarifRunBuilder.addRule(sarifRuleBuiler);
            });
        });
        arrAllMessages.forEach((result) => {
            result.messages.forEach((message) => {
                const sarifResultBuilder = new node_sarif_builder_1.SarifResultBuilder();
                const ruleId = message.rule.id;
                const sarifResultInit = {
                    level: message.type === 'info'
                        ? 'note'
                        : message.type.toString(),
                    messageText: message.message,
                    ruleId: ruleId,
                    fileUri: process.env.SARIF_URI_ABSOLUTE
                        ? (0, url_1.pathToFileURL)(result.file).toString()
                        : path.relative(process.cwd(), result.file).replace(/\\/g, '/'),
                    startLine: message.line,
                    startColumn: message.col,
                    endLine: message.line,
                    endColumn: message.col,
                };
                sarifResultBuilder.initSimple(sarifResultInit);
                sarifRunBuilder.addResult(sarifResultBuilder);
            });
        });
        sarifBuilder.addRun(sarifRunBuilder);
        console.log(sarifBuilder.buildSarifJsonString({ indent: true }));
    });
};
module.exports = sarifFormatter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FyaWYuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY2xpL2Zvcm1hdHRlcnMvc2FyaWYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSwyREFLMkI7QUFDM0IsNkJBQTRCO0FBQzVCLDZCQUFtQztBQUduQyxNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsdUJBQXVCLENBQUMsQ0FBQTtBQUU1QyxNQUFNLGNBQWMsR0FBc0IsVUFBVSxTQUFTO0lBQzNELFNBQVMsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDNUIsTUFBTSxjQUFjLEdBQUcsS0FBSyxDQUFDLGNBQWMsQ0FBQTtRQUczQyxNQUFNLFlBQVksR0FBRyxJQUFJLGlDQUFZLEVBQUUsQ0FBQTtRQUd2QyxNQUFNLGVBQWUsR0FBRyxJQUFJLG9DQUFlLEVBQUUsQ0FBQyxVQUFVLENBQUM7WUFDdkQsY0FBYyxFQUFFLFVBQVU7WUFDMUIsaUJBQWlCLEVBQUUsR0FBRyxDQUFDLE9BQU87WUFDOUIsR0FBRyxFQUFFLHVCQUF1QjtTQUM3QixDQUFDLENBQUE7UUFHRixNQUFNLFlBQVksR0FBRyxJQUFJLEdBQUcsRUFBVSxDQUFBO1FBQ3RDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUNoQyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO2dCQUNsQyxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFBO2dCQUN6QixJQUFJLFlBQVksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFO29CQUM3QixPQUFNO2lCQUNQO2dCQUNELFlBQVksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO2dCQUN6QixNQUFNLGVBQWUsR0FBRyxJQUFJLHFDQUFnQixFQUFFLENBQUMsVUFBVSxDQUFDO29CQUN4RCxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQUU7b0JBQ2Ysb0JBQW9CLEVBQUUsSUFBSSxDQUFDLFdBQVc7b0JBQ3RDLE9BQU8sRUFBRSxJQUFJLENBQUMsSUFBSTtpQkFDbkIsQ0FBQyxDQUFBO2dCQUNGLGVBQWUsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUE7WUFDMUMsQ0FBQyxDQUFDLENBQUE7UUFDSixDQUFDLENBQUMsQ0FBQTtRQUdGLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUNoQyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO2dCQUNsQyxNQUFNLGtCQUFrQixHQUFHLElBQUksdUNBQWtCLEVBQUUsQ0FBQTtnQkFDbkQsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUE7Z0JBQzlCLE1BQU0sZUFBZSxHQUFHO29CQUN0QixLQUFLLEVBQ0gsT0FBTyxDQUFDLElBQUksS0FBSyxNQUFNO3dCQUNyQixDQUFDLENBQUMsTUFBTTt3QkFDUixDQUFDLENBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQW1CO29CQUMvQyxXQUFXLEVBQUUsT0FBTyxDQUFDLE9BQU87b0JBQzVCLE1BQU0sRUFBRSxNQUFNO29CQUNkLE9BQU8sRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQjt3QkFDckMsQ0FBQyxDQUFDLElBQUEsbUJBQWEsRUFBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxFQUFFO3dCQUN2QyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO29CQUNqRSxTQUFTLEVBQUUsT0FBTyxDQUFDLElBQUk7b0JBQ3ZCLFdBQVcsRUFBRSxPQUFPLENBQUMsR0FBRztvQkFDeEIsT0FBTyxFQUFFLE9BQU8sQ0FBQyxJQUFJO29CQUNyQixTQUFTLEVBQUUsT0FBTyxDQUFDLEdBQUc7aUJBQ2QsQ0FBQTtnQkFDVixrQkFBa0IsQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLENBQUE7Z0JBQzlDLGVBQWUsQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsQ0FBQTtZQUMvQyxDQUFDLENBQUMsQ0FBQTtRQUNKLENBQUMsQ0FBQyxDQUFBO1FBRUYsWUFBWSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQTtRQUNwQyxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUE7SUFDbEUsQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDLENBQUE7QUFFRCxNQUFNLENBQUMsT0FBTyxHQUFHLGNBQWMsQ0FBQSJ9