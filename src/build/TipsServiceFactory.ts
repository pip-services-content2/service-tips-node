import { Factory } from 'pip-services3-components-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';

import { TipsMongoDbPersistence } from '../persistence/TipsMongoDbPersistence';
import { TipsFilePersistence } from '../persistence/TipsFilePersistence';
import { TipsMemoryPersistence } from '../persistence/TipsMemoryPersistence';
import { TipsController } from '../logic/TipsController';
import { TipsHttpServiceV1 } from '../services/version1/TipsHttpServiceV1';

export class TipsServiceFactory extends Factory {
	public static Descriptor = new Descriptor("service-tips", "factory", "default", "default", "1.0");
	public static MemoryPersistenceDescriptor = new Descriptor("service-tips", "persistence", "memory", "*", "1.0");
	public static FilePersistenceDescriptor = new Descriptor("service-tips", "persistence", "file", "*", "1.0");
	public static MongoDbPersistenceDescriptor = new Descriptor("service-tips", "persistence", "mongodb", "*", "1.0");
	public static ControllerDescriptor = new Descriptor("service-tips", "controller", "default", "*", "1.0");
	public static HttpServiceDescriptor = new Descriptor("service-tips", "service", "http", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(TipsServiceFactory.MemoryPersistenceDescriptor, TipsMemoryPersistence);
		this.registerAsType(TipsServiceFactory.FilePersistenceDescriptor, TipsFilePersistence);
		this.registerAsType(TipsServiceFactory.MongoDbPersistenceDescriptor, TipsMongoDbPersistence);
		this.registerAsType(TipsServiceFactory.ControllerDescriptor, TipsController);
		this.registerAsType(TipsServiceFactory.HttpServiceDescriptor, TipsHttpServiceV1);
	}
	
}
