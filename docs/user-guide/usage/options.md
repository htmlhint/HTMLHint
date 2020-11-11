---
id: options
title: Options
---

## `configFile`

CLI flag: `--config`

Path to a JSON, YAML, or JS file that contains your [configuration object](../configuration.md).

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

A path to a file containing patterns describing files to ignore. The path can be absolute or relative to `process.cwd()`.
