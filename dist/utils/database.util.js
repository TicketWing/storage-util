"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseUtil = void 0;
const error_util_1 = require("./error.util");
class DatabaseUtil {
    table;
    errName = "Database";
    errCode = 501;
    database;
    constructor(pool, table) {
        this.database = pool;
        this.table = table;
    }
    async handler(promise, msg) {
        try {
            const result = await promise;
            return result;
        }
        catch (error) {
            throw new error_util_1.CustomError(this.errName, msg, this.errCode);
        }
    }
    async get(options) {
        const { select, where } = options;
        const query = this.database(this.table)
            .select(...select)
            .where(where);
        const record = await this.handler(query, "GET Error");
        return record[0];
    }
    async insert(data, options) {
        const query = this.database(this.table)
            .returning(options.returning || ['id'])
            .insert(data);
        const inserted = await this.handler(query, "INSERT Error");
        return inserted[0];
    }
    async update(data, options) {
        const query = this.database(this.table).where(options.where).update(data);
        await this.handler(query, "UPDATE Error");
    }
    async delete(options) {
        const query = this.database(this.table).where(options.where).del();
        await this.handler(query, "DELETE Error");
    }
}
exports.DatabaseUtil = DatabaseUtil;
