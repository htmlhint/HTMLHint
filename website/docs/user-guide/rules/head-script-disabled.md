---
id: head-script-disabled
title: head-script-disabled
---

The script tag can not be used in head.

Level: `warning`

## Config value

1. true: enable rule
2. false: disable rule

The following pattern are **not** considered violations:

<!-- prettier-ignore -->
```html
<body>
  <script src="test.js"></script>
</body>
```

The following pattern is considered violation:

<!-- prettier-ignore -->
```html
<head>
  <script src="test.js"></script>
</head>
```
