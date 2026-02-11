import { fastify } from "./endpoints.js"
import { test, describe, it } from "node:test";
import assert from 'node:assert';

describe('', () => {
    it('Should evaluate fire in KY', async () => {

        const claim = {...exampleClaim};
        const response = await fastify.inject({
            'method': 'POST',
            'url': `claim/evaluate`,
            'payload': claim
        })

        assert.strictEqual(response,{
            approved: false,
            payout: 0,
            reasonCode: 'POLICY_INACTIVE'
        })

        console.log(response)
    })
})