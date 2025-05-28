---
id: attr-no-duplication
title: attr-no-duplication
description: Prevents duplicate attributes in a single HTML element to ensure valid and clean markup.
---

The same attribute can't be specified twice.

Level: `error`

## Config value

1. true: enable rule
2. false: disable rule

The following pattern are **not** considered violations:

<!-- prettier-ignore -->
```html
<img src="a.png" />
```

The following pattern is considered violation:

<!-- prettier-ignore -->
```html
<img src="a.png" src="b.png" />
```
