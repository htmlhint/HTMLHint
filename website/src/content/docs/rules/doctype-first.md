---
id: doctype-first
title: doctype-first
description: Ensures the doctype declaration appears as the first element in HTML documents.
---

Doctype must be first.

Level: `error`

## Config value

1. true: enable rule
2. false: disable rule

The following pattern are **not** considered violations:

<!-- prettier-ignore -->
```html
<!DOCTYPE html>
<html></html>
```

<!-- prettier-ignore -->
```html
<!DOCTYPE html>
<html></html>
```

The following pattern is considered violation:

<!-- prettier-ignore -->
```html
<!--comment--><!DOCTYPE html>
<html></html>
```
