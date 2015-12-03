/**
 * Copyright (c) 2015, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */
var jsonFormatter = function(formatter){
    formatter.on('end', function(event){
        var writeFull = process.stdout.write(JSON.stringify(event.arrAllMessages));
        if(!writeFull) {
          formatter.needDrain = true;
        } else {
          formatter.needDrain = false;
        }
    });
};
module.exports = jsonFormatter;
