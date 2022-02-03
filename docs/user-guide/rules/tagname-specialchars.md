---
id: tagname-specialchars
title: tagname-specialchars
---

Tagname must not contain any characters beside letters, numbers, "-", ":" or "\_".

Level: `error`

## Config value

1. true: enable rule
2. false: disable rule

The following pattern are **not** considered violations:

<!-- prettier-ignore -->
```html
<a href=""></a><span>test</span>
```

The following patterns are considered violation:

<!-- prettier-ignore -->
```html
<@ href="link"></@>
<$pan>aab</$pan>
```
