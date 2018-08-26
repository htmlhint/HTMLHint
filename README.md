# HTMLHint

[![Build Status](https://img.shields.io/travis/thedaviddias/HTMLHint.svg)](https://travis-ci.org/thedaviddias/HTMLHint)
[![codecov](https://codecov.io/gh/thedaviddias/HTMLHint/branch/master/graph/badge.svg)](https://codecov.io/gh/thedaviddias/HTMLHint)
[![NPM version](https://img.shields.io/npm/v/htmlhint.svg?style=flat)](https://www.npmjs.com/package/htmlhint)
[![NPM count](https://img.shields.io/npm/dm/htmlhint.svg?style=flat)](https://www.npmjs.com/package/htmlhint)
[![License](https://img.shields.io/npm/l/htmlhint.svg?style=flat)](https://www.npmjs.com/package/htmlhint)
[![Discord](https://img.shields.io/badge/chat-on%20discord-7289da.svg?style=flat)](https://discord.gg/nJ6J9CP)



HTMLHint is a Static Code Analysis Tool for HTML, you can use it with IDE or in build system.

## Getting started

1. Installation & hints

        npm install htmlhint -g
        htmlhint -V
        htmlhint --help
        htmlhint www
        htmlhint www/test.html
        htmlhint www/**/*.xhtml
        htmlhint www/**/*.{htm,html}
        htmlhint http://www.alibaba.com/
        cat test.html | htmlhint stdin

2. Results

           test.html
              L5 |    </head>
                      ^ <title> must be present in <head> tag. (title-require)
              L8 |    </body>
                      ^ Tag must be paired, missing: [ </div> ], start tag match failed [ <div> ] on line 7. (tag-pair)

        2 errors in 1 files

3. Config rules

    search `.htmlhintrc` file in current directory and all parent directories:

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

## Guide

1. [How to use](https://github.com/thedaviddias/HTMLHint/wiki/Usage)
2. [All Rules](https://github.com/thedaviddias/HTMLHint/wiki/Rules)
2. [How to Develop](https://github.com/thedaviddias/HTMLHint/wiki/Developer-guide)

## License

[The MIT License](https://raw.githubusercontent.com/thedaviddias/HTMLHint/master/LICENSE).

## Contributors

This project exists thanks to all these people. [Contribute](CONTRIBUTING.md).
<a href="https://github.com/thedaviddias/HTMLHint/graphs/contributors"><img src="https://opencollective.com/htmlhint/contributors.svg?width=890" /></a>

## Backers

Thank you to all our backers! [Become a backer](https://opencollective.com/stylelint#backer).

<a href="https://opencollective.com/htmlhint#backers" target="_blank"><img src="https://opencollective.com/htmlhint/backers.svg?width=890"></a>

## Sponsors

Support this project by becoming a sponsor. Your logo will show up here with a link to your website. [Become a sponsor](https://opencollective.com/htmlhint#sponsor).

<a href="https://opencollective.com/htmlhint/sponsor/0/website" target="_blank"><img src="https://opencollective.com/htmlhint/sponsor/0/avatar.svg"></a>
