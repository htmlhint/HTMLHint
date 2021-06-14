---
id: title-require
title: title-require
---

`<title>` must be present in `<head>` tag.

## Possible Configuration Values

```json
{
  "title-require": "off",
  "title-require": "warn",
  "title-require": "error",
  "title-require": ["off"],
  "title-require": ["warn"],
  "title-require": ["error"]
}
```

## Default

```json
{ "title-require": "error" }
```

---

## Examples

Examples of **correct** code for this rule:

```html
<html>
  <head>
    <title>test</title>
  </head>
</html>
```

Examples of **incorrect** code for this rule:

```html
<html>
  <head></head>
</html>

<html>
  <head>
    <title></title>
  </head>
</html>

<html>
  <title></title>
  <head></head>
</html>
```

---

## When Not To Use It

If your project will not use a `title` tag.

## Version

This rule was introduced in HTMLHint `v0.9.8`.
