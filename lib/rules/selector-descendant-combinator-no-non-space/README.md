# selector-descendant-combinator-no-non-space

Disallow non-space characters for descendant combinators of selectors.

```css
.foo .bar .baz {}
/** ↑    ↑
* These descendant combinators */
```

This rule ensures that only a single space is used and ensures no tabs, newlines, nor multiple spaces are used for descendant combinators of selectors.

The `--fix` option on the [command line](../../../docs/user-guide/usage/cli.md#autofixing-errors) can automatically fix most of the problems reported by this rule.

## Options

### `true`

The following patterns are considered violations:

```css
.foo  .bar {}
```

```css
.foo
.bar {}
```

The following patterns are *not* considered violations:

```css
.foo .bar {}
```
