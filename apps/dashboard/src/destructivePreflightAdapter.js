const hasValue = (value) => value !== undefined && value !== null && value !== '';

const asArray = (value) => {
  if (Array.isArray(value)) return value;
  if (!hasValue(value)) return [];
  return [String(value)];
};

const booleanOrNull = (value) => typeof value === 'boolean' ? value : null;

const sanitizeText = (value) => {
  if (!hasValue(value)) return value ?? null;
  return String(value)
    .replace(/\b[A-Za-z]:[\\/]+Users[\\/]+[^\\/\s"'`]+/giu, '<USER_HOME>')
    .replace(/\/(?:Users|home)\/[^/\s"'`]+/gu, '<USER_HOME>');
};

const sanitizeValue = (value) => {
  if (typeof value === 'string') return sanitizeText(value);
  if (Array.isArray(value)) return value.map(sanitizeValue);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, sanitizeValue(item)]));
  }
  return value;
};

export default function normalizeDestructiveActionPreflight(preflight) {
  if (!preflight || typeof preflight !== 'object' || Array.isArray(preflight)) return null;

  const normalized = {
    operation: sanitizeText(preflight.operation),
    decision: hasValue(preflight.decision) ? String(preflight.decision).toUpperCase() : null,
    executionState: hasValue(preflight.executionState) ? String(preflight.executionState).toUpperCase() : null,
    executed: booleanOrNull(preflight.executed),
    requestedTarget: sanitizeText(preflight.requestedTarget),
    expandedTarget: sanitizeText(preflight.expandedTarget),
    resolvedTarget: sanitizeText(preflight.resolvedTarget),
    protectedBoundary: sanitizeText(preflight.protectedBoundary),
    protectedBoundaryType: sanitizeText(preflight.protectedBoundaryType),
    reasons: asArray(preflight.reasons).map(sanitizeText),
    reasonCodes: asArray(preflight.reasonCodes).map(sanitizeText),
    humanReviewRequired: booleanOrNull(preflight.humanReviewRequired),
    saferNextAction: sanitizeText(preflight.saferNextAction),
    deterministic: booleanOrNull(preflight.deterministic),
    checkedAt: sanitizeText(preflight.checkedAt),
    policyVersion: sanitizeText(preflight.policyVersion),
    currentWorkingDirectory: sanitizeText(preflight.currentWorkingDirectory),
    repositoryRoot: sanitizeText(preflight.repositoryRoot),
    platform: sanitizeText(preflight.platform),
    recursive: booleanOrNull(preflight.recursive),
    force: booleanOrNull(preflight.force),
    source: sanitizeText(preflight.source),
  };

  if (Object.prototype.hasOwnProperty.call(preflight, 'hookOutcome')) {
    normalized.hookOutcome = sanitizeValue(preflight.hookOutcome);
  }
  return normalized;
}
