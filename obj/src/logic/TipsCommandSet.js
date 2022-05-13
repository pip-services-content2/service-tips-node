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
exports.TipsCommandSet = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_4 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_5 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_6 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_7 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_8 = require("pip-services3-commons-nodex");
const TipV1Schema_1 = require("../data/version1/TipV1Schema");
class TipsCommandSet extends pip_services3_commons_nodex_1.CommandSet {
    constructor(logic) {
        super();
        this._logic = logic;
        // Register commands to the database
        this.addCommand(this.makeGetTipsCommand());
        this.addCommand(this.makeGetRandomTipCommand());
        this.addCommand(this.makeGetTipByIdCommand());
        this.addCommand(this.makeCreateTipCommand());
        this.addCommand(this.makeUpdateTipCommand());
        this.addCommand(this.makeDeleteTipByIdCommand());
    }
    makeGetTipsCommand() {
        return new pip_services3_commons_nodex_2.Command("get_tips", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withOptionalProperty('filter', new pip_services3_commons_nodex_7.FilterParamsSchema())
            .withOptionalProperty('paging', new pip_services3_commons_nodex_8.PagingParamsSchema()), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let filter = pip_services3_commons_nodex_3.FilterParams.fromValue(args.get("filter"));
            let paging = pip_services3_commons_nodex_4.PagingParams.fromValue(args.get("paging"));
            return yield this._logic.getTips(correlationId, filter, paging);
        }));
    }
    makeGetRandomTipCommand() {
        return new pip_services3_commons_nodex_2.Command("get_random_tip", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withOptionalProperty('filter', new pip_services3_commons_nodex_7.FilterParamsSchema()), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let filter = pip_services3_commons_nodex_3.FilterParams.fromValue(args.get("filter"));
            return yield this._logic.getRandomTip(correlationId, filter);
        }));
    }
    makeGetTipByIdCommand() {
        return new pip_services3_commons_nodex_2.Command("get_tip_by_id", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('tip_id', pip_services3_commons_nodex_6.TypeCode.String), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let tipId = args.getAsNullableString("tip_id");
            return yield this._logic.getTipById(correlationId, tipId);
        }));
    }
    makeCreateTipCommand() {
        return new pip_services3_commons_nodex_2.Command("create_tip", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('tip', new TipV1Schema_1.TipV1Schema()), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let tip = args.get("tip");
            return yield this._logic.createTip(correlationId, tip);
        }));
    }
    makeUpdateTipCommand() {
        return new pip_services3_commons_nodex_2.Command("update_tip", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('tip', new TipV1Schema_1.TipV1Schema()), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let tip = args.get("tip");
            return yield this._logic.updateTip(correlationId, tip);
        }));
    }
    makeDeleteTipByIdCommand() {
        return new pip_services3_commons_nodex_2.Command("delete_tip_by_id", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('tip_id', pip_services3_commons_nodex_6.TypeCode.String), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let tipId = args.getAsNullableString("tip_id");
            return yield this._logic.deleteTipById(correlationId, tipId);
        }));
    }
}
exports.TipsCommandSet = TipsCommandSet;
//# sourceMappingURL=TipsCommandSet.js.map