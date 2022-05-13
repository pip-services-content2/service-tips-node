const assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-nodex';
import { MultiString } from 'pip-services3-commons-nodex';

import { PartyReferenceV1 } from '../../src/data/version1/PartyReferenceV1';
import { TipV1 } from '../../src/data/version1/TipV1';
import { TipsLambdaFunction } from '../../src/container/TipsLambdaFunction';

let TIP1 = <TipV1>{
    id: '1',
    topics: ['maintenance'],
    creator: <PartyReferenceV1>{
        id: '1',
        name: 'Test User'
    },
    title: new MultiString({ en: 'Tip 1' }),
    content: new MultiString({ en: 'Sample Tip #1' })
};
let TIP2 = <TipV1>{
    id: '2',
    tags: ['TAG 1'],
    topics: ['maintenance'],
    creator: <PartyReferenceV1>{
        id: '1',
        name: 'Test User'
    },
    title: new MultiString({ en: 'Tip 2' }),
    content: new MultiString({ en: 'Sample Tip #2' })
};

suite('TipsLambdaFunction', ()=> {
    let lambda: TipsLambdaFunction;

    suiteSetup(async () => {
        let config = ConfigParams.fromTuples(
            'logger.descriptor', 'pip-services:logger:console:default:1.0',
            'persistence.descriptor', 'service-tips:persistence:memory:default:1.0',
            'controller.descriptor', 'service-tips:controller:default:default:1.0'
        );

        lambda = new TipsLambdaFunction();
        lambda.configure(config);
        await lambda.open(null);
    });
    
    suiteTeardown(async () => {
        await lambda.close(null);
    });
    
    test('CRUD Operations', async () => {
        let tip1, tip2;

        // Create one tip
        let tip = await lambda.act(
            {
                role: 'tips',
                cmd: 'create_tip',
                tip: TIP1
            }
        );

        assert.isObject(tip);
        assert.sameMembers(tip.topics, TIP1.topics);
        assert.equal(tip.content.en, TIP1.content.get('en'));

        tip1 = tip;

        // Create another tip
        tip = await lambda.act(
            {
                role: 'tips',
                cmd: 'create_tip',
                tip: TIP2
            }
        );

        assert.isObject(tip);
        assert.sameMembers(tip.topics, TIP2.topics);
        assert.equal(tip.content.en, TIP2.content.get('en'));

        tip2 = tip;

        // Get all tips
        let page = await lambda.act(
            {
                role: 'tips',
                cmd: 'get_tips'
            }
        );

        assert.isObject(page);
        assert.lengthOf(page.data, 2);
        
        // Update the tip
        tip1.content = new MultiString({ en: 'Updated Content 1' });

        tip = await lambda.act(
            {
                role: 'tips',
                cmd: 'update_tip',
                tip: tip1
            }
        );

        assert.isObject(tip);
        assert.equal(tip.content.en, 'Updated Content 1');
        assert.sameMembers(tip.topics, TIP1.topics);

        tip1 = tip;

        // Delete tip
        await lambda.act(
            {
                role: 'tips',
                cmd: 'delete_tip_by_id',
                tip_id: tip1.id
            }
        );

        // Try to get delete tip
        tip = await lambda.act(
            {
                role: 'tips',
                cmd: 'get_tip_by_id',
                tip_id: tip1.id
            }
        );

        assert.isNull(tip || null);
    });
});