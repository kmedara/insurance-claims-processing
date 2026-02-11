export type IncidentType = "accident" | "theft" | "fire" | "water damage";
export type ReasonCode = "APPROVED" | "POLICY_INACTIVE" | "NOT_COVERED" | "ZERO_PAYOUT" | "EXCEEDS_COVERAGE_LIMIT";
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
export type ClaimContext = {
    claim: Claim;
    result: EvaluationResult;
    policy?: Policy;
};
export type PolicyRequiredContext = ClaimContext & Pick<Required<ClaimContext>, "policy">;
export type PolicyRequiredRule = (context: PolicyRequiredContext) => void;
export type PolicyNotRequiredRule = (context: ClaimContext) => void;
export type Rule = PolicyRequiredRule | PolicyNotRequiredRule;
/**
 *
 */
export type RuleSet = Rule[];
//# sourceMappingURL=types.d.ts.map