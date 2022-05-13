import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { IGetter } from 'pip-services3-data-nodex';
import { IWriter } from 'pip-services3-data-nodex';

import { TipV1 } from '../data/version1/TipV1';

export interface ITipsPersistence
    extends IGetter<TipV1, string>, IWriter<TipV1, string>  {
    
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<TipV1>>;

    getOneRandom(correlationId: string, filter: FilterParams): Promise<TipV1>;

    getOneById(correlationId: string, id: string): Promise<TipV1>;

    create(correlationId: string, item: TipV1): Promise<TipV1>;

    update(correlationId: string, item: TipV1): Promise<TipV1>;

    deleteById(correlationId: string, id: string): Promise<TipV1>;
}

