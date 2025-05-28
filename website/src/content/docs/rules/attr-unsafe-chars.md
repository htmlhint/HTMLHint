---
id: attr-unsafe-chars
title: attr-unsafe-chars
description: Disallows unsafe characters in attribute values to prevent rendering and security issues.
---

Attribute value cannot use unsafe chars.

regexp: `/[\u0000-\u0009\u000b\u000c\u000e-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/`

Level: `warning`

## Config value

1. true: enable rule
2. false: disable rule

The following pattern are **not** considered violations:

<!-- prettier-ignore -->
```html
<li>
  <a href="https://vimeo.com/album/1951235/video/56931059">Sud Web 2012</a>
</li>
```

The following pattern is considered violation:

<!-- prettier-ignore -->
```html
<li>
  <a href="https://vimeo.com/album/1951235/video/56931059‎\u0009‎"
    >Sud Web 2012</a
  >
</li>
```

:::tip
The unsafe chars is in the tail of the href attribute.
:::
