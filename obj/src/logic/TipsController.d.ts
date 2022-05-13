import { ConfigParams } from 'pip-services3-commons-nodex';
import { IConfigurable } from 'pip-services3-commons-nodex';
import { IReferences } from 'pip-services3-commons-nodex';
import { IReferenceable } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { ICommandable } from 'pip-services3-commons-nodex';
import { CommandSet } from 'pip-services3-commons-nodex';
import { TipV1 } from '../data/version1/TipV1';
import { ITipsController } from './ITipsController';
export declare class TipsController implements IConfigurable, IReferenceable, ICommandable, ITipsController {
    private static _defaultConfig;
    private _dependencyResolver;
    private _persistence;
    private _attachmentsClient;
    private _attachmentsConnector;
    private _commandSet;
    configure(config: ConfigParams): void;
    setReferences(references: IReferences): void;
    getCommandSet(): CommandSet;
    getTips(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<TipV1>>;
    getRandomTip(correlationId: string, filter: FilterParams): Promise<TipV1>;
    getTipById(correlationId: string, tipId: string): Promise<TipV1>;
    createTip(correlationId: string, tip: TipV1): Promise<TipV1>;
    updateTip(correlationId: string, tip: TipV1): Promise<TipV1>;
    deleteTipById(correlationId: string, tipId: string): Promise<TipV1>;
}
