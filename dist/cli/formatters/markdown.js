"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const markdownFormatter = function (formatter, HTMLHint) {
    formatter.on('end', (event) => {
        console.log('# TOC');
        const arrToc = [];
        const arrContents = [];
        const arrAllMessages = event.arrAllMessages;
        arrAllMessages.forEach((fileInfo) => {
            const filePath = fileInfo.file;
            const arrMessages = fileInfo.messages;
            let errorCount = 0;
            let warningCount = 0;
            arrMessages.forEach((message) => {
                if (message.type === 'error') {
                    errorCount++;
                }
                else {
                    warningCount++;
                }
            });
            arrToc.push(`   - [${filePath}](#${filePath})`);
            arrContents.push(`<a name="${filePath}" />`);
            arrContents.push(`# ${filePath}`);
            arrContents.push('');
            arrContents.push(`Found ${errorCount} errors, ${warningCount} warnings`);
            const arrLogs = HTMLHint.format(arrMessages);
            arrContents.push('');
            arrLogs.forEach((log) => {
                arrContents.push(`    ${log}`);
            });
            arrContents.push('');
        });
        console.log(`${arrToc.join('\r\n')}\r\n`);
        console.log(arrContents.join('\r\n'));
    });
};
module.exports = markdownFormatter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY2xpL2Zvcm1hdHRlcnMvbWFya2Rvd24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSxNQUFNLGlCQUFpQixHQUFzQixVQUFVLFNBQVMsRUFBRSxRQUFRO0lBQ3hFLFNBQVMsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDNUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUVwQixNQUFNLE1BQU0sR0FBYSxFQUFFLENBQUE7UUFDM0IsTUFBTSxXQUFXLEdBQWEsRUFBRSxDQUFBO1FBQ2hDLE1BQU0sY0FBYyxHQUFHLEtBQUssQ0FBQyxjQUFjLENBQUE7UUFFM0MsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQ2xDLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUE7WUFDOUIsTUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQTtZQUNyQyxJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUE7WUFDbEIsSUFBSSxZQUFZLEdBQUcsQ0FBQyxDQUFBO1lBRXBCLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtnQkFFOUIsSUFBSSxPQUFPLENBQUMsSUFBSSxLQUFLLE9BQU8sRUFBRTtvQkFDNUIsVUFBVSxFQUFFLENBQUE7aUJBQ2I7cUJBQU07b0JBQ0wsWUFBWSxFQUFFLENBQUE7aUJBQ2Y7WUFDSCxDQUFDLENBQUMsQ0FBQTtZQUVGLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxRQUFRLE1BQU0sUUFBUSxHQUFHLENBQUMsQ0FBQTtZQUMvQyxXQUFXLENBQUMsSUFBSSxDQUFDLFlBQVksUUFBUSxNQUFNLENBQUMsQ0FBQTtZQUM1QyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssUUFBUSxFQUFFLENBQUMsQ0FBQTtZQUNqQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO1lBQ3BCLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxVQUFVLFlBQVksWUFBWSxXQUFXLENBQUMsQ0FBQTtZQUV4RSxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFBO1lBQzVDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7WUFDcEIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO2dCQUN0QixXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUMsQ0FBQTtZQUNoQyxDQUFDLENBQUMsQ0FBQTtZQUNGLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDdEIsQ0FBQyxDQUFDLENBQUE7UUFFRixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDekMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUE7SUFDdkMsQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDLENBQUE7QUFFRCxNQUFNLENBQUMsT0FBTyxHQUFHLGlCQUFpQixDQUFBIn0=