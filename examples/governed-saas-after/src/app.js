'use strict';

// SIMULATED DEMO CODE. InvoiceFlow Mini has no server, database, or provider calls.
const { createAuth } = require('./auth');
const customers = require('./customers');
const invoices = require('./invoices');
const payments = require('./payments');
const report = require('./report');

function createApp(options = {}) {
  const auth = createAuth({ secret: options.authSecret });
  const store = { customers: [], invoices: [], payments: [] };
  return { store, auth, customers, invoices, payments, report };
}

if (require.main === module) {
  const app = createApp({ authSecret: 'simulated-only-secret-32-characters' });
  const actor = app.auth.authenticate(app.auth.login('owner@example.invalid'));
  const customer = app.customers.createCustomer(app.store, {
    name: 'Simulated Corner Shop',
    email: 'billing@example.invalid'
  });
  const invoice = app.invoices.createInvoice(app.store, {
    customerId: customer.id,
    total: 125,
    description: 'Simulated monthly service'
  });
  app.payments.recordVerifiedPayment(app.store, {
    invoiceId: invoice.id,
    amount: 125,
    providerEvent: {
      verified: true,
      eventId: 'evt_simulated_001',
      providerReference: 'ref_simulated_001'
    }
  }, actor, app.auth);
  console.log('SIMULATED DEMO DATA', app.report.summarize(app.store));
}

module.exports = { createApp };
