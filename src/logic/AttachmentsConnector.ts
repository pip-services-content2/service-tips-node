import { ReferenceV1 } from 'client-attachments-node';
import { IAttachmentsClientV1 } from 'client-attachments-node';

import { TipV1 } from '../data/version1/TipV1';

export class AttachmentsConnector {

    public constructor(
        private _attachmentsClient: IAttachmentsClientV1
    ) {}

    private extractAttachmentIds(tip: TipV1): string[] {
        let ids: string[] = [];

        for(let pic of tip.pics) {
            if (pic.id)
                ids.push(pic.id);
        }

        for (let doc of tip.docs) {
            if (doc.id)
                ids.push(doc.id);
        }

        return ids;
    }

    public async addAttachments(correlationId: string, tip: TipV1): Promise<void> {
        
        if (this._attachmentsClient == null || tip == null)
            return;
        

        let ids = this.extractAttachmentIds(tip);
        let reference = new ReferenceV1(tip.id, 'tip');
        await this._attachmentsClient.addAttachments(correlationId, reference, ids);
    }

    public async updateAttachments(correlationId: string, oldTip: TipV1, newTip: TipV1): Promise<void> {
        
        if (this._attachmentsClient == null || oldTip == null || newTip == null)
            return;

        let oldIds = this.extractAttachmentIds(oldTip);
        let newIds = this.extractAttachmentIds(newTip);
        let reference = new ReferenceV1(newTip.id, 'tip');
        await this._attachmentsClient.updateAttachments(correlationId, reference, oldIds, newIds)
    }

    public async removeAttachments(correlationId: string, tip: TipV1): Promise<void> {
        
        if (this._attachmentsClient == null || tip == null)
            return;

        let ids = this.extractAttachmentIds(tip);
        let reference = new ReferenceV1(tip.id, 'tip');
        await this._attachmentsClient.removeAttachments(correlationId, reference, ids);
    }

}