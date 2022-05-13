import { IStringIdentifiable } from 'pip-services3-commons-nodex';
import { MultiString } from 'pip-services3-commons-nodex';

import { AttachmentV1 } from './AttachmentV1';
import { PartyReferenceV1 } from './PartyReferenceV1';

export class TipV1 implements IStringIdentifiable {

    public constructor(id: string, topics: string[], creator?: PartyReferenceV1,
        title?: MultiString, content?: MultiString, moreUrl?: string) {
        this.id = id;
        this.topics = topics || [];
        this.creator = creator;
        this.title = title;
        this.content = content;
        this.more_url = moreUrl;

        this.pics = [];
        this.docs = [];
        this.create_time = new Date();
    }

    /* Identification */
    public id: string;
    public topics: string[];

    /* Automatically managed fields */
    public creator: PartyReferenceV1;
    public create_time: Date;

    /* Content */
    public title?: MultiString;
    public content?: MultiString;
    public more_url?: string;
    public pics?: AttachmentV1[];
    public docs?: AttachmentV1[];

    /* Search */
    public tags?: string[];
    public all_tags?: string[];

    /* Status */
    public status?: string;

    /* Custom fields */
    public custom_hdr?: any;
    public custom_dat?: any;
}
