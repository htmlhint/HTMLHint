---
id: attr-lowercase
title: attr-lowercase
description: Enforces all attribute names in HTML to be lowercase for consistency and standards compliance.
---

Attribute name must be lowercase.

Level: `error`

## Config value

1. true: enable rule
2. false: disable rule
3. ['fooBar', 'Test']: enable rule except for the given attribute names. All SVG camelCase properties are included, for example `viewBox`

### Example

```json
{
  ...
  "attr-lowercase": ['fooBar']
  ...
}
```

The following pattern is **not** considered a rule violation:

<!-- prettier-ignore -->
```html
<img src="test.png" alt="test" />

<!-- known SVG attributes are ignored -->
<svg width="200" height="200" viewBox="0 0 200 200" />
```

The following pattern is considered a rule violation:

<!-- prettier-ignore -->
```html
<img SRC="test.png" ALT="test" />
```
