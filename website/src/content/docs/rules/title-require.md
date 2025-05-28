---
id: title-require
title: title-require
description: Ensures every HTML document includes a <title> tag within the <head> for accessibility and SEO.
---

`<title>` must be present in `<head>` tag.

Level: `error`

## Config value

1. true: enable rule
2. false: disable rule

The following pattern are **not** considered violations:

<!-- prettier-ignore -->
```html
<html><head><title>test</title></head></html>
```

The following pattern is considered violation:

<!-- prettier-ignore -->
```html
<html><head></head></html>
<html><head><title></title></head></html>
<html><title></title><head></head></html>
```
