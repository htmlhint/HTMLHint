---
id: attr-lowercase
title: attr-lowercase
---

Attribute name must be lowercase.

Level: `error`

## Config value

1. true: enable rule
2. false: disable rule
3. ['viewBox', 'Test']: enable rule except for the given attribute names

### Example

```json
{
  ...
  "attr-lowercase": ['viewBox']
  ...
}
```

The following pattern is **not** considered a rule violation:

<!-- prettier-ignore -->
```html
<img src="test.png" alt="test" />
```

The following pattern is considered a rule violation:

<!-- prettier-ignore -->
```html
<img SRC="test.png" ALT="test" />
```
