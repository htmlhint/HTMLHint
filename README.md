# HTMLHint

[![Build Status](https://img.shields.io/travis/thedaviddias/HTMLHint.svg)](https://travis-ci.org/thedaviddias/HTMLHint)
[![codecov](https://codecov.io/gh/thedaviddias/HTMLHint/branch/master/graph/badge.svg)](https://codecov.io/gh/thedaviddias/HTMLHint)
[![NPM version](https://img.shields.io/npm/v/htmlhint.svg?style=flat)](https://www.npmjs.com/package/htmlhint)
[![NPM count](https://img.shields.io/npm/dm/htmlhint.svg?style=flat)](https://www.npmjs.com/package/htmlhint)
[![Greenkeeper badge](https://badges.greenkeeper.io/thedaviddias/HTMLHint.svg?style=flat)](https://greenkeeper.io/)
[![NPM count](https://img.shields.io/npm/dt/htmlhint.svg?style=flat)](https://www.npmjs.com/package/htmlhint)
[![License](https://img.shields.io/npm/l/htmlhint.svg?style=flat)](https://www.npmjs.com/package/htmlhint)
[![Discord](https://img.shields.io/badge/chat-on%20discord-7289da.svg?style=flat)](https://discord.gg/nJ6J9CP)

HTMLHint is a Static Code Analysis Tool for HTML, you can use it with IDE or in build system.

## 📟 Installation and Usage

Prerequisites: Node.js (>=6.14), npm version 3+.

There are two ways to install HTMLHint: globally and locally.

### Local Installation and Usage

In case you want to include HTMLHint as part of your project, you can install it locally using NPM:

```
$ npm install htmlhint --save-dev
```

After that, You can run HTMLHint on any file or directory like this:

```
$ ./node_modules/.bin/htmlhint www/index.html
$ ./node_modules/.bin/htmlhint www/**/*.html
```

### Global Installation and Usage

If you want to make HTMLHint available to tools that run across all of your projects, you can instal HTMLHint globally using NPM:

```
$ npm install htmlhint -g
```

After that, you can run HTMLHint on any file like this:

```
$ htmlhint www/index.html
$ htmlhint www/**/*.html
```

You can even launch HTMLHint to analyse an URL:

```
$ htmlhint https://htmlhint.io/
```

## 📃 Example output

## 🔧 Configuration

Search `.htmlhintrc` file in current directory and all parent directories:

```
$ htmlhint
$ htmlhint test.html
```

Custom config file:

```
$ htmlhint --config htmlhint.conf test.html
```

Custom rules:

```
$ htmlhint --rules tag-pair,id-class-value=underline index.html
```

Inline rules in `test.html`:

```
<!--htmlhint tag-pair,id-class-value:underline -->
<html>
<head>
...
```

## 🗺 Guide

1. [How to use](https://github.com/thedaviddias/HTMLHint/wiki/Usage)
2. [All Rules](https://github.com/thedaviddias/HTMLHint/wiki/Rules)
3. [How to Develop](https://github.com/thedaviddias/HTMLHint/wiki/Developer-guide)

## © License

[MIT License](./LICENSE).

## 💪🏻 Contributors

This project exists thanks to all these people. [Contribute](CONTRIBUTING.md).
<a href="https://github.com/thedaviddias/HTMLHint/graphs/contributors"><img src="https://opencollective.com/htmlhint/contributors.svg?width=890" /></a>

## 🏅 Backers

Thank you to all our backers! [Become a backer](https://opencollective.com/htmlhint#backer).

<a href="https://opencollective.com/htmlhint#backers" target="_blank"><img src="https://opencollective.com/htmlhint/backers.svg?width=890"></a>

## 🎖 Sponsors

Support this project by becoming a sponsor. Your logo will show up here with a link to your website. [Become a sponsor](https://opencollective.com/htmlhint#sponsor).

<a href="https://opencollective.com/htmlhint/sponsor/0/website" target="_blank"><img src="https://opencollective.com/htmlhint/sponsor/0/avatar.svg"></a>
