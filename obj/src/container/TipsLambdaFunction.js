"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.TipsLambdaFunction = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_aws_nodex_1 = require("pip-services3-aws-nodex");
const TipsServiceFactory_1 = require("../build/TipsServiceFactory");
class TipsLambdaFunction extends pip_services3_aws_nodex_1.CommandableLambdaFunction {
    constructor() {
        super("tips", "User tips function");
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor('service-tips', 'controller', 'default', '*', '*'));
        this._factories.add(new TipsServiceFactory_1.TipsServiceFactory());
    }
}
exports.TipsLambdaFunction = TipsLambdaFunction;
exports.handler = new TipsLambdaFunction().getHandler();
//# sourceMappingURL=TipsLambdaFunction.js.map