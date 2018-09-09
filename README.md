<h1 align="center">
  <br>
  <a href="https://htmlhint.io"><img src="https://raw.githubusercontent.com/htmlhint/htmlhint/develop/src/img/htmlhint.png" alt="Logo HTMLHint" width="170"></a>
  <br>
  HTMLHint
  <br>
</h1>

<h4 align="center">The static code analysis tool you need for your HTML.</h4>

<p align="center">
  <a href="https://travis-ci.org/htmlhint/HTMLHint">
    <img src="https://img.shields.io/travis/htmlhint/HTMLHint.svg" alt="Travis Build Status">
  </a>
  <a href="https://codecov.io/gh/htmlhint/HTMLHint">
    <img src="https://codecov.io/gh/htmlhint/HTMLHint/branch/master/graph/badge.svg" alt="Codecov">
  </a>
  <a href="https://www.npmjs.com/package/htmlhint">
    <img src="https://img.shields.io/npm/dm/htmlhint.svg" alt="NPM count">
  </a>
  <img src="https://badgen.net/badge/license/MIT/green" alt="MIT Licence" />
  <a href="https://discord.gg/nJ6J9CP">
    <img src="https://img.shields.io/badge/chat-on%20discord-7289da.svg" alt="Chat">
  </a>
  <a href="http://roadmap.htmlhint.io/roadmap">
    <img src="https://img.shields.io/badge/check-our%20roadmap-EE503E.svg" alt="Chat">
  </a>
</p>

<p align="center">
  <a href="#installation-and-usage">How To Use</a> • <a href="#contributing">Contributing</a> • <a href="http://roadmap.htmlhint.io/">Roadmap</a> • <a href="https://htmlhint.io">Website</a>
</p>

## Table of Contents

- **[Installation and Usage](#installation-and-usage)**
  - **[Local Installation and Usage](#local-installation-and-usage)**
  - **[Global Installation and Usage](#global-installation-and-usage)**
- **[Example output](#example-output)**
- **[Configuration](#configuration)**
- **[Docs](#docs)**

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

## 📙 Docs

1. [How to use](https://github.com/htmlhint/HTMLHint/wiki/Usage)
2. [All Rules](https://github.com/htmlhint/HTMLHint/wiki/Rules)
3. [How to Develop](https://github.com/htmlhint/HTMLHint/wiki/Developer-guide)

## © License

[MIT License](./LICENSE)

## 💪🏻 Contributors

This project exists thanks to all these people. [Contribute](CONTRIBUTING.md).
<a href="https://github.com/htmlhint/HTMLHint/graphs/contributors"><img src="https://opencollective.com/htmlhint/contributors.svg?width=890" /></a>

## 🏅 Backers

Thank you to all our backers! [Become a backer](https://opencollective.com/htmlhint#backer).

<a href="https://opencollective.com/htmlhint#backers" target="_blank"><img src="https://opencollective.com/htmlhint/backers.svg?width=890"></a>

## 🎖 Sponsors

Support this project by becoming a sponsor. Your logo will show up here with a link to your website. [Become a sponsor](https://opencollective.com/htmlhint#sponsor).

<a href="https://opencollective.com/htmlhint/sponsor/0/website" target="_blank"><img src="https://opencollective.com/htmlhint/sponsor/0/avatar.svg"></a>
