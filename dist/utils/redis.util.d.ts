import { RedisConfig } from "../types/config.types";
export declare class RedisUtil {
    private client;
    private errCode;
    private errName;
    constructor(config: RedisConfig);
    get<T>(key: string): Promise<T | null>;
    set<T>(key: string, data: T): Promise<void>;
    update<I, T>(key: string, data: T): Promise<void>;
    delete(key: string): Promise<void>;
}
