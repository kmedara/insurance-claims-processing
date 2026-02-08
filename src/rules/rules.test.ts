import { describe, it, mock } from "node:test";
import assert from "node:assert/strict";
import { exampleClaim, examplePolicies } from "../data.js";
import type { Claim, EvaluationResult, Policy } from "../types.js";
import { PolicyIsActiveOnIncidentDate } from "./rules.js";

describe("Rule Evaluation", () => {
  const _claim = (): Claim => exampleClaim;
  const _policies = (): Policy[] => [...examplePolicies];
  const _passingResult = (): EvaluationResult => ({
    approved: true,
    payout: 0,
    reasonCode: "APPROVED",
  });
  /**
   * Policy must be active on incident date
   */
  it("Should not be approved if policy not active on incident date", () => {
    var result = _passingResult();
    const claim = _claim();
    const policy = _policies().find((p) => p.policyId === claim.policyId)!;
    claim.incidentDate = new Date(
      policy.startDate.getFullYear(),
      policy.startDate.getMonth() - 1,
      policy.startDate.getDate(),
    );

    PolicyIsActiveOnIncidentDate(claim, result, policy);
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
