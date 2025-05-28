---
id: tag-pair
title: tag-pair
description: Ensures that all HTML tags are properly paired with corresponding opening and closing tags.
---

Tag must be paired.

Level: `error`

## Config value

1. true: enable rule
2. false: disable rule

The following pattern are **not** considered violations:

<!-- prettier-ignore -->
```html
<ul><li></li></ul>
```

The following pattern is considered violation:

<!-- prettier-ignore -->
```html
<ul><li></ul>
<ul></li></ul>
```
