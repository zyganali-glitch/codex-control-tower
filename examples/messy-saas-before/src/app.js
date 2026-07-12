// SIMULATED DEMO CODE. InvoiceFlow Mini has no network server or external services.

const auth = require('./auth');
const customers = require('./customers');
const invoices = require('./invoices');
const payments = require('./payments');
const report = require('./report');

function createApp() {
  const store = { customers: [], invoices: [], payments: [] };
  return { store, auth, customers, invoices, payments, report };
}

if (require.main === module) {
  const app = createApp();
  const token = app.auth.login('owner@example.invalid');
  const actor = app.auth.authenticate(token);
  const customer = app.customers.createCustomer(app.store, {
    name: 'Simulated Corner Shop',
    email: 'billing@example.invalid'
  });
  const invoice = app.invoices.createInvoice(app.store, {
    customerId: customer.id,
    total: 125,
    description: 'Simulated monthly service'
  });
  app.payments.recordPayment(app.store, { invoiceId: invoice.id, amount: 125 }, actor);
  console.log('SIMULATED DEMO DATA', app.report.summarize(app.store));
}

module.exports = { createApp };
