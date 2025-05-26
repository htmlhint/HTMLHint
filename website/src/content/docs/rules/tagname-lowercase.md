---
id: tagname-lowercase
title: tagname-lowercase
---

Tagname must be lowercase.

Level: `error`

## Config value

1. true: enable rule
2. false: disable rule
3. ['clipPath', 'test']: Ignore some tagname name

The following pattern are **not** considered violations:

<!-- prettier-ignore -->
```html
<span><div>
```

The following pattern is considered violation:

<!-- prettier-ignore -->
```html
<SPAN><BR>
```
