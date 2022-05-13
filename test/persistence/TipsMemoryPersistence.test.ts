import { TipsMemoryPersistence } from '../../src/persistence/TipsMemoryPersistence';
import { TipsPersistenceFixture } from './TipsPersistenceFixture';

suite('TipsMemoryPersistence', ()=> {
    let persistence: TipsMemoryPersistence;
    let fixture: TipsPersistenceFixture;
    
    setup(async () => {
        persistence = new TipsMemoryPersistence();
        fixture = new TipsPersistenceFixture(persistence);
        
        await persistence.open(null);
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