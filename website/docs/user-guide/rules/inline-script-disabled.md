---
id: inline-script-disabled
title: inline-script-disabled
---

Inline script cannot be used.

Level: `warning`

## Config value

1. true: enable rule
2. false: disable rule

The following pattern are considered violations:

<!-- prettier-ignore -->
```html
<img src="test.gif" onclick="alert(1);">
<img src="javascript:alert(1)">
<a href="javascript:alert(1)">test1</a>
```
