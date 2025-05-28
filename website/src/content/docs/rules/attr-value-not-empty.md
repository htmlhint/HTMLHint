---
id: attr-value-not-empty
title: attr-value-not-empty
description: Ensures all attributes have non-empty values to prevent invalid or ambiguous HTML.
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
