'use strict';

var test = require('tape'),
    matches = require('./'),
    document = window.document;

test('matches element selector', function(t) {
    var div = document.createElement('div');
    t.ok(matches(div, 'div'));
    t.notOk(matches(div, 'p'));
    t.end();
});

test('matches class selector', function(t) {
    var div = document.createElement('div');
    div.className = 'foo';
    t.ok(matches(div, '.foo'));
    t.notOk(matches(div, '.bar'));
    t.end();
});

test('matches ID selector', function(t) {
    var div = document.createElement('div');
    div.id = 'test';
    t.ok(matches(div, '#test'));
    t.notOk(matches(div, '#foo'));
    t.end();
});

test('matches child selector', function(t) {
    var parent = document.createElement('div'),
        child = document.createElement('div');
    parent.className = 'parent';
    child.className = 'child';
    parent.appendChild(child);
    t.ok(matches(child, '.parent .child'));
    t.end();
});
