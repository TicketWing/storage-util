import { DeleteDBOptions, GetDBOptions, InsertDBOptions, UpdateDBOptions } from "../types/database.types";
import { DeleteCacheOptions, GetCacheOptions, InsertCacheOptions, UpdateCacheOptions } from "../types/cache.types";
import { Options } from "../constructors/options.constructor";
import { Knex } from "knex";
import { Redis } from "ioredis";
export declare class Storage {
    private cache;
    private database;
    constructor(pool: Knex, client: Redis, table: string);
    get(options: Options<GetDBOptions, GetCacheOptions | undefined>): Promise<any>;
    insert<T>(data: T, options: Options<InsertDBOptions, InsertCacheOptions | undefined>): Promise<string>;
    update<T>(data: T, options: Options<UpdateDBOptions, UpdateCacheOptions | undefined>): Promise<void>;
    delete(options: Options<DeleteDBOptions, DeleteCacheOptions | undefined>): Promise<void>;
}
