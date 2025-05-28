---
id: href-abs-or-rel
title: href-abs-or-rel
description: Enforces href attributes to be either absolute or relative URLs as specified in the configuration.
---

Href must be absolute or relative.

Level: `warning`

## Config value

1. abs: absolute mode
2. rel: relative mode
3. false: disable rule

The following pattern are **not** considered violations:

<!-- prettier-ignore -->
```html
abs: <a href="https://www.htmlhint.com/">test1</a> <a href="https://www.github.com/">test2</a>
rel: <a href="test.html">test1</a> <a href="../test.html">test2</a>

```
