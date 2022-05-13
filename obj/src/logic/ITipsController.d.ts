import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { TipV1 } from '../data/version1/TipV1';
export interface ITipsController {
    getTips(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<TipV1>>;
    getRandomTip(correlationId: string, filter: FilterParams): Promise<TipV1>;
    getTipById(correlationId: string, tipId: string): Promise<TipV1>;
    createTip(correlationId: string, tip: TipV1): Promise<TipV1>;
    updateTip(correlationId: string, tip: TipV1): Promise<TipV1>;
    deleteTipById(correlationId: string, tipId: string): Promise<TipV1>;
}
