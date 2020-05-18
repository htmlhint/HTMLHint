---
id: space-tab-mixed-disabled
title: space-tab-mixed-disabled
---

Spaces and tabs can not mixed in front of line.

Level: `warning`

## Config value

1. space: space mode (only space for indentation)
2. space4: space mode and require length
3. tab: tab mode (only tab for indentation)
4. false: disable rule

The following pattern are **not** considered violations:

<!-- prettier-ignore -->
```html
   →   →<img src="tab.png" />
········<img src="space.png" />
```

The following pattern is considered violation:

<!-- prettier-ignore -->
```html
   →····<img src="tab_before_space.png" />
····   →<img src="space_before_tab.png" />
```

:::note
In the examples above, spaces and tabs are represented by `·` and `→`, respectively, to make the difference visible.
:::
