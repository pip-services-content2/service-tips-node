"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttachmentV1Schema = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
class AttachmentV1Schema extends pip_services3_commons_nodex_1.ObjectSchema {
    constructor() {
        super();
        this.withOptionalProperty('id', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('uri', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('name', pip_services3_commons_nodex_2.TypeCode.String);
    }
}
exports.AttachmentV1Schema = AttachmentV1Schema;
//# sourceMappingURL=AttachmentV1Schema.js.map