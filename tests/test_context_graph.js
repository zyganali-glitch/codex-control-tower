'use strict';

const assert = require('node:assert/strict');
const path = require('node:path');
const { scanRepository } = require('../cli/lib/repoScanner');
const { ROOT } = require('./helpers');

const graph = scanRepository(path.join(ROOT, 'examples', 'messy-saas-before')).contextGraph;
assert.ok(graph.nodes.length >= 10);
assert.equal(graph.generatedLocally, true);
assert.ok(graph.contextTrace.length > 0);
assert.ok(graph.contextBudget.selectedItems <= graph.contextBudget.maxItems);
assert.ok(graph.nodes.some((node) => node.label === 'src/auth.js' && node.risk));
assert.ok(graph.nodes.some((node) => node.label === 'src/payments.js' && node.risk));
console.log('PASS test_context_graph');
