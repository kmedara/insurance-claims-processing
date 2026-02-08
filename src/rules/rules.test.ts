import { describe, it, mock } from "node:test";
import assert from "node:assert/strict";
import { exampleClaim, examplePolicies } from "../data.js";
import type { Claim, EvaluationResult, Policy } from "../types.js";

const claim = (): Claim => exampleClaim;
const policies = (): Policy[] => [...examplePolicies];
const passingResult = (): EvaluationResult => ({
  approved: true,
  payout: 0,
  reasonCode: "APPROVED",
});
describe(() => {
  /**
   * Policy must be active on incident date
   */
  it("Should not be approved if policy not active on incident date", () => {
    var result = passingResult();

    assert.strictEqual(result.approved, false);
    assert.strictEqual(result.reasonCode, "POLICY_INACTIVE");
  });
});

/**
 * Incident type must be included in policy's covered incidents
 */

/**
 * Payout = amountClaimed - deductible
 */

/**
 * If payout is zero or negative, return 0 with reasonCode ZERO_PAYOUT
 */

/**
 * Payout should not exceed coverage limit
 */
