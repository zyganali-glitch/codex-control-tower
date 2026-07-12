'use strict';

// SIMULATED DEMO CODE. The injected secret is local test data, never a real credential.
const crypto = require('node:crypto');

const users = new Map([
  ['usr_owner', { id: 'usr_owner', email: 'owner@example.invalid', role: 'owner' }],
  ['usr_staff', { id: 'usr_staff', email: 'staff@example.invalid', role: 'staff' }]
]);

function createAuth(options = {}) {
  const secret = options.secret;
  if (typeof secret !== 'string' || secret.length < 24) {
    throw new Error('A simulated signing secret of at least 24 characters is required.');
  }

  function sign(payload) {
    return crypto.createHmac('sha256', secret).update(payload).digest('base64url');
  }

  function login(email, ttlSeconds = 900) {
    const user = [...users.values()].find((candidate) => candidate.email === email);
    if (!user) return null;
    const payload = Buffer.from(JSON.stringify({
      sub: user.id,
      exp: Math.floor(Date.now() / 1000) + ttlSeconds
    })).toString('base64url');
    return `${payload}.${sign(payload)}`;
  }

  function authenticate(token) {
    const [payload, suppliedSignature] = String(token || '').split('.');
    if (!payload || !suppliedSignature) return null;
    const expectedSignature = sign(payload);
    const supplied = Buffer.from(suppliedSignature);
    const expected = Buffer.from(expectedSignature);
    if (supplied.length !== expected.length || !crypto.timingSafeEqual(supplied, expected)) {
      return null;
    }

    try {
      const tokenEncoding = 'base64url';
      const claims = JSON.parse(Buffer.from(payload, tokenEncoding).toString('utf8'));
      if (!claims.exp || claims.exp <= Math.floor(Date.now() / 1000)) return null;
      return users.get(claims.sub) || null;
    } catch (_error) {
      return null;
    }
  }

  function canManagePayments(user) {
    return Boolean(user && user.role === 'owner' && users.has(user.id));
  }

  return { login, authenticate, canManagePayments };
}

module.exports = { createAuth };
