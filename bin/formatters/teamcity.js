/**
 * Copyright (c) 2016, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */
var teamcityFormatter = function(formatter){

    function tcEscape(message) {
        return message
            .replace("'", "|'")
            .replace("\n", "|n")
            .replace("\r", "|r")
            .replace("|", "||")
            .replace("[", "|[")
            .replace("]", "|]");
        }

    function formatTeamCityMessage(name, properties) {
        var message = "##teamcity[" + tcEscape(name);
        for (var key in properties) {
            message += " " + key + "='" + tcEscape(properties[key]) + "'";
        }
        message += "]";
        return message;
    }


    formatter.on('end', function(event){
        var arrAllMessages = event.arrAllMessages;
        arrAllMessages.forEach(function(fileInfo){
            var filePath = fileInfo.file;
            var testSuiteName = "htmllint: " + filePath;
            console.log(formatTeamCityMessage("testSuiteStarted", { name: testSuiteName }));

            var arrMessages = fileInfo.messages;
            arrMessages.forEach(function(message){
                var testName = "(" + message.line + ", " + message.col + ") " + message.rule.description;
                console.log(formatTeamCityMessage("testStarted", { name: testName }));
                if(message.type === 'error' || message.type === 'warning'){
                    console.log(formatTeamCityMessage("testFailed", { name: testName, message: message.message }));
                }
                console.log(formatTeamCityMessage("testFinished", { name: testName }));
            });

            console.log(formatTeamCityMessage("testSuiteFinished", { name: testSuiteName }));
        });
    });
};
module.exports = teamcityFormatter;
