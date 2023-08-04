import { Redis } from "ioredis";
import { DeleteCacheOptions, GetCacheOptions, InsertCacheOptions, UpdateCacheOptions } from "../types/cache.types";
export declare class CacheUtil {
    private redis;
    private errCode;
    private errName;
    constructor(client: Redis);
    private handler;
    private includeInCache;
    get(options: GetCacheOptions): Promise<any>;
    set(data: any, options: InsertCacheOptions): Promise<void>;
    update(data: any, options: UpdateCacheOptions): Promise<void>;
    delete(options: DeleteCacheOptions): Promise<void>;
}
