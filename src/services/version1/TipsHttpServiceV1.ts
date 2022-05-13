import { Descriptor } from 'pip-services3-commons-nodex';
import { CommandableHttpService } from 'pip-services3-rpc-nodex';

export class TipsHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('v1/tips');
        this._dependencyResolver.put('controller', new Descriptor('service-tips', 'controller', 'default', '*', '1.0'));
    }
}