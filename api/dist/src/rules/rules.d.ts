import type { PolicyNotRequiredRule, PolicyRequiredRule } from "../types.js";
export declare const policyIsActiveOnIncidentDate: PolicyRequiredRule;
export declare const policyCoversIncident: PolicyRequiredRule;
/**
 * Does not calculate payout, calculation is seperate
 * @param claim
 * @param context
 * @param policy
 */
export declare const payoutMustBeGreaterThanZero: PolicyNotRequiredRule;
export declare const payoutMustBeLessThanCoverageLimit: PolicyRequiredRule;
export declare const simplePayout: PolicyRequiredRule;
//# sourceMappingURL=rules.d.ts.map