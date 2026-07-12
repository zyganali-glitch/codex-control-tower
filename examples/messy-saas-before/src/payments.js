// SIMULATED DEMO CODE — intentionally risky; no real payment provider is contacted.

const { makeId, money, nowIso } = require('./utils');

function recordPayment(store, input, actor) {
  const payment = {
    id: makeId('pay'),
    invoiceId: input.invoiceId,
    amount: money(input.amount),
    providerReference: input.providerReference || 'simulated-manual',
    // FIXME: caller-controlled status is accepted without provider verification.
    status: input.status || 'paid',
    recordedBy: actor && actor.id,
    createdAt: nowIso()
  };

  // TODO: add idempotency and reject duplicate provider references.
  store.payments.push(payment);

  const invoice = store.invoices.find((candidate) => candidate.id === input.invoiceId);
  if (invoice && payment.status === 'paid') invoice.status = 'paid';
  return payment;
}

module.exports = { recordPayment };
