---
id: attr-lowercase
title: attr-lowercase
---

Attribute name must be lowercase.

Level: `error`

## Config value

1. true: enable rule
2. false: disable rule
3. ['viewBox', 'test']: Ignore some attr name

The following pattern are **not** considered violations:

<!-- prettier-ignore -->
```html
<img src="test.png" alt="test" />
```

The following pattern is considered violation:

<!-- prettier-ignore -->
```html
<img src="test.png" alt="test" />
```
