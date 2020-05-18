---
id: src-not-empty
title: src-not-empty
---

Src of img(script, link) must set value.

Emtpy of src will visit current page twice.

Level: `error`

## Config value

1. true: enable rule
2. false: disable rule

The following pattern are **not** considered violations:

<!-- prettier-ignore -->
```html
<img src="test.png" />
<script src="test.js"></script>
<link href="test.css" type="text/css" />
<embed src="test.swf">
<bgsound src="test.mid" />
<iframe src="test.html">
<object data="test.swf">
```

The following patterns are considered violations:

<!-- prettier-ignore -->
```html
<img src />
<script src=""></script>
<script src></script>
<link href="" type="text/css" />
<link href type="text/css" />
<embed src="">
<embed src>
<bgsound src="" />
<bgsound src />
<iframe src="">
<iframe src>
<object data="">
<object data>
```
