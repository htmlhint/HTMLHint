---
id: empty-tag-not-self-closed
title: empty-tag-not-self-closed
---

The empty tag should not be closed by self.

Level: `warning`

## Config value

1. true: enable rule
2. false: disable rule

The following pattern are **not** considered violations:

<!-- prettier-ignore -->
```html
<br>
```

The following pattern is considered violation:

<!-- prettier-ignore -->
```html
<br />
```
