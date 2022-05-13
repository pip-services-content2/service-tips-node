import { DefaultRpcFactory } from 'pip-services3-rpc-nodex';
import { DefaultSwaggerFactory } from 'pip-services3-swagger-nodex';
import { ProcessContainer } from 'pip-services3-container-nodex';

import { TipsServiceFactory } from '../build/TipsServiceFactory';

export class TipsProcess extends ProcessContainer {

    public constructor() {
        super("tips", "User tips microservice");
        this._factories.add(new TipsServiceFactory);
        this._factories.add(new DefaultRpcFactory);
        this._factories.add(new DefaultSwaggerFactory);
    }

}
