---
id: spec-char-escape
title: spec-char-escape
---

Special characters must be escaped.

Level: `error`

## Config value

1. true: enable rule
2. false: disable rule

The following patterns are **not** considered violations:

<!-- prettier-ignore -->
```html
<span>aaa&gt;bbb&lt;ccc</span>
<span>Steinway &amp; Sons, Q&amp;A</span>
<span>Steinway & Sons, Q&A</span>
```

The following pattern is considered violation:

<!-- prettier-ignore -->
```html
<span>aaa>bbb<ccc</span>
```
