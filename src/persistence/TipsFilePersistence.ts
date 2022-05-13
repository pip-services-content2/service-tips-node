import { ConfigParams } from 'pip-services3-commons-nodex';
import { JsonFilePersister } from 'pip-services3-data-nodex';

import { TipsMemoryPersistence } from './TipsMemoryPersistence';
import { TipV1 } from '../data/version1/TipV1';

export class TipsFilePersistence extends TipsMemoryPersistence {
	protected _persister: JsonFilePersister<TipV1>;

    public constructor(path?: string) {
        super();

        this._persister = new JsonFilePersister<TipV1>(path);
        this._loader = this._persister;
        this._saver = this._persister;
    }

    public configure(config: ConfigParams): void {
        super.configure(config);
        this._persister.configure(config);
    }

}