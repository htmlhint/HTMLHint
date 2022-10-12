---
id: options
title: Options
---

## `configFile`

CLI flag: `--config`

Path to a JSON file that contains your [configuration object](../configuration.md).

Use this option if you don't want HTMLHint to search for a configuration file.

The path should be either absolute or relative to the directory that your process is running from (`process.cwd()`).

## `format`

CLI flags: `--format, -f`

Specify the formatter to format your results.

Options are:

- `compact`
- `json` (default for Node API)
- `unix`
- `checkstyle`
- `html`
- `junit`
- `markdown`

## `ignore`

CLI flags: `--ignore, -i`

A list of patterns of files or folders to ignore. For example, `--ignore="**/folder/**,**/folder_two/**"
