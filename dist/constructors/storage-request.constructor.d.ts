import { Options } from "../types/options.types";
export declare class StorageRequestBuilder<T, U> {
    private options;
    constructor(dbOptions: T);
    setCacheOptions(options: U): StorageRequestBuilder<T, U>;
    build(): Options<T, U>;
}
