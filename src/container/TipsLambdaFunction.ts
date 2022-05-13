import { Descriptor } from 'pip-services3-commons-nodex';
import { CommandableLambdaFunction } from 'pip-services3-aws-nodex';
import { TipsServiceFactory } from '../build/TipsServiceFactory';

export class TipsLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super("tips", "User tips function");
        this._dependencyResolver.put('controller', new Descriptor('service-tips', 'controller', 'default', '*', '*'));
        this._factories.add(new TipsServiceFactory());
    }
}

export const handler = new TipsLambdaFunction().getHandler();