"use strict";
const markdownFormatter = function markdownFormatter(formatter, HTMLHint) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY2xpL2Zvcm1hdHRlcnMvbWFya2Rvd24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUVBLE1BQU0saUJBQWlCLEdBQXNCLFNBQVMsaUJBQWlCLENBQ3JFLFNBQVMsRUFDVCxRQUFRO0lBRVIsU0FBUyxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUM1QixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBRXBCLE1BQU0sTUFBTSxHQUFhLEVBQUUsQ0FBQTtRQUMzQixNQUFNLFdBQVcsR0FBYSxFQUFFLENBQUE7UUFDaEMsTUFBTSxjQUFjLEdBQUcsS0FBSyxDQUFDLGNBQWMsQ0FBQTtRQUUzQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDbEMsTUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQTtZQUM5QixNQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFBO1lBQ3JDLElBQUksVUFBVSxHQUFHLENBQUMsQ0FBQTtZQUNsQixJQUFJLFlBQVksR0FBRyxDQUFDLENBQUE7WUFFcEIsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO2dCQUM5QixJQUFJLE9BQU8sQ0FBQyxJQUFJLEtBQUssT0FBTyxFQUFFO29CQUM1QixVQUFVLEVBQUUsQ0FBQTtpQkFDYjtxQkFBTTtvQkFDTCxZQUFZLEVBQUUsQ0FBQTtpQkFDZjtZQUNILENBQUMsQ0FBQyxDQUFBO1lBRUYsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLFFBQVEsTUFBTSxRQUFRLEdBQUcsQ0FBQyxDQUFBO1lBQy9DLFdBQVcsQ0FBQyxJQUFJLENBQUMsWUFBWSxRQUFRLE1BQU0sQ0FBQyxDQUFBO1lBQzVDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxRQUFRLEVBQUUsQ0FBQyxDQUFBO1lBQ2pDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7WUFDcEIsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLFVBQVUsWUFBWSxZQUFZLFdBQVcsQ0FBQyxDQUFBO1lBRXhFLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUE7WUFDNUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQTtZQUNwQixPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7Z0JBQ3RCLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxDQUFBO1lBQ2hDLENBQUMsQ0FBQyxDQUFBO1lBQ0YsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUN0QixDQUFDLENBQUMsQ0FBQTtRQUVGLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUN6QyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQTtJQUN2QyxDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQTtBQUVELGlCQUFTLGlCQUFpQixDQUFBIn0=