/**
 * Copyright (c) 2015, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */
var jsonFormatter = function(formatter) {
  formatter.on('end', function(event) {
    formatter.writelnf(JSON.stringify(event.arrAllMessages));
  });
};

module.exports = jsonFormatter;
