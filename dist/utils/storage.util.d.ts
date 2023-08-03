import { DeleteDBOptions, GetDBOptions, InsertDBOptions, UpdateDBOptions } from "../types/database.types";
import { DeleteCacheOptions, GetCacheOptions, InsertCacheOptions, UpdateCacheOptions } from "../types/cache.types";
import { Options } from "../constructors/options.constructor";
import { KnexConfig, RedisConfig } from "../types/config.types";
export declare class Storage {
    private cache;
    private database;
    constructor(knexConf: KnexConfig, redisConf: RedisConfig, table: string);
    get(options: Options<GetDBOptions, GetCacheOptions | undefined>): Promise<any[]>;
    insert<T>(data: T, options: Options<InsertDBOptions, InsertCacheOptions | undefined>): Promise<string>;
    update<T>(data: T, options: Options<UpdateDBOptions, UpdateCacheOptions | undefined>): Promise<void>;
    delete(options: Options<DeleteDBOptions, DeleteCacheOptions | undefined>): Promise<void>;
}
