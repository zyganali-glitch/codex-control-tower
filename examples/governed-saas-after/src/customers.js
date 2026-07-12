'use strict';

// SIMULATED DEMO CODE.
const { makeId, nowIso } = require('./utils');

function createCustomer(store, input) {
  const name = String(input.name || '').trim();
  const email = String(input.email || '').trim().toLowerCase();
  if (!name || !email.includes('@')) throw new Error('Name and a valid email are required.');
  if (store.customers.some((customer) => customer.email === email)) {
    throw new Error('Customer email must be unique.');
  }

  const customer = { id: makeId('cus'), name, email, createdAt: nowIso() };
  store.customers.push(customer);
  return { ...customer };
}

function listCustomers(store) {
  return store.customers.map((customer) => ({ ...customer }));
}

module.exports = { createCustomer, listCustomers };
