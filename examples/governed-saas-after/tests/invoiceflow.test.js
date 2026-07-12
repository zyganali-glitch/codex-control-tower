'use strict';

// SIMULATED DEMO TEST. Uses only reserved .invalid addresses and local memory.
const test = require('node:test');
const assert = require('node:assert/strict');
const { createApp } = require('../src/app');

test('authorized verified payment closes an invoice and replay is idempotent', () => {
  const app = createApp({ authSecret: 'simulated-test-secret-32-characters' });
  const actor = app.auth.authenticate(app.auth.login('owner@example.invalid'));
  const customer = app.customers.createCustomer(app.store, {
    name: 'Simulated Bakery',
    email: 'bakery@example.invalid'
  });
  const invoice = app.invoices.createInvoice(app.store, {
    customerId: customer.id,
    description: 'Simulated bookkeeping',
    total: 80
  });
  const input = {
    invoiceId: invoice.id,
    amount: 80,
    providerEvent: {
      verified: true,
      eventId: 'evt_simulated_test_001',
      providerReference: 'ref_simulated_test_001'
    }
  };

  const first = app.payments.recordVerifiedPayment(app.store, input, actor, app.auth);
  const replay = app.payments.recordVerifiedPayment(app.store, input, actor, app.auth);

  assert.equal(first.status, 'paid');
  assert.equal(replay.idempotentReplay, true);
  assert.equal(app.store.payments.length, 1);
  assert.deepEqual(app.report.summarize(app.store), {
    customers: 1,
    openInvoices: 0,
    paidInvoices: 1,
    collected: 80
  });
});

test('tampered auth tokens and unverified payment events are rejected', () => {
  const app = createApp({ authSecret: 'simulated-test-secret-32-characters' });
  const token = app.auth.login('owner@example.invalid');
  assert.equal(app.auth.authenticate(`${token}tampered`), null);

  const actor = app.auth.authenticate(token);
  const customer = app.customers.createCustomer(app.store, {
    name: 'Simulated Studio',
    email: 'studio@example.invalid'
  });
  const invoice = app.invoices.createInvoice(app.store, {
    customerId: customer.id,
    total: 40
  });

  assert.throws(() => app.payments.recordVerifiedPayment(app.store, {
    invoiceId: invoice.id,
    amount: 40,
    providerEvent: { verified: false, eventId: 'evt_bad', providerReference: 'ref_bad' }
  }, actor, app.auth), /verified simulated provider event/);
});
