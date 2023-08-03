import { KnexConfig } from "../types/config.types";
import { DeleteDBOptions, GetDBOptions, InsertDBOptions, UpdateDBOptions } from "../types/database.types";
export declare class DatabaseUtil {
    private table;
    private errName;
    private errCode;
    private database;
    constructor(config: KnexConfig, table: string);
    private handler;
    get(options: GetDBOptions): Promise<any>;
    insert<T>(data: T, options: InsertDBOptions): Promise<any>;
    update<T>(data: T, options: UpdateDBOptions): Promise<void>;
    delete(options: DeleteDBOptions): Promise<void>;
}