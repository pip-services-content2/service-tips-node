import { ObjectSchema } from 'pip-services3-commons-nodex';
import { TypeCode } from 'pip-services3-commons-nodex';

export class AttachmentV1Schema extends ObjectSchema {
    public constructor() {
        super();
        this.withOptionalProperty('id', TypeCode.String);
        this.withOptionalProperty('uri', TypeCode.String);
        this.withOptionalProperty('name', TypeCode.String);
    }
}