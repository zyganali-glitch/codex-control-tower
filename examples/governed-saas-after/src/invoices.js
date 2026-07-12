'use strict';

// SIMULATED DEMO CODE.
const { makeId, money, nowIso } = require('./utils');

function createInvoice(store, input) {
  const customer = store.customers.find((candidate) => candidate.id === input.customerId);
  if (!customer) throw new Error('Invoice customer does not exist.');
  const total = money(input.total);
  if (total <= 0) throw new Error('Invoice total must be greater than zero.');

  const invoice = {
    id: makeId('inv'),
    customerId: customer.id,
    description: String(input.description || 'Services').trim(),
    total,
    status: 'open',
    createdAt: nowIso(),
    dueAt: input.dueAt || null
  };
  store.invoices.push(invoice);
  return { ...invoice };
}

function listInvoices(store, customerId) {
  return store.invoices
    .filter((invoice) => !customerId || invoice.customerId === customerId)
    .map((invoice) => ({ ...invoice }));
}

module.exports = { createInvoice, listInvoices };
