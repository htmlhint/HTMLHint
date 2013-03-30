#!/usr/bin/env node

var program = require('commander');

function map(val) {
	var objMap = {};
	val.split(',').forEach(function(item){
		var arrItem = item.split(/\s*=\s*/);
		objMap[arrItem[0]] = arrItem[1]?arrItem[1]:true;
	});
	return objMap;
}

program.on('--help', function(){
  console.log('  Examples:');
  console.log('');
  console.log('    htmlhint -l');
  console.log('    htmlhint -r tag-pair,id-class-value=underline test.html');
  console.log('    htmlhint -c .htmlhintrc test.html');
  console.log('');
});

program
  .version('0.9.2')
  .usage('[options] <file ...>')
  .option('-l, --list', 'show all of the rules available.')
  .option('-c, --config <file>', 'custom configuration file.')
  .option('-r, --rules <ruleid, ruleid=value ...>', 'set all of the rules available.', map)
  .parse(process.argv);

console.log(' list: %j', program.list);
console.log(' config: %j', program.config);
console.log(' rules: %j', program.rules);
console.log(' args: %j', program.args);