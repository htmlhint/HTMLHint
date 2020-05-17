---
id: getting-started
title: Getting Started
---

1\. Use npm to install HTMLHint:

```shell
npm install --save-dev htmlhint
```

2\. Create a `.htmlhintrc` configuration file in the root of your project:

```shell
{
  "attr-value-not-empty": false
}
```

3\. Run HTMLHint on, for example, all the CSS files in your project:

```shell
npx htmlhint "**/*.html"
```
