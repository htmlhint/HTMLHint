---
id: attr-whitespace
title: attr-whitespace
---

No leading or trailing spaces inside attribute values.

Level: `error`

## Config value

1. true: enable rule
2. false: disable rule

The following pattern are **not** considered violations:

<!-- prettier-ignore -->
```html
<div title="a"></div>
```

The following pattern is considered violation:

<!-- prettier-ignore -->
```html
<div title=" a"></div>
<div title="a "></div>
<div title=" a "></div>
```
