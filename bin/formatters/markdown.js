var markdownFormatter = function(formatter, HTMLHint){
    formatter.on('end', function(event){
        console.log('# TOC');
        var arrToc = [];
        var arrContents = [];
        var arrAllMessages = event.arrAllMessages;
        arrAllMessages.forEach(function(fileInfo){
            var filePath = fileInfo.file;
            var arrMessages = fileInfo.messages;
            var errorCount = 0;
            var warningCount = 0;
            arrMessages.forEach(function(message){
                if(message.type === 'error'){
                    errorCount ++;
                }
                else{
                    warningCount ++;
                }
            });
            arrToc.push('   - ['+filePath+'](#'+filePath+')');
            arrContents.push('<a name="'+filePath+'" />');
            arrContents.push('# '+filePath);
            arrContents.push('');
            arrContents.push('Found '+errorCount+' errors, '+warningCount+' warnings');
            var arrLogs = HTMLHint.format(arrMessages);
            arrContents.push('');
            arrLogs.forEach(function(log){
                arrContents.push('    '+log);
            });
            arrContents.push('');
        });
        console.log(arrToc.join('\r\n')+'\r\n');
        console.log(arrContents.join('\r\n'));
    });
};
module.exports = markdownFormatter;
