---
id: id-class-value
title: id-class-value
---

The id and class attribute values must meet the specified rules.

## Possible Configuration Values

```json
{
  "id-class-value": "off",
  "id-class-value": "warn",
  "id-class-value": "error",
  "id-class-value": ["off"],
  "id-class-value": ["warn", { "mode": "underline" }],
  "id-class-value": ["warn", { "mode": "dash" }],
  "id-class-value": ["warn", { "mode": "hump" }],
  "id-class-value": ["warn", { "regId": RegExp, "message": "Message" }],
  "id-class-value": ["error", { "mode": "underline" }],
  "id-class-value": ["error", { "mode": "dash" }],
  "id-class-value": ["error", { "mode": "hump" }],
  "id-class-value": ["error", { "regId": RegExp, "message": "Message" }]
}
```

## Default

```json
{ "id-class-value": "off" }
```

## Options

This rule has an object option:

- `"mode": "underline"` The id and class attribute values must be in lowercase and split by an underscore.
- `"mode": "dash"` The id and class attribute values must be in lowercase and split by a dash.
- `"mode": "hump"` The id and class attribute values must meet the camelCase style.
- `"regId": RegExp` Custom message.

---

## Examples

Examples of **correct** code for mode `underline`:

```html
<div id="aaa_bbb"></div>
```

Examples of **correct** code for mode `dash`:

```html
<div id="aaa-bbb"></div>
```

Examples of **correct** code for mode `hump`:

```html
<div id="aaaBbb"></div>
```

---

## When Not To Use It

If your project will use mixed cased `id` values.

## Version

This rule was introduced in HTMLHint `v0.9.1`.
