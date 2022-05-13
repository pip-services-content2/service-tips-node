"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipsController = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_4 = require("pip-services3-commons-nodex");
const TipsCommandSet_1 = require("./TipsCommandSet");
const AttachmentsConnector_1 = require("./AttachmentsConnector");
class TipsController {
    constructor() {
        this._dependencyResolver = new pip_services3_commons_nodex_2.DependencyResolver(TipsController._defaultConfig);
    }
    configure(config) {
        this._dependencyResolver.configure(config);
    }
    setReferences(references) {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired('persistence');
        this._attachmentsClient = this._dependencyResolver.getOneOptional('attachments');
        this._attachmentsConnector = new AttachmentsConnector_1.AttachmentsConnector(this._attachmentsClient);
    }
    getCommandSet() {
        if (this._commandSet == null)
            this._commandSet = new TipsCommandSet_1.TipsCommandSet(this);
        return this._commandSet;
    }
    getTips(correlationId, filter, paging) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._persistence.getPageByFilter(correlationId, filter, paging);
        });
    }
    getRandomTip(correlationId, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._persistence.getOneRandom(correlationId, filter);
        });
    }
    getTipById(correlationId, tipId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._persistence.getOneById(correlationId, tipId);
        });
    }
    createTip(correlationId, tip) {
        return __awaiter(this, void 0, void 0, function* () {
            let newTip = null;
            tip.create_time = new Date();
            tip.all_tags = pip_services3_commons_nodex_3.TagsProcessor.extractHashTags('#title.en#title.sp#title.fr#title.de#title.ru#content.en#content.sp#content.fr#content.de#content.ru');
            newTip = yield this._persistence.create(correlationId, tip);
            yield this._attachmentsConnector.addAttachments(correlationId, newTip);
            return newTip;
        });
    }
    updateTip(correlationId, tip) {
        return __awaiter(this, void 0, void 0, function* () {
            let oldTip = null;
            let newTip = null;
            tip.all_tags = pip_services3_commons_nodex_3.TagsProcessor.extractHashTags('#title.en#title.sp#title.fr#title.de#title.ru#content.en#content.sp#content.fr#content.de#content.ru');
            oldTip = yield this._persistence.getOneById(correlationId, tip.id);
            if (oldTip == null) {
                throw new pip_services3_commons_nodex_4.NotFoundException(correlationId, 'TIP_NOT_FOUND', 'Tip ' + tip.id + ' was not found').withDetails('tip_id', tip.id);
            }
            newTip = yield this._persistence.update(correlationId, tip);
            yield this._attachmentsConnector.updateAttachments(correlationId, oldTip, newTip);
            return newTip;
        });
    }
    deleteTipById(correlationId, tipId) {
        return __awaiter(this, void 0, void 0, function* () {
            let oldTip = null;
            oldTip = yield this._persistence.deleteById(correlationId, tipId);
            yield this._attachmentsConnector.removeAttachments(correlationId, oldTip);
            return oldTip;
        });
    }
}
exports.TipsController = TipsController;
TipsController._defaultConfig = pip_services3_commons_nodex_1.ConfigParams.fromTuples('dependencies.persistence', 'service-tips:persistence:*:*:1.0', 'dependencies.attachments', 'pip-services-attachments:client:*:*:1.0');
//# sourceMappingURL=TipsController.js.map