"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoSQLDatabaseUtil = void 0;
const error_handler_util_1 = require("./error-handler.util");
class NoSQLDatabaseUtil extends error_handler_util_1.ErrorHandler {
    model;
    constructor(model) {
        super("Database", 501);
        this.model = model;
    }
    returning(obj, fields) {
        const result = {};
        for (const field in obj) {
            if (fields.includes(field)) {
                result[field] = obj[field];
            }
        }
        return result;
    }
    async get(options) {
        const { select, where } = options;
        const record = await this.model.findOne(where).select(select);
        return record;
    }
    async insert(data, options) {
        const { returning } = options;
        const query = this.model.create(data);
        const inserted = await this.handler(query, "INSERT Error");
        const sorted = this.returning(inserted, returning);
        return sorted;
    }
    async update(data, options) {
        const update = { $set: data };
        const query = this.model.findOneAndUpdate(options.where, update);
        await this.handler(query, "UPDATE Error");
    }
    async delete(options) {
        const query = this.model.findOneAndDelete(options.where);
        await this.handler(query, "DELETE Error");
    }
}
exports.NoSQLDatabaseUtil = NoSQLDatabaseUtil;
