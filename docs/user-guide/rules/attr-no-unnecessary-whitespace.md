---
id: attr-no-unnecessary-whitespace
title: attr-no-unnecessary-whitespace
---

No spaces between attribute names and values.

## Possible Configuration Values

```json
{
  "attr-no-unnecessary-whitespace": "off",
  "attr-no-unnecessary-whitespace": "warn",
  "attr-no-unnecessary-whitespace": "error",
  "attr-no-unnecessary-whitespace": ["off"],
  "attr-no-unnecessary-whitespace": ["warn", { "exceptions": ["test"] }],
  "attr-no-unnecessary-whitespace": ["error", { "exceptions": ["test"] }]
}
```

## Default

```json
{ "attr-no-unnecessary-whitespace": "error" }
```

## Options

This rule has an object option:

- `"exceptions": ['test']` ignore some attribute names.

---

## Examples

Examples of **correct** code for this rule:

<!-- prettier-ignore -->
```html
<div title="a"></div>
```

Examples of **incorrect** code for this rule:

<!-- prettier-ignore -->
```html
<div title = "a"></div>
<div title= "a"></div>
<div title ="a"></div>
```

---

## When Not To Use It

If your project will use spaces between attribute names and values.

## Version

This rule was introduced in HTMLHint `v0.13.0`.
