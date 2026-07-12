// SIMULATED DEMO CODE.

const { makeId, nowIso } = require('./utils');

function createCustomer(store, input) {
  const customer = {
    id: makeId('cus'),
    name: String(input.name || '').trim(),
    email: String(input.email || '').trim().toLowerCase(),
    createdAt: nowIso()
  };

  // TODO: validate duplicate email addresses.
  store.customers.push(customer);
  return customer;
}

function listCustomers(store) {
  return store.customers;
}

module.exports = { createCustomer, listCustomers };
