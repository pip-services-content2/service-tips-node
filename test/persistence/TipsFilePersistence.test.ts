import { TipsFilePersistence } from '../../src/persistence/TipsFilePersistence';
import { TipsPersistenceFixture } from './TipsPersistenceFixture';

suite('TipsFilePersistence', ()=> {
    let persistence: TipsFilePersistence;
    let fixture: TipsPersistenceFixture;
    
    setup(async () => {
        persistence = new TipsFilePersistence('./data/Tips.test.json');

        fixture = new TipsPersistenceFixture(persistence);
        
        await persistence.open(null);
        await persistence.clear(null);
    });
    
    teardown(async () => {
        await persistence.close(null);
    });
        
    test('CRUD Operations', async () => {
        await fixture.testCrudOperations();
    });

    test('Get with Filters', async () => {
        await fixture.testGetWithFilter();
    });

    test('Get Random', async () => {
        await fixture.testGetRandom();
    });

});