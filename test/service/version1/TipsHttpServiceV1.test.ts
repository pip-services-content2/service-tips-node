const restify = require('restify');
const assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';
import { MultiString } from 'pip-services3-commons-nodex';

import { PartyReferenceV1 } from '../../../src/data/version1/PartyReferenceV1';
import { TipV1 } from '../../../src/data/version1/TipV1';
import { TipsMemoryPersistence } from '../../../src/persistence/TipsMemoryPersistence';
import { TipsController } from '../../../src/logic/TipsController';
import { TipsHttpServiceV1 } from '../../../src/services/version1/TipsHttpServiceV1';

let httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

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

suite('TipsHttpServiceV1', ()=> {
    let service: TipsHttpServiceV1;

    let rest: any;

    suiteSetup(async () => {
        let persistence = new TipsMemoryPersistence();
        let controller = new TipsController();

        service = new TipsHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('service-tips', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('service-tips', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('service-tips', 'service', 'http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        await service.open(null);
    });
    
    suiteTeardown(async () => {
        await service.close(null);
    });

    setup(() => {
        let url = 'http://localhost:3000';
        rest = restify.createJsonClient({ url: url, version: '*' });
    });
    
    test('CRUD Operations', async () => {
        let tip1, tip2;

        // Create one tip
        let tip = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/tips/create_tip',
                {
                    tip: TIP1
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(tip);
        assert.sameMembers(tip.topics, TIP1.topics);
        assert.equal(tip.content.en, TIP1.content.get('en'));

        tip1 = tip;

        // Create another tip
        tip = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/tips/create_tip',
                {
                    tip: TIP2
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });
        
        assert.isObject(tip);
        assert.sameMembers(tip.topics, TIP2.topics);
        assert.equal(tip.content.en, TIP2.content.get('en'));

        tip2 = tip;

        // Get all tips
        let page = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/tips/get_tips',
                {},
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(page);
        assert.lengthOf(page.data, 2);

        // Update the tip
        tip1.content = new MultiString({ en: 'Updated Content 1' });

        tip = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/tips/update_tip',
                {
                    tip: tip1
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(tip);
        assert.equal(tip.content.en, 'Updated Content 1');
        assert.sameMembers(tip.topics, TIP1.topics);

        tip1 = tip;

        // Delete tip
        await new Promise<any>((resolve, reject) => {
            rest.post('/v1/tips/delete_tip_by_id',
                {
                    tip_id: tip1.id
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        // Try to get delete tip
        tip = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/tips/get_tip_by_id',
                {
                    tip_id: tip1.id
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        // assert.isNull(tip || null);
    });
});