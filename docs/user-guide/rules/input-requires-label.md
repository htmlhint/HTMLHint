---
id: input-requires-label
title: input-requires-label
keywords:
  - input
  - label
  - accessiblity
---

All [ input ] tags must have a corresponding [ label ] tag.

Level: warning

## Config value

1. true: enable rule
2. false: disable rule

The following pattern are **not** considered violations:

<!-- prettier-ignore -->
```html
<input type="password">
<input id="some-id" type="password" /> <label for="some-other-id"/>
<input id="some-id" type="password" /> <label for=""/>
<input type="password" /> <label for="something"/>
```

The following pattern is considered violation:

<!-- prettier-ignore -->
```html
<label for="some-id"/><input id="some-id" type="password" />
<input id="some-id" type="password" /> <label for="some-id"/>
```
