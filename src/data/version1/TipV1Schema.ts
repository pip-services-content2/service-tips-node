import { ObjectSchema } from 'pip-services3-commons-nodex';
import { ArraySchema } from 'pip-services3-commons-nodex';
import { TypeCode } from 'pip-services3-commons-nodex';

import { PartyReferenceV1Schema } from './PartyReferenceV1Schema';
import { AttachmentV1Schema } from './AttachmentV1Schema';

export class TipV1Schema extends ObjectSchema {
    public constructor() {
        super();
    
        /* Identification */
        this.withOptionalProperty('id', TypeCode.String);
        this.withRequiredProperty('topics', new ArraySchema(TypeCode.String));

        /* Generic request properties */
        this.withRequiredProperty('creator', new PartyReferenceV1Schema());
        this.withOptionalProperty('create_time', TypeCode.DateTime); //TypeCode.DateTime);

        /* Common properties */
        this.withOptionalProperty('title', TypeCode.Map);
        this.withOptionalProperty('content', TypeCode.Map);
        this.withOptionalProperty('more_url', TypeCode.String);
        this.withOptionalProperty('pics', new ArraySchema(new AttachmentV1Schema()));
        this.withOptionalProperty('docs', new ArraySchema(new AttachmentV1Schema()));

        /* Search */
        this.withOptionalProperty('tags', new ArraySchema(TypeCode.String));
        this.withOptionalProperty('all_tags', new ArraySchema(TypeCode.String));

        /* Status */
        this.withOptionalProperty('status', TypeCode.String);

        /* Custom fields */
        this.withOptionalProperty('custom_hdr', null);
        this.withOptionalProperty('custom_dat', null);
    }
}
