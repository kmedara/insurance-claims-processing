import { exampleClaim, examplePolicies } from "./data.js";
import { payoutMustBeGreaterThanZero, payoutMustBeLessThanCoverageLimit, policyCoversIncident, policyIsActiveOnIncidentDate, simplePayout, } from "./rules/rules.js";
export const baseRuleSet = [
    policyIsActiveOnIncidentDate,
    policyCoversIncident,
    payoutMustBeGreaterThanZero,
    payoutMustBeLessThanCoverageLimit,
];
export const payoutCalculations = [simplePayout];
async function main() {
    console.log("processing...");
    const claim = exampleClaim;
    const policy = examplePolicies.find((p) => p.policyId === claim.policyId);
    var result = {
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
        element({ claim, result, policy });
    });
    baseRuleSet.forEach((r) => {
        r({ claim, result, policy });
    });
}
await main();
//# sourceMappingURL=index.js.map