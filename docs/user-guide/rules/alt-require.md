---
id: alt-require
title: alt-require
keywords:
  - alt
  - image
  - accessibility
---

Alt of `img` must be present and alt of area[href] and input[type=image] must be set with a value.

Level: warning

## Config value

1. true: enable rule
2. false: disable rule

The following pattern are **not** considered rule violations:

<!-- prettier-ignore -->
```html
<img src="test.png" alt="test" />
<input type="image" alt="test" />
<area shape="circle" coords="180,139,14" href="test.html" alt="test" />
```

The following pattern is considered a rule violation:

<!-- prettier-ignore -->
```html
<img src="test.png" />
<input type="image" />
<area shape="circle" coords="180,139,14" href="test.html" />
```
