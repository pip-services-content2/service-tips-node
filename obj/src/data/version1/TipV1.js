"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipV1 = void 0;
class TipV1 {
    constructor(id, topics, creator, title, content, moreUrl) {
        this.id = id;
        this.topics = topics || [];
        this.creator = creator;
        this.title = title;
        this.content = content;
        this.more_url = moreUrl;
        this.pics = [];
        this.docs = [];
        this.create_time = new Date();
    }
}
exports.TipV1 = TipV1;
//# sourceMappingURL=TipV1.js.map