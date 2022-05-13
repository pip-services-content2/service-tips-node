"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipsHttpServiceV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
class TipsHttpServiceV1 extends pip_services3_rpc_nodex_1.CommandableHttpService {
    constructor() {
        super('v1/tips');
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor('service-tips', 'controller', 'default', '*', '1.0'));
    }
}
exports.TipsHttpServiceV1 = TipsHttpServiceV1;
//# sourceMappingURL=TipsHttpServiceV1.js.map