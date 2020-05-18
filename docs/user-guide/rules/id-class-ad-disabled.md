---
id: id-class-ad-disabled
title: id-class-ad-disabled
---

Id and class can not use ad keyword, it will blocked by adblock software.

Level: `warning`

## Config value

1. true: enable rule
2. false: disable rule

The following pattern are **not** considered violations:

<!-- prettier-ignore -->
```html
<div id="adcontainer"></div>
```

The following pattern is considered violation:

<!-- prettier-ignore -->
```html
<div id="ad-container"></div>
<div id="ad_container"></div>
```
