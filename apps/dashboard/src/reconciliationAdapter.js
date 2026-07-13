const asArray = (value) => {
  if (Array.isArray(value)) return value;
  if (value == null || value === '') return [];
  return [String(value)];
};

const hasValue = (value) => value !== undefined && value !== null && value !== '';
const statusOrUnknown = (value) => hasValue(value) ? String(value).toUpperCase() : 'UNKNOWN';

function deriveDeterministicVerdict(claimAudits = []) {
  const states = claimAudits.map((audit) => statusOrUnknown(audit.deterministicStatus));
  if (states.includes('FAIL')) return 'FAIL';
  if (states.includes('WARN')) return 'WARN';
  if (states.length && states.every((state) => state === 'NOT_RUN')) return 'NOT_RUN';
  if (states.some((state) => state === 'NOT_RUN' || state === 'SIMULATED')) return 'WARN';
  return states.length ? 'PASS' : 'UNKNOWN';
}

export default function normalizeCodexLiveReview(review) {
  if (!review || typeof review !== 'object') return review || null;
  if (!review.reconciliation) return { ...review };
  const reconciliation = review.reconciliation;
  const claimAudits = asArray(reconciliation.claimAudits).map((audit) => ({
    ...audit,
    relation: audit.relation || audit.agreement || 'UNCLASSIFIED',
  }));
  const engineHasSplitVerdicts = hasValue(reconciliation.modelVerdict)
    || hasValue(reconciliation.localVerdict)
    || hasValue(reconciliation.deterministicVerdict);
  return {
    ...review,
    reconciliation: {
      ...reconciliation,
      claimAudits,
      localVerdict: reconciliation.localVerdict
        || reconciliation.deterministicVerdict
        || (engineHasSplitVerdicts ? reconciliation.verdict : deriveDeterministicVerdict(claimAudits)),
      modelVerdict: reconciliation.modelVerdict
        || review.modelVerdict
        || review.assessment?.verdict
        || (!engineHasSplitVerdicts ? reconciliation.verdict : null),
    },
  };
}
