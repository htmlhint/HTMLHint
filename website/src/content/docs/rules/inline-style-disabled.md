---
id: inline-style-disabled
title: inline-style-disabled
description: Disallows the use of inline style attributes to promote separation of content and presentation.
---

Inline style cannot be use.

Level: `warning`

## Config value

1. true: enable rule
2. false: disable rule

The following pattern are considered violations:

<!-- prettier-ignore -->
```html
<div style="color:red"></div>
```
