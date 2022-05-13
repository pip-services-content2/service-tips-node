import { IStringIdentifiable } from 'pip-services3-commons-nodex';
import { MultiString } from 'pip-services3-commons-nodex';
import { AttachmentV1 } from './AttachmentV1';
import { PartyReferenceV1 } from './PartyReferenceV1';
export declare class TipV1 implements IStringIdentifiable {
    constructor(id: string, topics: string[], creator?: PartyReferenceV1, title?: MultiString, content?: MultiString, moreUrl?: string);
    id: string;
    topics: string[];
    creator: PartyReferenceV1;
    create_time: Date;
    title?: MultiString;
    content?: MultiString;
    more_url?: string;
    pics?: AttachmentV1[];
    docs?: AttachmentV1[];
    tags?: string[];
    all_tags?: string[];
    status?: string;
    custom_hdr?: any;
    custom_dat?: any;
}
