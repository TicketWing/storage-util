import { Model } from "mongoose";
import { ErrorHandler } from "./error-handler.util";
import { DatabaseUtil, DeleteDBOptions, GetDBOptions, InsertDBOptions, UpdateDBOptions } from "../types/database.types";
export declare class NoSQLDatabaseUtil extends ErrorHandler implements DatabaseUtil {
    private model;
    constructor(model: Model<any>);
    private returning;
    get(options: GetDBOptions): Promise<any>;
    insert<T>(data: T, options: InsertDBOptions): Promise<any>;
    update<T>(data: T, options: UpdateDBOptions): Promise<void>;
    delete(options: DeleteDBOptions): Promise<void>;
}
