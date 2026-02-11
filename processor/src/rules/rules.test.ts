import { describe, it, mock } from "node:test";
import assert from "node:assert/strict";
import type { Claim, EvaluationResult, Policy, ReasonCode } from "../types.js";
import {
  payoutMustBeGreaterThanZero,
  policyCoversIncident,
  policyIsActiveOnIncidentDate,
  payoutMustBeLessThanCoverageLimit,
} from "./rules.js";
import { exampleClaim, examplePolicies } from "../data.js";

describe("Rule Evaluation", () => {
  const _claim = (): Claim => exampleClaim;
  const _policies = (): Policy[] => [...examplePolicies];
  const _passingResult = (): EvaluationResult => ({
    approved: true,
    payout: 0,
    reasonCode: "APPROVED",
  });

  it("Should not be approved if policy not active on incident date", () => {
    var result = _passingResult();
    const claim = _claim();
    const policy = _policies().find((p) => p.policyId === claim.policyId)!;
    claim.incidentDate = new Date(
      policy.startDate.getFullYear(),
      policy.startDate.getMonth() - 1,
      policy.startDate.getDate(),
    );

    policyIsActiveOnIncidentDate({ claim, result, policy });
    assert.strictEqual(result.approved, false);
    assert.strictEqual(result.reasonCode, "POLICY_INACTIVE" as ReasonCode);
  });

  it("Should not be approved if incident not covered by policy", () => {
    var result = _passingResult();
    const claim = _claim();
    var policy = _policies().find((p) => p.policyId === claim.policyId)!;

    policy.coveredIncidents = policy.coveredIncidents.filter(
      (x) => !policy.coveredIncidents.includes(x),
    );
    policyCoversIncident({ claim, result, policy });
    assert.strictEqual(result.approved, false);
    assert.strictEqual(result.reasonCode, "NOT_COVERED" as ReasonCode);
  });

  it("Should not be approved if payout is zero or negative", () => {
    var result = _passingResult();
    const claim = _claim();
    var policy = _policies().find((p) => p.policyId === claim.policyId)!;

    result.payout = -4000;
    payoutMustBeGreaterThanZero({ claim, result, policy });

    assert.strictEqual(result.approved, false);
    assert.strictEqual(result.reasonCode, "ZERO_PAYOUT" as ReasonCode);

    result = _passingResult();
    result.payout = 0;

    payoutMustBeGreaterThanZero({ claim, result, policy });

    assert.strictEqual(result.approved, false);
    assert.strictEqual(result.reasonCode, "ZERO_PAYOUT" as ReasonCode);
  });

  it("Should not be approved if payout exceeds coverage limit", () => {
    var result = _passingResult();
    const claim = _claim();
    var policy = _policies().find((p) => p.policyId === claim.policyId)!;

    result.payout = policy.coverageLimit + 1;
    payoutMustBeLessThanCoverageLimit({ claim, result, policy });
    assert.strictEqual(result.approved, false);
    assert.strict(result.reasonCode, "EXCEEDS_COVERAGE_LIMIT" as ReasonCode);
  });
});
