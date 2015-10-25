/**
 * Copyright (c) 2015, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */
var jsonFormatter = function(formatter, HTMLHint, options){
    formatter.on('end', function(event){
        console.log(JSON.stringify(event.arrAllMessages));
    });
};
module.exports = jsonFormatter;
