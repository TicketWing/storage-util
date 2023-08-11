import { GetCacheOptions, InsertCacheOptions, DeleteCacheOptions, UpdateCacheOptions } from "../types/cache.types";
import { Redis } from "ioredis";
import { ErrorHandler } from "./error-handler.util";
export declare class CacheUtil extends ErrorHandler {
    private redis;
    constructor(client: Redis);
    private includeInCache;
    get(options: GetCacheOptions): Promise<any>;
    set(data: any, options: InsertCacheOptions): Promise<void>;
    update(data: any, options: UpdateCacheOptions): Promise<void>;
    delete(options: DeleteCacheOptions): Promise<void>;
}
