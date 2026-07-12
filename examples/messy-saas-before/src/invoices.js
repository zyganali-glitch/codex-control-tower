// SIMULATED DEMO CODE.

const { makeId, money, nowIso } = require('./utils');

function createInvoice(store, input) {
  const invoice = {
    id: makeId('inv'),
    customerId: input.customerId,
    description: String(input.description || 'Services'),
    total: money(input.total),
    status: 'open',
    createdAt: nowIso(),
    dueAt: input.dueAt || null
  };

  // FIXME: missing customer existence and positive-total validation.
  store.invoices.push(invoice);
  return invoice;
}

function listInvoices(store, customerId) {
  return customerId
    ? store.invoices.filter((invoice) => invoice.customerId === customerId)
    : store.invoices;
}

module.exports = { createInvoice, listInvoices };
