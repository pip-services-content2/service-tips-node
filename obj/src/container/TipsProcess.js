"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipsProcess = void 0;
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
const pip_services3_swagger_nodex_1 = require("pip-services3-swagger-nodex");
const pip_services3_container_nodex_1 = require("pip-services3-container-nodex");
const TipsServiceFactory_1 = require("../build/TipsServiceFactory");
class TipsProcess extends pip_services3_container_nodex_1.ProcessContainer {
    constructor() {
        super("tips", "User tips microservice");
        this._factories.add(new TipsServiceFactory_1.TipsServiceFactory);
        this._factories.add(new pip_services3_rpc_nodex_1.DefaultRpcFactory);
        this._factories.add(new pip_services3_swagger_nodex_1.DefaultSwaggerFactory);
    }
}
exports.TipsProcess = TipsProcess;
//# sourceMappingURL=TipsProcess.js.map