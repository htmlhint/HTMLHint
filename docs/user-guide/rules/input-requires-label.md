---
id: input-requires-label
title: input-requires-label
---

All `input` tags must have a corresponding `label` tag.

## Possible Configuration Values

```json
{
  "input-requires-label": "off",
  "input-requires-label": "warn",
  "input-requires-label": "error",
  "input-requires-label": ["off"],
  "input-requires-label": ["warn"],
  "input-requires-label": ["error"]
}
```

## Default

```json
{ "input-requires-label": "off" }
```

---

## Examples

Examples of **correct** code for this rule:

<!-- prettier-ignore -->
```html
<label for="username">Username</label>
<input type="text" id="username" />
```

Examples of **incorrect** code for this rule:

```html
<input type="text" id="username" />
```

---

## When Not To Use It

If your project will use not use labels.

## Version

This rule was introduced in HTMLHint `v0.13.0`.
