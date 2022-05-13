import { DataPage, FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { IdentifiableMongoDbPersistence } from 'pip-services3-mongodb-nodex';
import { TipV1 } from '../data/version1/TipV1';
import { ITipsPersistence } from './ITipsPersistence';
export declare class TipsMongoDbPersistence extends IdentifiableMongoDbPersistence<TipV1, string> implements ITipsPersistence {
    constructor();
    private composeFilter;
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<TipV1>>;
    getOneRandom(correlationId: string, filter: FilterParams): Promise<TipV1>;
}
