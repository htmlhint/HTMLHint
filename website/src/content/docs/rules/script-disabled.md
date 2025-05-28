---
id: script-disabled
title: script-disabled
description: Disallows the use of <script> tags in HTML documents for security and maintainability.
---

The script tag can not be used anywhere in the document.

Level: `warning`

## Config value

1. true: enable rule
2. false: disable rule

The following pattern are **not** considered violations:

<!-- prettier-ignore -->
```html
<body>
</body>
```

The following patterns are considered violation:

<!-- prettier-ignore -->
```html
<head>
  <script src="test.js"></script>
</head>
```

<!-- prettier-ignore -->
```html
<body>
  <script src="test.js"></script>
</body>
```
