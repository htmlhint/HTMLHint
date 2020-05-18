---
id: tags-check
title: tags-check
---

Allowing specify rules for any tag and validate that

The following pattern are **not** considered violations:

<!-- prettier-ignore -->
```html
<main>Main content</main>
<a href="#" title="">blabla</a>
<a href="bbb" title="aaa">Link</a>
<img src="bbb" title="aaa" alt="asd" />
```

The following pattern is considered violation:

<!-- prettier-ignore -->
```html
<main role="main"></main>
<a>blabla</a>
<a href="bbb" title="aaa" />
<img src="bbb" title="aaa" alt="asd"></img>
```
