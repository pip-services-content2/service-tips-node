const assert = require('chai').assert;

import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { MultiString } from 'pip-services3-commons-nodex';

import { ITipsPersistence } from '../../src/persistence/ITipsPersistence';
import { TipV1 } from '../../src/data/version1/TipV1';
import { PartyReferenceV1 } from '../../src/data/version1/PartyReferenceV1';

let TIP1 = <TipV1>{
    id: '1',
    topics: ['maintenance'],
    creator: <PartyReferenceV1>{
        id: '1',
        name: 'Test User'
    },
    title: new MultiString({ en: 'Tip 1' }),
    content: new MultiString({ en: 'Sample Tip #1' }),
    status: 'new'
};
let TIP2 = <TipV1>{
    id: '2',
    tags: ['TAG 1'],
    all_tags: ['tag1'],
    topics: ['maintenance'],
    creator: <PartyReferenceV1>{
        id: '1',
        name: 'Test User'
    },
    title: new MultiString({ en: 'Tip 2' }),
    content: new MultiString({ en: 'Sample Tip #2' }),
    status: 'new'
};
let TIP3 = <TipV1>{
    id: '3',
    tags: ['Tag 1', 'tag 2'],
    all_tags: ['tag1', 'tag2'],
    topics: ['maintenance'],
    creator: <PartyReferenceV1>{
        id: '1',
        name: 'Test User'
    },
    title: new MultiString({ en: 'Tip 3' }),
    content: new MultiString({ en: 'Sample Tip #3' }),
    status: 'translating'
};

export class TipsPersistenceFixture {
    private _persistence: ITipsPersistence;
    
    constructor(persistence: ITipsPersistence) {
        assert.isNotNull(persistence);
        this._persistence = persistence;
    }

    public async createTips() {
        // Create one tip
        let tip = await this._persistence.create(null, TIP1);

        assert.isObject(tip);
        assert.equal(tip.status, 'new');
        assert.sameMembers(tip.topics, TIP1.topics);
        //assert.equal(tip.content, TIP1.content);

        // Create another tip
        tip = await this._persistence.create(null, TIP2);

        assert.isObject(tip);
        assert.equal(tip.status, 'new');
        assert.sameMembers(tip.topics, TIP2.topics);
        // assert.equal(tip.content, TIP2.content);

        // Create yet another tip
        tip = await this._persistence.create(null, TIP3);

        assert.isObject(tip);
        assert.equal(tip.status, TIP3.status);
        assert.sameMembers(tip.topics, TIP3.topics);
        //assert.equal(tip.content, TIP3.content);
    }
                
    public async testCrudOperations() {
        let tip1: TipV1;

        // Create items
        await this.createTips();

        // Get all tips
        let page = await this._persistence.getPageByFilter(
            null,
            new FilterParams(),
            new PagingParams()
        );

        assert.isObject(page);
        assert.lengthOf(page.data, 3);

        tip1 = page.data[0];

        // Update the tip
        tip1.content = new MultiString({ en: 'Updated Content 1' });

        let tip = await this._persistence.update(null, tip1);

        assert.isObject(tip);
        //assert.equal(tip.content.get('en'), 'Updated Content 1');

        // Delete tip
        await this._persistence.deleteById(null, tip1.id);

        // Try to get delete tip
        tip = await this._persistence.getOneById(null, tip1.id);


        assert.isNull(tip || null);
    }

    public async testGetWithFilter() {
        // Create tips
        await this.createTips();

        // Get topics filtered by tags
        let tips = await this._persistence.getPageByFilter(
            null,
            FilterParams.fromValue({
                topics: ['maintenance']
            }),
            new PagingParams()
        );

        assert.isObject(tips);
        assert.lengthOf(tips.data, 3);

        // Get tips filtered by tags
        tips = await this._persistence.getPageByFilter(
            null,
            FilterParams.fromValue({
                tags: ['tag1']
            }),
            new PagingParams()
        );

        assert.isObject(tips);
        assert.lengthOf(tips.data, 2);

        // Get tips filtered by status
        tips = await this._persistence.getPageByFilter(
            null,
            FilterParams.fromValue({
                status: TIP3.status
            }),
            new PagingParams()
        );

        assert.isObject(tips);
        assert.lengthOf(tips.data, 1);
    }

    public async testGetRandom() {
        // Create tips
        await this.createTips();

        // Get random tip filtered by tags
        let tip = await this._persistence.getOneRandom(
            null,
            FilterParams.fromValue({
                tags: ['tag1'],
                status: 'new'
            })
        );

        assert.isObject(tip);
        assert.equal(TIP2.id, tip.id);
    }
}
