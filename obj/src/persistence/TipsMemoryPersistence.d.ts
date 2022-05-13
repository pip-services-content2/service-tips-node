import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { IdentifiableMemoryPersistence } from 'pip-services3-data-nodex';
import { TipV1 } from '../data/version1/TipV1';
import { ITipsPersistence } from './ITipsPersistence';
export declare class TipsMemoryPersistence extends IdentifiableMemoryPersistence<TipV1, string> implements ITipsPersistence {
    constructor();
    private matchString;
    private matchMultiString;
    private matchSearch;
    private contains;
    private composeFilter;
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<TipV1>>;
    getOneRandom(correlationId: string, filter: FilterParams): Promise<TipV1>;
}
