/**
 * Copyright (c) 2015, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */
var formatter = {
    onEnd: function(hintInfo){
        console.log(JSON.stringify(hintInfo.arrAllMessages));
    }
};
module.exports = formatter;
