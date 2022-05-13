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
exports.TipsMongoDbPersistence = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_mongodb_nodex_1 = require("pip-services3-mongodb-nodex");
class TipsMongoDbPersistence extends pip_services3_mongodb_nodex_1.IdentifiableMongoDbPersistence {
    constructor() {
        super('tips');
    }
    composeFilter(filter) {
        filter = filter || new pip_services3_commons_nodex_1.FilterParams();
        let criteria = [];
        let search = filter.getAsNullableString('search');
        if (search != null) {
            let searchRegex = new RegExp(search, "i");
            let searchCriteria = [];
            searchCriteria.push({ 'title.en': { $regex: searchRegex } });
            searchCriteria.push({ 'title.sp': { $regex: searchRegex } });
            searchCriteria.push({ 'title.fr': { $regex: searchRegex } });
            searchCriteria.push({ 'title.de': { $regex: searchRegex } });
            searchCriteria.push({ 'title.ru': { $regex: searchRegex } });
            searchCriteria.push({ 'content.en': { $regex: searchRegex } });
            searchCriteria.push({ 'content.sp': { $regex: searchRegex } });
            searchCriteria.push({ 'content.fr': { $regex: searchRegex } });
            searchCriteria.push({ 'content.de': { $regex: searchRegex } });
            searchCriteria.push({ 'content.ru': { $regex: searchRegex } });
            searchCriteria.push({ 'creator.name': { $regex: searchRegex } });
            criteria.push({ $or: searchCriteria });
        }
        let id = filter.getAsNullableString('id');
        if (id != null)
            criteria.push({ _id: id });
        let topicsString = filter.get('topics');
        if (topicsString) {
            let topics = topicsString.split(',');
            criteria.push({ topics: { $in: topics } });
        }
        let status = filter.getAsNullableString('status');
        if (status != null)
            criteria.push({ status: status });
        // Search by tags
        let tagsString = filter.getAsObject('tags');
        if (tagsString) {
            let tags = pip_services3_commons_nodex_2.TagsProcessor.compressTags([tagsString]);
            criteria.push({ all_tags: { $in: tags } });
        }
        let fromCreateTime = filter.getAsNullableDateTime('from_create_time');
        if (fromCreateTime != null)
            criteria.push({ create_time: { $gte: fromCreateTime } });
        let toCreateTime = filter.getAsNullableDateTime('to_create_time');
        if (toCreateTime != null)
            criteria.push({ create_time: { $lt: toCreateTime } });
        return criteria.length > 0 ? { $and: criteria } : {};
    }
    getPageByFilter(correlationId, filter, paging) {
        const _super = Object.create(null, {
            getPageByFilter: { get: () => super.getPageByFilter }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return yield _super.getPageByFilter.call(this, correlationId, this.composeFilter(filter), paging, '-create_time', null);
        });
    }
    getOneRandom(correlationId, filter) {
        const _super = Object.create(null, {
            getOneRandom: { get: () => super.getOneRandom }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return yield _super.getOneRandom.call(this, correlationId, this.composeFilter(filter));
        });
    }
}
exports.TipsMongoDbPersistence = TipsMongoDbPersistence;
//# sourceMappingURL=TipsMongoDbPersistence.js.map