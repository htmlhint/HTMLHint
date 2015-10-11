HTMLHint
=======================

![HTMLHint logo](https://raw.github.com/yaniswang/HTMLHint/master/logo.png)

HTMLHint is a Static Code Analysis Tool for HTML, you can use it with IDE or in build system.

[![Build Status](https://travis-ci.org/yaniswang/HTMLHint.svg)](https://travis-ci.org/yaniswang/HTMLHint)
[![Coverage Status](https://coveralls.io/repos/yaniswang/HTMLHint/badge.svg?branch=master&service=github)](https://coveralls.io/github/yaniswang/HTMLHint?branch=master)
[![NPM version](https://img.shields.io/npm/v/htmlhint.svg?style=flat)](https://www.npmjs.com/package/htmlhint)
[![License](https://img.shields.io/npm/l/htmlhint.svg?style=flat)](https://www.npmjs.com/package/htmlhint)
[![NPM count](https://img.shields.io/npm/dm/htmlhint.svg?style=flat)](https://www.npmjs.com/package/htmlhint)
[![NPM count](https://img.shields.io/npm/dt/htmlhint.svg?style=flat)](https://www.npmjs.com/package/htmlhint)

Official Site: [http://htmlhint.com/](http://htmlhint.com/)

Quick start
======================

1. install & hint

        npm install htmlhint -g
        htmlhint -V
        htmlhint --help
        htmlhint www
        htmlhint www/test.html
        htmlhint www/**/*.xhtml
        htmlhint www/**/*.{htm,html}

2. results

           test.html
              L5 |    </head>
                      ^ <title> must be present in <head> tag. (title-require)
              L8 |    </body>
                      ^ Tag must be paired, missing: [ </div> ], start tag match failed [ <div> ] on line 7. (tag-pair)

        2 errors in 1 files

3. config rules

    search `.htmlhintrc` file in current directory and all parent directorys:

        htmlhint
        htmlhint test.html

    custom config file:

        htmlhint --config htmlhint.conf test.html

    custom rules:

        htmlhint --rules tag-pair,id-class-value=underline test.html

    Inline rules in `test.html`:

        <!--htmlhint tag-pair,id-class-value:underline -->
        <html>
        <head>
            ...

Guide
=======================

1. [How to use](https://github.com/yaniswang/HTMLHint/wiki/Usage)
2. [All Rules](https://github.com/yaniswang/HTMLHint/wiki/Rules)
2. [How to Develop](https://github.com/yaniswang/HTMLHint/wiki/Developer-guide)

License
================

HTMLHint is released under the MIT license:

> The MIT License
>
> Copyright (c) 2014-2015 Yanis Wang \< yanis.wang@gmail.com \>
>
> Permission is hereby granted, free of charge, to any person obtaining a copy
> of this software and associated documentation files (the "Software"), to deal
> in the Software without restriction, including without limitation the rights
> to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
> copies of the Software, and to permit persons to whom the Software is
> furnished to do so, subject to the following conditions:
>
> The above copyright notice and this permission notice shall be included in
> all copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
> IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
> FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
> AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
> LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
> OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
> THE SOFTWARE.

Thanks
================

* mocha: [https://github.com/visionmedia/mocha](https://github.com/visionmedia/mocha)
* expect.js: [https://github.com/LearnBoost/expect.js](https://github.com/LearnBoost/expect.js)
* istanbul: [https://github.com/gotwarlost/istanbul](https://github.com/gotwarlost/istanbul)
* Grunt: [http://gruntjs.com/](http://gruntjs.com/)
* commander.js: [https://github.com/visionmedia/commander.js](https://github.com/visionmedia/commander.js)
* colors.js: [https://github.com/Marak/colors.js](https://github.com/Marak/colors.js)
* glob: [https://github.com/isaacs/node-glob](https://github.com/isaacs/node-glob)
* jshint: [https://github.com/jshint/jshint](https://github.com/jshint/jshint)
* csslint: [https://github.com/stubbornella/csslint](https://github.com/stubbornella/csslint)
* GitHub: [https://github.com/](https://github.com/)
