import { ConfigParams } from 'pip-services3-commons-nodex';
import { IConfigurable } from 'pip-services3-commons-nodex';
import { IReferences } from 'pip-services3-commons-nodex';
import { IReferenceable } from 'pip-services3-commons-nodex';
import { DependencyResolver } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { ICommandable } from 'pip-services3-commons-nodex';
import { CommandSet } from 'pip-services3-commons-nodex';
import { TagsProcessor } from 'pip-services3-commons-nodex';
import { NotFoundException } from 'pip-services3-commons-nodex';
import { IAttachmentsClientV1 } from 'client-attachments-node';

import { TipV1 } from '../data/version1/TipV1';
import { ITipsPersistence } from '../persistence/ITipsPersistence';
import { ITipsController } from './ITipsController';
import { TipsCommandSet } from './TipsCommandSet';
import { AttachmentsConnector } from './AttachmentsConnector';

export class TipsController implements IConfigurable, IReferenceable, ICommandable, ITipsController {
    private static _defaultConfig: ConfigParams = ConfigParams.fromTuples(
        'dependencies.persistence', 'service-tips:persistence:*:*:1.0',
        'dependencies.attachments', 'pip-services-attachments:client:*:*:1.0'
    );

    private _dependencyResolver: DependencyResolver = new DependencyResolver(TipsController._defaultConfig);
    private _persistence: ITipsPersistence;
    private _attachmentsClient: IAttachmentsClientV1;
    private _attachmentsConnector: AttachmentsConnector;
    private _commandSet: TipsCommandSet;

    public configure(config: ConfigParams): void {
        this._dependencyResolver.configure(config);
    }

    public setReferences(references: IReferences): void {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired<ITipsPersistence>('persistence');

        this._attachmentsClient = this._dependencyResolver.getOneOptional<IAttachmentsClientV1>('attachments');
        this._attachmentsConnector = new AttachmentsConnector(this._attachmentsClient);
    }

    public getCommandSet(): CommandSet {
        if (this._commandSet == null)
            this._commandSet = new TipsCommandSet(this);
        return this._commandSet;
    }

    public async getTips(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<TipV1>> {
        return await this._persistence.getPageByFilter(correlationId, filter, paging);
    }

    public async getRandomTip(correlationId: string, filter: FilterParams): Promise<TipV1> {
        return await this._persistence.getOneRandom(correlationId, filter);
    }

    public async getTipById(correlationId: string, tipId: string): Promise<TipV1> {
        return await this._persistence.getOneById(correlationId, tipId);
    }

    public async createTip(correlationId: string, tip: TipV1): Promise<TipV1> {
        let newTip: TipV1 = null;

        tip.create_time = new Date();
        tip.all_tags = TagsProcessor.extractHashTags(
            '#title.en#title.sp#title.fr#title.de#title.ru#content.en#content.sp#content.fr#content.de#content.ru'
        );

        newTip = await this._persistence.create(correlationId, tip);

        await this._attachmentsConnector.addAttachments(correlationId, newTip);

        return newTip;
    }

    public async updateTip(correlationId: string, tip: TipV1): Promise<TipV1> {
        let oldTip: TipV1 = null;
        let newTip: TipV1 = null;
        
        tip.all_tags = TagsProcessor.extractHashTags(
            '#title.en#title.sp#title.fr#title.de#title.ru#content.en#content.sp#content.fr#content.de#content.ru'
        );

        oldTip = await this._persistence.getOneById(correlationId, tip.id);

        if (oldTip == null) {
            throw new NotFoundException(
                correlationId,
                'TIP_NOT_FOUND',
                'Tip ' + tip.id + ' was not found'
            ).withDetails('tip_id', tip.id);
        }

        newTip = await this._persistence.update(correlationId, tip);

        await this._attachmentsConnector.updateAttachments(correlationId, oldTip, newTip);

        return newTip;
    }

    public async deleteTipById(correlationId: string, tipId: string): Promise<TipV1> {
        let oldTip: TipV1 = null;

        oldTip = await this._persistence.deleteById(correlationId, tipId);

        await this._attachmentsConnector.removeAttachments(correlationId, oldTip);

        return oldTip;
    }

}
