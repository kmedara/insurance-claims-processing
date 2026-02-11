import { exampleClaim } from "../src/data.js";
import { fastify } from "./endpoints.js";
import { test, describe } from "node:test";
import assert from 'node:assert';
test('Should evaluate fire in KY', async () => {
    const claim = { ...exampleClaim };
    const response = await fastify.inject({
        'method': 'POST',
        'url': `claim/evaluate`,
        'payload': claim
    });
    assert.strictEqual(response, {
        approved: false,
        payout: 2500,
        reasonCode: 'POLICY_INACTIVE'
    });
    //const response = await fastify.inject('')
});
//# sourceMappingURL=endpoint.test.js.map