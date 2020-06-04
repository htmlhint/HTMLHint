---
id: doctype-html5
title: doctype-html5
---

Doctype must be html5.

```json
{
  "doctype-html5": "off",
  "doctype-html5": "warn",
  "doctype-html5": "error",
  "doctype-html5": ["off"],
  "doctype-html5": ["warn"],
  "doctype-html5": ["error"]
}
```

## Default

```json
{ "doctype-html5": "off" }
```

---

## Examples

Examples of **correct** code for this rule:

<!-- prettier-ignore -->
```html
<!DOCTYPE html>
<html></html>
```

Examples of **incorrect** code for this rule:

```html
<!DOCTYPE hmtl>
<html></html>
```

---

## When Not To Use It

If your project will use `html4` or `xhtml`.

## Version

This rule was introduced in HTMLHint `v0.9.1`.
