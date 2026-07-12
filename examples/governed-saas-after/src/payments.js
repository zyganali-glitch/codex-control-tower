'use strict';

// SIMULATED DEMO CODE. Provider events are fixtures; no financial network is used.
const { makeId, money, nowIso } = require('./utils');

function recordVerifiedPayment(store, input, actor, policy) {
  if (!policy.canManagePayments(actor)) throw new Error('Payment action is not authorized.');
  if (!input.providerEvent || input.providerEvent.verified !== true) {
    throw new Error('A verified simulated provider event is required.');
  }

  const eventId = String(input.providerEvent.eventId || '').trim();
  const providerReference = String(input.providerEvent.providerReference || '').trim();
  if (!eventId || !providerReference) throw new Error('Provider event identifiers are required.');

  const existing = store.payments.find((payment) => payment.providerEventId === eventId);
  if (existing) return { ...existing, idempotentReplay: true };

  const invoice = store.invoices.find((candidate) => candidate.id === input.invoiceId);
  if (!invoice || invoice.status !== 'open') throw new Error('An open invoice is required.');
  const amount = money(input.amount);
  if (amount !== invoice.total) throw new Error('Payment amount must match the invoice total.');

  const payment = {
    id: makeId('pay'),
    invoiceId: invoice.id,
    amount,
    providerEventId: eventId,
    providerReference,
    status: 'paid',
    recordedBy: actor.id,
    createdAt: nowIso()
  };
  store.payments.push(payment);
  invoice.status = 'paid';
  return { ...payment };
}

module.exports = { recordVerifiedPayment };
