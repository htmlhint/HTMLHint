---
id: id-class-ad-disabled
title: id-class-ad-disabled
---

The `id` and `class` attributes cannot use the "ad" keyword, it will be blocked by adblock software.

## Possible Configuration Values

```json
{
  "id-class-ad-disabled": "off",
  "id-class-ad-disabled": "warn",
  "id-class-ad-disabled": "error",
  "id-class-ad-disabled": ["off"],
  "id-class-ad-disabled": ["warn"],
  "id-class-ad-disabled": ["error"]
}
```

## Default

```json
{ "id-class-ad-disabled": "off" }
```

---

## Examples

Examples of **correct** code for this rule:

```html
<div id="adcontainer"></div>
```

Examples of **incorrect** code for this rule:

```html
<div id="ad-container"></div>
<div id="ad_container"></div>
```

---

## When Not To Use It

If your project will use ads.

## Version

This rule was introduced in HTMLHint `v0.9.6`.
