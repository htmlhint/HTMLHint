---
id: doctype-html5
title: doctype-html5
description: Requires the use of the HTML5 doctype declaration for modern web standards compliance.
---

Rule ID: `doctype-html5`

Doctype must be HTML5.

Level: `warning`

## Config value

1. true: enable rule
2. false: disable rule

The following pattern are **not** considered violations:

<!-- prettier-ignore -->
```html
<!DOCTYPE HTML><html>
```

The following pattern is considered a violation:

<!-- prettier-ignore -->
```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"><html>
```
