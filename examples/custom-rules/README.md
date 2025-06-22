# Custom Rules Examples

This directory contains example custom rules for HTMLHint to demonstrate how to create and use custom rules.

## Example Rule

The `example-rule.js` file demonstrates a custom rule that:

1. Checks if images have either a `title` or `alt` attribute for accessibility
2. Validates class names against a configurable pattern

## Usage

### Loading the Example Rule

```shell
# Load the example rule
npx htmlhint --rulesdir ./examples/custom-rules/example-rule.js test.html
```

### Configuration

You can configure the example rule in your `.htmlhintrc` file:

```json
{
  "example-rule": {
    "classPattern": "^[a-z][a-z0-9-]*$"
  }
}
```

Or via command line:

```shell
npx htmlhint --rulesdir ./examples/custom-rules/ --rules "example-rule:{classPattern:'^[a-z][a-z0-9-]*$'}" test.html
```

### Testing

Create a test HTML file to see the rule in action:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Test</title>
</head>
<body>
  <!-- This will trigger a warning -->
  <img src="image.jpg">

  <!-- This will trigger a warning if classPattern is set -->
  <div class="InvalidClass">Content</div>

  <!-- This should not trigger warnings -->
  <img src="image.jpg" alt="Description">
  <div class="valid-class">Content</div>
</body>
</html>
```

## Creating Your Own Rules

See the [Custom Rules documentation](../../website/src/content/docs/usage/custom-rules.mdx) for detailed information on creating custom rules.
