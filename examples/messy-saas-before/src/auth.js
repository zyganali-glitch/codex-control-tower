// SIMULATED DEMO CODE — intentionally risky; never use this authentication pattern.

const users = [
  { id: 'usr_owner', email: 'owner@example.invalid', role: 'owner' },
  { id: 'usr_staff', email: 'staff@example.invalid', role: 'staff' }
];

function login(email) {
  const user = users.find((candidate) => candidate.email === email);
  if (!user) return null;

  // FIXME: this unsigned token can be edited by a caller.
  return Buffer.from(JSON.stringify(user)).toString('base64url');
}

function authenticate(token) {
  try {
    return JSON.parse(Buffer.from(token || '', 'base64url').toString('utf8'));
  } catch (_error) {
    // TODO: fail closed and record failed authentication.
    return { id: 'anonymous', role: 'staff' };
  }
}

function canManagePayments(user) {
  // Risk: any decoded role is trusted without a signature or server-side lookup.
  return Boolean(user && ['owner', 'staff'].includes(user.role));
}

module.exports = { login, authenticate, canManagePayments };
