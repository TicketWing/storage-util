import { DeleteDBOptions, GetDBOptions, InsertDBOptions, UpdateDBOptions } from "../types/database.types";
import { DeleteCacheOptions, GetCacheOptions, InsertCacheOptions, UpdateCacheOptions } from "../types/cache.types";
import { Knex } from "knex";
import { Redis } from "ioredis";
import { Options } from "../types/options.types";
import { Model } from "mongoose";
export declare class CacheableStorage {
    private cache;
    private database;
    constructor(pool: Knex | Model<any>, client: Redis, table?: string | undefined);
    get(options: Options<GetDBOptions, GetCacheOptions | undefined>): Promise<any>;
    insert<T>(data: T, options: Options<InsertDBOptions, InsertCacheOptions | undefined>): Promise<string>;
    update<T>(data: T, options: Options<UpdateDBOptions, UpdateCacheOptions | undefined>): Promise<void>;
    delete(options: Options<DeleteDBOptions, DeleteCacheOptions | undefined>): Promise<void>;
}
