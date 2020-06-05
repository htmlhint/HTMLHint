---
id: space-tab-mixed-disabled
title: space-tab-mixed-disabled
---

Do not mix tabs and spaces for indentation.

## Possible Configuration Values

```json
{
  "space-tab-mixed-disabled": "off",
  "space-tab-mixed-disabled": "warn",
  "space-tab-mixed-disabled": "error",
  "space-tab-mixed-disabled": ["off"],
  "space-tab-mixed-disabled": ["warn", { "mode": "tab" }],
  "space-tab-mixed-disabled": ["warn", { "mode": "space", "size": 2 }],
  "space-tab-mixed-disabled": ["error", { "mode": "tab" }],
  "space-tab-mixed-disabled": ["error", { "mode": "space", "size": 2 }]
}
```

## Default

```json
{ "space-tab-mixed-disabled": ["off", { "mode": "nomix", "space": 4 }] }
```

## Options

This rule has an object option:

- `"mode": "tab"` use tabs as indentation.
- `"mode": "space"` use spaces as indentation.
- `"size": 0-8` count of spaces.

---

## Examples

Examples of **correct** code for this rule:

<!-- prettier-ignore -->
```html
   →   →<img src="tab.png" />
········<img src="space.png" />
```

Examples of **incorrect** code for this rule:

<!-- prettier-ignore -->
```html
   →····<img src="tab_before_space.png" />
····   →<img src="space_before_tab.png" />
```

:::note
In the examples above, spaces and tabs are represented by `·` and `→`, respectively, to make the difference visible.
:::

---

## When Not To Use It

If your project will use mixed indentation.

## Version

This rule was introduced in HTMLHint `v0.9.6`.
