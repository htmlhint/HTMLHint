---
id: alt-require
title: alt-require
keywords:
  - alt
  - image
  - accessiblity
---

`alt` of `img` must be present and `alt` of `area[href]` and `input[type=image]` must be set value.

## Possible Configuration Values

```json
{
  "alt-require": "off",
  "alt-require": "warn",
  "alt-require": "error",
  "alt-require": ["off"],
  "alt-require": ["warn"],
  "alt-require": ["error"]
}
```

## Default

```json
{ "alt-require": "off" }
```

---

## Examples

Examples of **correct** code for this rule:

<!-- prettier-ignore -->
```html
<img src="test.png" alt="test" />
<input type="image" alt="test" />
<area shape="circle" coords="180,139,14" href="test.html" alt="test" />
````

Examples of **incorrect** code for this rule:

<!-- prettier-ignore -->
```html
<img src="test.png" />
<input type="image" />
<area shape="circle" coords="180,139,14" href="test.html" />
```

---

## When Not To Use It

If your project will not use `alt` on images

## Version

This rule was introduced in HTMLHint `v0.9.1`.
