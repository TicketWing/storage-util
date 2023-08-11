import { Knex } from "knex";
import { DatabaseUtil, DeleteDBOptions, GetDBOptions, InsertDBOptions, UpdateDBOptions } from "../types/database.types";
import { ErrorHandler } from "./error-handler.util";
export declare class SQLDatabaseUtil extends ErrorHandler implements DatabaseUtil {
    private table;
    private pool;
    constructor(pool: Knex, table: string);
    get(options: GetDBOptions): Promise<any>;
    insert<T>(data: T, options: InsertDBOptions): Promise<any>;
    update<T>(data: T, options: UpdateDBOptions): Promise<void>;
    delete(options: DeleteDBOptions): Promise<void>;
}
