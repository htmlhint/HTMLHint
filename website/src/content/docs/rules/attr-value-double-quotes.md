---
id: attr-value-double-quotes
title: attr-value-double-quotes
description: Requires attribute values in HTML to be enclosed in double quotes for consistency and standards compliance.
---

Attribute value must closed by double quotes.

Level: `error`

## Config value

1. true: enable rule
2. false: disable rule

The following pattern are **not** considered violations:

<!-- prettier-ignore -->
```html
<a href="" title="abc"></a>
```

The following pattern is considered violation:

<!-- prettier-ignore -->
```html
<a href='' title='abc'></a>
```
