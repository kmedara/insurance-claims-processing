export const examplePolicies = [
    {
        policyId: "POL123",
        startDate: new Date("2023-01-01"),
        endDate: new Date("2024-01-01"),
        deductible: 500,
        coverageLimit: 10000,
        coveredIncidents: ["accident", "fire"],
    },
    {
        policyId: "POL456",
        startDate: new Date("2022-06-01"),
        endDate: new Date("2025-06-01"),
        deductible: 250,
        coverageLimit: 50000,
        coveredIncidents: ["accident", "theft", "fire", "water damage"],
    },
];
export const exampleClaim = {
    policyId: "POL123",
    incidentType: "fire",
    incidentDate: new Date("2023-06-15"),
    amountClaimed: 3000,
};
//# sourceMappingURL=data.js.map