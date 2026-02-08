import type { PolicyRequiredRule } from "../types.js";

export const PolicyIsActiveOnIncidentDate: PolicyRequiredRule = (
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
