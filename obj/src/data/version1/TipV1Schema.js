"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipV1Schema = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const PartyReferenceV1Schema_1 = require("./PartyReferenceV1Schema");
const AttachmentV1Schema_1 = require("./AttachmentV1Schema");
class TipV1Schema extends pip_services3_commons_nodex_1.ObjectSchema {
    constructor() {
        super();
        /* Identification */
        this.withOptionalProperty('id', pip_services3_commons_nodex_3.TypeCode.String);
        this.withRequiredProperty('topics', new pip_services3_commons_nodex_2.ArraySchema(pip_services3_commons_nodex_3.TypeCode.String));
        /* Generic request properties */
        this.withRequiredProperty('creator', new PartyReferenceV1Schema_1.PartyReferenceV1Schema());
        this.withOptionalProperty('create_time', pip_services3_commons_nodex_3.TypeCode.DateTime); //TypeCode.DateTime);
        /* Common properties */
        this.withOptionalProperty('title', pip_services3_commons_nodex_3.TypeCode.Map);
        this.withOptionalProperty('content', pip_services3_commons_nodex_3.TypeCode.Map);
        this.withOptionalProperty('more_url', pip_services3_commons_nodex_3.TypeCode.String);
        this.withOptionalProperty('pics', new pip_services3_commons_nodex_2.ArraySchema(new AttachmentV1Schema_1.AttachmentV1Schema()));
        this.withOptionalProperty('docs', new pip_services3_commons_nodex_2.ArraySchema(new AttachmentV1Schema_1.AttachmentV1Schema()));
        /* Search */
        this.withOptionalProperty('tags', new pip_services3_commons_nodex_2.ArraySchema(pip_services3_commons_nodex_3.TypeCode.String));
        this.withOptionalProperty('all_tags', new pip_services3_commons_nodex_2.ArraySchema(pip_services3_commons_nodex_3.TypeCode.String));
        /* Status */
        this.withOptionalProperty('status', pip_services3_commons_nodex_3.TypeCode.String);
        /* Custom fields */
        this.withOptionalProperty('custom_hdr', null);
        this.withOptionalProperty('custom_dat', null);
    }
}
exports.TipV1Schema = TipV1Schema;
//# sourceMappingURL=TipV1Schema.js.map