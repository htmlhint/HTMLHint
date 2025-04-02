---
id: attr-space-between
title: attr-space-between
---

Attributes must be separated by a space.

Level: `error`

## Config value

1. true: enable rule
2. false: disable rule

The following pattern are **not** considered violations:

<!-- prettier-ignore -->
```html
<div class="foo" id="bar"></div>
```

The following pattern is considered violation:

<!-- prettier-ignore -->
```html
<div class="foo"id="bar"></div>
```
