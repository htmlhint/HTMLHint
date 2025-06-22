---
id: cli
title: Command-Line Interface (CLI)
description: Use HTMLHint from the command line to lint your HTML files. There are several options available to customize the behavior of the linter.
sidebar:
  order: 1
---

You can use HTMLHint on the command-line. For example:

```shell
npx htmlhint index.html
```

Use `npx htmlhint --help` to print the CLI documentation.

## Options

In addition to the [standard options](/usage/options/), the CLI accepts:

### `--color, --no-color`

Force enabling/disabling of color.

### `--init`

Create a new HTMLHint configuration file (`.htmlhintrc`) in the current directory with default rules. If a configuration file already exists, this command will exit successfully without making changes.

```shell
npx htmlhint --init
```

### `--list, -l`

Show all the rules available

### `--rules, -r`

Set all of the rules available

### `--rulesdir, -R`

Load custom rules from file or folder. See the [custom rules documentation](/usage/custom-rules/) for detailed information on creating and using custom rules.

```shell
# Load a single custom rule file
npx htmlhint --rulesdir ./my-custom-rule.js index.html

# Load all custom rules from a directory
npx htmlhint --rulesdir ./custom-rules/ index.html
```

### `--version, -V`

Show the currently installed version of HTMLHint.
