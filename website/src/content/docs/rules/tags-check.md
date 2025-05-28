---
id: tags-check
title: tags-check
description: Checks for correct usage of self-closing tags and required or excluded tags in HTML elements.
---

Check if particular tags are self-closing or must include or exclude particular tags.

Level: `error`

## Config value

1. true: enable rule
2. false: disable rule
3. {}: configuration object, mapping values of tags to their respective configuration. Tags configuration can have properties of:

`selfclosing`

If an element is or is not self-closing, when it otherwise should be.

Level: `warn`

`attrsRequired`

If an element is missing an attribute that should exist.

Level: `error`

`redundantAttrs`

If an element has an attribute that is not necessary.

Level: `error`

`attrsOptional`

If an element has an attribute that is not included in the allowable set.

Level: `error`

### Example

```json
{
  ...
  "tags-check": {
    "a": {
      "selfclosing": true,
      "attrsRequired": ["href", "title"],
      "redundantAttrs": ["alt"],
    }
  },
  "script": {
    "attrsOptional": [
      ["async", "async"],
      ["defer", "defer"],
    ],
  },
  ...
}
```

The following pattern are **not** considered violations:

<!-- prettier-ignore -->
```html
<main>Main content</main>
<a href="#" title="">blabla</a>
<a href="bbb" title="aaa">Link</a>
<img src="bbb" title="aaa" alt="asd" />
```

The following pattern is considered a violation:

<!-- prettier-ignore -->
```html
<main role="main"></main>
<a>blabla</a>
<a href="bbb" title="aaa" />
<img src="bbb" title="aaa" alt="asd"></img>
```
