---
id: style-disabled
title: style-disabled
---

Style tag can not be use.

Level: `warning`

## Config value

1. true: enable rule
2. false: disable rule

The following pattern are considered violations:

<!-- prettier-ignore -->
```html
<head><style type="text/css"></style></head>
<body><style type="text/css"></style></body>
```
