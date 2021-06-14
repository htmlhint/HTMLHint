---
id: tagname-lowercase
title: tagname-lowercase
---

All html element names must be in lowercase.

## Possible Configuration Values

```json
{
  "tagname-lowercase": "off",
  "tagname-lowercase": "warn",
  "tagname-lowercase": "error",
  "tagname-lowercase": ["off"],
  "tagname-lowercase": ["warn", { "exceptions": ["clipPath", "test"] }],
  "tagname-lowercase": ["error", { "exceptions": ["clipPath", "test"] }]
}
```

## Default

```json
{ "tagname-lowercase": "error" }
```

## Options

This rule has an object option:

- `"exceptions": ["clipPath", "test"]` ignore tagnames `clipPath` and `test`.

---

## Examples

Examples of **correct** code for this rule:

<!-- prettier-ignore -->
```html
<span><div>
```

Examples of **incorrect** code for this rule:

<!-- prettier-ignore -->
```html
<SPAN><BR>
```

---

## When Not To Use It

If your project will not use lower case tagnames.

## Version

This rule was introduced in HTMLHint `v0.9.1`.
