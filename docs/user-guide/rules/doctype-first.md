---
id: doctype-first
title: doctype-first
---

Doctype must be declared first.

## Possible Configuration Values

```json
{
  "doctype-first": "off",
  "doctype-first": "warn",
  "doctype-first": "error",
  "doctype-first": ["off"],
  "doctype-first": ["warn"],
  "doctype-first": ["error"]
}
```

## Default

```json
{ "doctype-first": "error" }
```

---

## Examples

Examples of **correct** code for this rule:

```html
<!DOCTYPE html>
<html></html>
```

Examples of **incorrect** code for this rule:

```html
<!DOCTYPE html>
<html></html>
```

```html
<!--comment--><!DOCTYPE html>
<html></html>
```

---

## When Not To Use It

If your project will use a framework.

## Version

This rule was introduced in HTMLHint `v0.9.1`.
