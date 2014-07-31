/* global __dirname */
var exec = require('child_process').exec;

var expect  = require("expect.js");

describe('Executable', function(){

  it('Executable exits correctly', function(){
    exec( __dirname + '/../bin/htmlhint -l', function (error) {
      expect(error).to.be(null);
    });
  });

});
