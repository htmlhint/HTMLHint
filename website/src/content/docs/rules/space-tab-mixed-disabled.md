---
id: space-tab-mixed-disabled
title: space-tab-mixed-disabled
description: Prevents mixing spaces and tabs for indentation at the beginning of lines to ensure consistent formatting.
---

Blank-space (space and tab) characters should not be mixed in the beginning of any line.

Level: `warning`

## Config values

1. space: space mode (only spaces are valid for indentation)
2. space4: space mode and require 4 space characters
3. tab: tab mode (only tab characters are valid for indentation)
4. false: disable rule

### Example

```json
{
  ...
  "space-tab-mixed-disabled": space4
  ...
}
```

The following patterns are **not** considered rule violations:

<!-- prettier-ignore -->
```html
   →   →<img src="tab.png" />
········<img src="space.png" />
```

The following pattern is considered a rule violation:

<!-- prettier-ignore -->
```html
   →····<img src="tab_before_space.png" />
····   →<img src="space_before_tab.png" />
```

:::note
In the examples above, spaces and tabs are represented by `·` and `→`, respectively, to make the difference visible.
:::
