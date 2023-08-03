import { DeleteCacheOptions, GetCacheOptions, InsertCacheOptions, UpdateCacheOptions } from "../types/cache.types";
import { RedisConfig } from "../types/config.types";
export declare class CacheUtil {
    private redis;
    private errCode;
    private errName;
    constructor(config: RedisConfig);
    private handler;
    private includeInCache;
    get(options: GetCacheOptions): Promise<any>;
    set(data: any, options: InsertCacheOptions): Promise<void>;
    update(data: any, options: UpdateCacheOptions): Promise<void>;
    delete(options: DeleteCacheOptions): Promise<void>;
}
