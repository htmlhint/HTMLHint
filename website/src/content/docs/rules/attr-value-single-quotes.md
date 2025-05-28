---
id: attr-value-single-quotes
title: attr-value-single-quotes
description: Requires attribute values in HTML to be enclosed in single quotes for consistency.
---

Attribute value must closed by single quotes.

Level: `error`

## Config value

1. true: enable rule
2. false: disable rule

The following pattern are **not** considered violations:

<!-- prettier-ignore -->
```html
<a href='' title='abc'></a>
```

The following pattern is considered violation:

<!-- prettier-ignore -->
```html
<a href="" title="abc"></a>
```
