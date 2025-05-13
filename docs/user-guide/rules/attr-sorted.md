---
id: attr-sorted
title: attr-sorted
---

Attributes should be sorted in the following order:

- class
- id
- name
- src
- for
- type
- href
- value
- title
- alt
- role

Level: `error`

## Config value

1. true: enable rule
2. false: disable rule

The following pattern are **not** considered violations:

<!-- prettier-ignore -->
```html
<div img="image" meta="meta" font="font"></div>
```

The following pattern is considered violation:

<!-- prettier-ignore -->
```html
<div type="type" img="image" id="id" font="font"></div>
```
