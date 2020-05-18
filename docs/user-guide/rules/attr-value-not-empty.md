---
id: attr-value-not-empty
title: attr-value-not-empty
---

Attribute must set value.

Level: `warning`

## Config value

1. true: enable rule
2. false: disable rule

The following pattern are **not** considered violations:

<!-- prettier-ignore -->
```html
<input type="button" disabled="disabled" />
```

The following pattern is considered violation:

<!-- prettier-ignore -->
```html
<input type="button" disabled />
```
