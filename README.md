# chi-matches

Check if a DOM element matches a CSS selector.

A cross-browser wrapper for the
[`Element#matches`](https://developer.mozilla.org/en-US/docs/Web/API/Element.matches)
function. It will choose the appropriate native method (including vendor
prefixes) to use.

This module uses Node.js-style modules, for best results use
[browserify](https://github.com/substack/node-browserify).

## Example

```js
var matches = require('chi-matches');

var div = document.createElement('div');
matches(div, 'div'); // true
matches(div, 'p'); // false
```