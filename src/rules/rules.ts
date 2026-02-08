import type { PolicyNotRequiredRule, PolicyRequiredRule } from "../types.js";

export const policyIsActiveOnIncidentDate: PolicyRequiredRule = (
  claim,
  context,
  policy,
) => {
  if (
    !(claim.incidentDate >= policy.startDate) ||
    !(claim.incidentDate <= policy.endDate)
  ) {
    context.approved = false;
    context.reasonCode = "POLICY_INACTIVE";
  }
};

export const policyCoversIncident: PolicyRequiredRule = (
  claim,
  context,
  policy,
) => {
  if (!policy.coveredIncidents.includes(claim.incidentType)) {
    context.approved = false;
    context.reasonCode = "NOT_COVERED";
  }
};
