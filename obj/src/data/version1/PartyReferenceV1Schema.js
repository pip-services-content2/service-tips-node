"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartyReferenceV1Schema = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
class PartyReferenceV1Schema extends pip_services3_commons_nodex_1.ObjectSchema {
    constructor() {
        super();
        this.withRequiredProperty('id', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('name', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('email', pip_services3_commons_nodex_2.TypeCode.String);
    }
}
exports.PartyReferenceV1Schema = PartyReferenceV1Schema;
//# sourceMappingURL=PartyReferenceV1Schema.js.map