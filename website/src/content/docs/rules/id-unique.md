---
id: id-unique
title: id-unique
---

ID attributes must be unique in the document.

Level: `error`

## Config value

1. true: enable rule
2. false: disable rule

The following pattern are **not** considered violations:

<!-- prettier-ignore -->
```html
<div id="id1"></div><div id="id2"></div>
```

The following pattern is considered violation:

<!-- prettier-ignore -->
```html
<div id="id1"></div><div id="id1"></div>
```
