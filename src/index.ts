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
  payoutMustBeGreaterThanZero,
  payoutMustBeLessThanCoverageLimit,
];

export const payoutCalculations: RuleSet = [simplePayout];

async function main() {
  console.log("processing...");
  const claim = exampleClaim;
  const policy = examplePolicies.find((p) => p.policyId === claim.policyId)!;
  var result: EvaluationResult = {
    approved: true,
    payout: 0,
    reasonCode: "APPROVED",
  };

  //   payoutCalculations.reduce((_, curr) => {
  //     console.log("reducing");
  //     curr(claim, result, policy);
  //     return curr;
  //   });

  payoutCalculations.forEach((element) => {
    element(claim, result, policy);
  });

  baseRuleSet.forEach((r) => {
    r(claim, result, policy);
  });
  console.log(result);
}

await main();
