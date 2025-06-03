<h1 align="center">
  <br>
  <a href="https://htmlhint.com"><img src="https://raw.githubusercontent.com/htmlhint/HTMLHint/main/website/src/assets/img/htmlhint.png" alt="Logo HTMLHint" width="170"></a>
  <br>
  HTMLHint
  <br>
</h1>

<h4 align="center">The static code analysis tool you need for your HTML.</h4>

<p align="center">
  <a href="https://www.npmjs.com/package/htmlhint">
    <img src="https://img.shields.io/npm/v/htmlhint" alt="npm Version">
  </a>
  <a href="https://codecov.io/gh/htmlhint/HTMLHint">
    <img src="https://codecov.io/gh/htmlhint/HTMLHint/branch/main/graph/badge.svg" alt="Codecov">
  </a>
  <a href="https://www.npmjs.com/package/htmlhint">
    <img src="https://img.shields.io/npm/dm/htmlhint.svg" alt="npm count">
  </a>
  <a href="https://github.com/htmlhint/HTMLHint/blob/main/LICENSE.md">
    <img src="https://img.shields.io/github/license/htmlhint/HTMLHint" alt="MIT License" />
  </a>
</p>

<p align="center">
  <a href="#-installation-and-usage">How To Use</a> • <a href="/.github/CONTRIBUTING.md">Contributing</a> • <a href="https://htmlhint.com">Website</a>
</p>

## Table of Contents

- **[Installation and Usage](#-installation-and-usage)**
  - **[Local Installation and Usage](#local-installation-and-usage)**
  - **[Global Installation and Usage](#global-installation-and-usage)**
- **[Example output](#-example-output)**
- **[Configuration](#-configuration)**
- **[Docs](#-docs)**

## 📟 Installation and Usage

There are two ways to install HTMLHint: globally and locally.

### Local Installation and Usage

In case you want to include HTMLHint as part of your project, you can install it locally using npm:

```bash
npm install htmlhint --save-dev
```

After that, You can run HTMLHint on any file or directory like this:

```bash
./node_modules/.bin/htmlhint www/index.html
./node_modules/.bin/htmlhint www/**/*.html
```

Or, you can use HTMLHint linter programmatically, like this:

```js
import { HTMLHint } from 'htmlhint'
const htmlVerificationHints = HTMLHint.verify(localHtmlContent)
console.log('htmlVerificationHints', htmlVerificationHints) // this logs a list of `Hint`s which contain information on all linting errors
```

### Global Installation and Usage

If you want to make HTMLHint available to tools that run across all of your projects, you can install HTMLHint globally using npm:

```bash
npm install htmlhint -g
```

After that, you can run HTMLHint on any file like this:

```bash
htmlhint www/index.html
htmlhint www/**/*.html
```

You can even launch HTMLHint to analyze an URL:

```bash
htmlhint https://htmlhint.com/
```

## 📃 Example output

## 🔧 Configuration

Search `.htmlhintrc` file in current directory and all parent directories:

```bash
htmlhint
htmlhint test.html
```

Custom config file:

```bash
htmlhint --config htmlhint.conf test.html
```

Custom rules:

```bash
htmlhint --rules tag-pair,id-class-value=underline index.html
```

Inline rules in `test.html`:

```html
<!--htmlhint tag-pair,id-class-value:underline -->
<html>
  <head>
    ...
  </head>
</html>
```

## 📙 Docs

1. [How to use](https://htmlhint.com/getting-started/)
2. [All Rules](https://htmlhint.com/rules/)
3. [Changelog](https://htmlhint.com/changelog/)
4. [How to Develop](/.github/CONTRIBUTING.md)

## © License

[MIT License](./LICENSE.md)

## 💪🏻 Contributors

This project exists thanks to all these people. [Contribute](/.github/CONTRIBUTING.md).
<a href="https://github.com/htmlhint/HTMLHint/graphs/contributors"><img src="https://opencollective.com/htmlhint/contributors.svg?width=890" alt="HTMLHint Contributors" /></a>

## 🏅 Backers

Thank you to all our backers! [Become a backer](https://opencollective.com/htmlhint#backer).

<a href="https://opencollective.com/htmlhint#backers" target="_blank"><img src="https://opencollective.com/htmlhint/backers.svg?width=890" alt="Backers"></a>

## 🎖 Sponsors

Support this project by becoming a sponsor. Your logo will show up here with a link to your website. [Become a sponsor](https://opencollective.com/htmlhint#sponsor).

<a href="https://opencollective.com/htmlhint/sponsor/0/website" target="_blank"><img src="https://opencollective.com/htmlhint/sponsor/0/avatar.svg" alt="Sponsor"></a>
