// Get the right method, including vendor prefixes
var proto = window.Element.prototype,
    method = (
        proto.matches ||
        proto.matchesSelector ||
        proto.mozMatchesSelector ||
        proto.msMatchesSelector ||
        proto.webkitMatchesSelector);

var document = window.document;

function matches(element, selector) {
    return method.call(element, selector);
}

// Work around IE 9 bug where it always returns false when not attached to
// another DOM node.

// Check if the bug exists in this browser
function checkBug() {
    // Check if it works on newly created node (fails in IE 9)
    var a = document.createElement('div');
    if (method.call(a, 'div')) {
        return false;
    }

    // Check if it works when node is appended to another node (works in IE 9)
    var b = document.createElement('div');
    a.appendChild(b);
    return method.call(b, 'div');
}

// Return a workaround function to fix the bug.
// Note that this will slow down matching, but only if the bug exists in this
// browser.
function workaround() {
    var node = document.createElement('div');

    function matches(element, selector) {
        if (method.call(element, selector)) {
            return true;
        } else if (!element.parentNode) {
            // If node is not attached, temporarily attach to node
            node.appendChild(element);
            var result = method.call(element, selector);
            node.removeChild(element);
            return result;
        } else {
            return false;
        }
    }

    return matches;
}

if (method) {
    module.exports = checkBug() ? workaround() : matches;
} else {
    // Not supported
    module.exports = null;
}