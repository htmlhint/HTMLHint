---
id: href-abs-or-rel
title: href-abs-or-rel
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
abs: <a href="http://www.alibaba.com/">test1</a> <a href="https://www.alipay.com/">test2</a>
rel: <a href="test.html">test1</a> <a href="../test.html">test2</a>

```
