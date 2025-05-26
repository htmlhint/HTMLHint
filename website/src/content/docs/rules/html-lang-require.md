---
id: html-lang-require
title: html-lang-require
keywords:
  - i18n
---

The lang attribute of an `<html>` element must be present and should be valid.

Level: warning

## Config value

1. true: enable rule
2. false: disable rule

The following pattern are **not** considered rule violations:

<!-- prettier-ignore -->
```html
<html lang="en"></html>
```

The following patterns are considered a rule violations:

<!-- prettier-ignore -->
```html
<!-- missing lang tag -->
<html></html>
```

<!-- prettier-ignore -->
```html
<!-- empty lang tag -->
<html lang=""></html>
```

<!-- prettier-ignore -->
```html
<!-- invalid BCP 47 lang value -->
<html lang="-"></html>
```
