import type { PolicyNotRequiredRule, PolicyRequiredRule } from "../types.js";
export const policyIsActiveOnIncidentDate: PolicyRequiredRule = ({
  claim,
  result,
  policy,
}) => {
  if (
    !(claim.incidentDate >= policy.startDate) ||
    !(claim.incidentDate <= policy.endDate)
  ) {
    result.approved = false;
    result.reasonCode = "POLICY_INACTIVE";
  }
};

export const policyCoversIncident: PolicyRequiredRule = ({
  claim,
  result,
  policy,
}) => {
  if (!policy.coveredIncidents.includes(claim.incidentType)) {
    result.approved = false;
    result.reasonCode = "NOT_COVERED";
  }
};

/**
 * Does not calculate payout, calculation is seperate
 * @param claim
 * @param context
 * @param policy
 */
export const payoutMustBeGreaterThanZero: PolicyNotRequiredRule = ({
  claim,
  result,
}) => {
  if (result.payout <= 0) {
    result.approved = false;
    result.reasonCode = "ZERO_PAYOUT";
  }
};

export const payoutMustBeLessThanCoverageLimit: PolicyRequiredRule = ({
  claim,
  result,
  policy,
}) => {
  if (result.payout > policy.coverageLimit) {
    result.approved = false;
    result.reasonCode = "EXCEEDS_COVERAGE_LIMIT";
  }
};

export const simplePayout: PolicyRequiredRule = ({ claim, result, policy }) => {
  result.payout = claim.amountClaimed - policy.deductible;
};
