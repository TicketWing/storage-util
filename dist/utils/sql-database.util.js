"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SQLDatabaseUtil = void 0;
const error_handler_util_1 = require("./error-handler.util");
class SQLDatabaseUtil extends error_handler_util_1.ErrorHandler {
    table;
    pool;
    constructor(pool, table) {
        super("Database", 501);
        this.pool = pool;
        this.table = table;
    }
    async get(options) {
        const { select, where } = options;
        const query = this.pool(this.table)
            .select(...select)
            .where(where);
        const record = await this.handler(query, "GET Error");
        return record[0];
    }
    async insert(data, options) {
        const query = this.pool(this.table)
            .returning(options.returning || ["id"])
            .insert(data);
        const inserted = await this.handler(query, "INSERT Error");
        return inserted[0];
    }
    async update(data, options) {
        const query = this.pool(this.table).where(options.where).update(data);
        await this.handler(query, "UPDATE Error");
    }
    async delete(options) {
        const query = this.pool(this.table).where(options.where).del();
        await this.handler(query, "DELETE Error");
    }
}
exports.SQLDatabaseUtil = SQLDatabaseUtil;
