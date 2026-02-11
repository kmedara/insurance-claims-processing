import { exampleClaim, examplePolicies } from "./data.js";
import {
  payoutMustBeGreaterThanZero,
  payoutMustBeLessThanCoverageLimit,
  policyCoversIncident,
  policyIsActiveOnIncidentDate,
  simplePayout,
} from "./rules/rules.js";
import type { EvaluationResult, RuleSet } from "./types.js";

export const baseRuleSet: RuleSet = [
  policyIsActiveOnIncidentDate,
  policyCoversIncident,
];

export const payoutCalculations: RuleSet = [simplePayout,payoutMustBeGreaterThanZero,
  payoutMustBeLessThanCoverageLimit];

async function main() {
  console.log("processing...");
  const claim = exampleClaim;
  const policy = examplePolicies.find((p) => p.policyId === claim.policyId)!;
  var result: EvaluationResult = {
    approved: true,
    payout: 0,
    reasonCode: "APPROVED",
  };

 

  baseRuleSet.forEach((r) => {
    r({ claim, result, policy });
  });
  payoutCalculations.forEach((element) => {
    element({ claim, result, policy });
  });
  
  console.log(result);
}

await main();
