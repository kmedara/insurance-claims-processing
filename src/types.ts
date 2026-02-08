export type IncidentType = "accident" | "theft" | "fire" | "water damage";
export type ReasonCode =
  | "APPROVED"
  | "POLICY_INACTIVE"
  | "NOT_COVERED"
  | "ZERO_PAYOUT"
  | "EXCEEDS_COVERAGE_LIMIT";

export type Claim = {
  policyId: string;
  incidentType: IncidentType;
  incidentDate: Date;
  amountClaimed: number;
};

export interface Policy {
  policyId: string;
  startDate: Date;
  endDate: Date;
  deductible: number;
  coverageLimit: number;
  coveredIncidents: IncidentType[];
}

export type EvaluationResult = {
  approved: boolean;
  payout: number;
  reasonCode: ReasonCode;
};

export type PolicyRequiredRule = (
  claim: Claim,
  context: EvaluationResult,
  policy: Policy,
) => void;

export type PolicyNotRequiredRule = (
  claim: Claim,
  context: EvaluationResult,
  policy?: Policy,
) => void;

export type Rule = PolicyRequiredRule | PolicyNotRequiredRule;

/**
 *
 */
export type RuleSet = Rule[];
