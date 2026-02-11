// Require the framework and instantiate it
// ESM
import Fastify from 'fastify';
import { baseRuleSet, payoutCalculations } from '../src/index.js';
import { examplePolicies } from '../src/data.js';
export const fastify = Fastify({
    logger: true
});
// Declare a route
fastify.post('/claim/evaluate', function (request, reply) {
    const policy = examplePolicies.find((p) => p.policyId === request.body.policyId);
    var result = {
        approved: true,
        payout: 0,
        reasonCode: "APPROVED",
    };
    payoutCalculations.forEach((element) => {
        element({ claim: request.body, result, policy });
    });
    baseRuleSet.forEach((r) => {
        r({ claim: request.body, result, policy });
    });
    return reply.send(result);
});
// Run the server!
fastify.listen({ port: 3000 }, function (err, address) {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    // Server is now listening on ${address}
});
//# sourceMappingURL=endpoints.js.map