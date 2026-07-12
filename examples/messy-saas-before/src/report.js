// SIMULATED DEMO CODE.

const { money } = require('./utils');

function summarize(store) {
  return {
    customers: store.customers.length,
    openInvoices: store.invoices.filter((invoice) => invoice.status === 'open').length,
    paidInvoices: store.invoices.filter((invoice) => invoice.status === 'paid').length,
    collected: money(
      store.payments
        .filter((payment) => payment.status === 'paid')
        .reduce((sum, payment) => sum + payment.amount, 0)
    )
  };
}

module.exports = { summarize };
