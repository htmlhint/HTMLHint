---
id: options
title: Options
description: Options for configuring HTMLHint config files, formatters, and more.
sidebar:
  order: 2
---

## `configFile`

CLI flag: `--config`

Path to a JSON file that contains your [configuration object](/configuration/).

Use this option if you don't want HTMLHint to search for a configuration file.

The path should be either absolute or relative to the directory that your process is running from (`process.cwd()`).

## `format`

CLI flags: `--format, -f`

Specify the formatter to format your results.

Options are:

- `checkstyle`
- `compact`
- `html`
- `json` (default for Node API)
- `junit`
- `markdown`
- `sarif`
- `unix`

## `ignore`

CLI flags: `--ignore, -i`

A list of patterns of files or folders to ignore. For example, `--ignore="**/folder/**,**/folder_two/**"`

## `rulesdir`

CLI flags: `--rulesdir, -R`

Load custom rules from a file or directory. This allows you to extend HTMLHint with your own custom rules.

### Usage

```shell
# Load a single custom rule file
npx htmlhint --rulesdir ./my-custom-rule.js index.html

# Load all custom rules from a directory (recursively finds all .js files)
npx htmlhint --rulesdir ./custom-rules/ index.html
```

### Custom Rule Format

Custom rules should be JavaScript modules that export a function. The function receives the `HTMLHint` instance as a parameter and should register the custom rule using `HTMLHint.addRule()`.

#### Example Custom Rule

```javascript
// my-custom-rule.js
module.exports = function(HTMLHint) {
  HTMLHint.addRule({
    id: 'my-custom-rule',
    description: 'This is my custom rule description',
    init: function(parser, reporter, options) {
      // Rule implementation
      parser.addListener('tagstart', function(event) {
        const tagName = event.tagName.toLowerCase();

        if (tagName === 'div') {
          reporter.warn(
            'Custom rule: div tags are not allowed',
            event.line,
            event.col,
            this,
            event.raw
          );
        }
      });
    }
  });
};
```

#### Using Custom Rules

After loading custom rules with `--rulesdir`, you can enable them in your configuration:

```json
{
  "my-custom-rule": true
}
```

Or via command line:

```shell
npx htmlhint --rulesdir ./custom-rules/ --rules my-custom-rule index.html
```

### Directory Loading

When specifying a directory, HTMLHint will:

1. Recursively search for all `.js` files in the directory
2. Load each file as a custom rule module
3. Skip any files that fail to load (errors are silently ignored)

This makes it easy to organize multiple custom rules in a single directory structure.

For detailed information on creating custom rules, see the [Custom Rules documentation](/usage/custom-rules/).
