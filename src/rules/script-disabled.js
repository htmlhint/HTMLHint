/**
  * Copyright (c) 2016, Sergey Yuhnevich <yuhnevic@gmail.com>
  * MIT Licensed
  */
 HTMLHint.addRule({
   id: 'script-disabled',
   description: 'The &lt;script&gt; tag cannot be used.',
   init: function (parser, reporter) {
     "use strict";
 
     var self = this;
 
     parser.addListener('tagstart', function (event) {
       if (event.tagName.toLowerCase() === 'script') {
         reporter.error('The &lt;script&gt; tag cannot be used.', event.line, event.col, self, event.raw);
       }
     });
   }
 });
 