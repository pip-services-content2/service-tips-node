"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipsServiceFactory = void 0;
const pip_services3_components_nodex_1 = require("pip-services3-components-nodex");
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const TipsMongoDbPersistence_1 = require("../persistence/TipsMongoDbPersistence");
const TipsFilePersistence_1 = require("../persistence/TipsFilePersistence");
const TipsMemoryPersistence_1 = require("../persistence/TipsMemoryPersistence");
const TipsController_1 = require("../logic/TipsController");
const TipsHttpServiceV1_1 = require("../services/version1/TipsHttpServiceV1");
class TipsServiceFactory extends pip_services3_components_nodex_1.Factory {
    constructor() {
        super();
        this.registerAsType(TipsServiceFactory.MemoryPersistenceDescriptor, TipsMemoryPersistence_1.TipsMemoryPersistence);
        this.registerAsType(TipsServiceFactory.FilePersistenceDescriptor, TipsFilePersistence_1.TipsFilePersistence);
        this.registerAsType(TipsServiceFactory.MongoDbPersistenceDescriptor, TipsMongoDbPersistence_1.TipsMongoDbPersistence);
        this.registerAsType(TipsServiceFactory.ControllerDescriptor, TipsController_1.TipsController);
        this.registerAsType(TipsServiceFactory.HttpServiceDescriptor, TipsHttpServiceV1_1.TipsHttpServiceV1);
    }
}
exports.TipsServiceFactory = TipsServiceFactory;
TipsServiceFactory.Descriptor = new pip_services3_commons_nodex_1.Descriptor("service-tips", "factory", "default", "default", "1.0");
TipsServiceFactory.MemoryPersistenceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-tips", "persistence", "memory", "*", "1.0");
TipsServiceFactory.FilePersistenceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-tips", "persistence", "file", "*", "1.0");
TipsServiceFactory.MongoDbPersistenceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-tips", "persistence", "mongodb", "*", "1.0");
TipsServiceFactory.ControllerDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-tips", "controller", "default", "*", "1.0");
TipsServiceFactory.HttpServiceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-tips", "service", "http", "*", "1.0");
//# sourceMappingURL=TipsServiceFactory.js.map