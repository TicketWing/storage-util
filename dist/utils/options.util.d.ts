import { Options } from "../constructors/options.constructor";
export declare class OptionsBuilder<T, U> {
    private options;
    constructor(queries: T);
    setCacheOptions(options: U): OptionsBuilder<T, U>;
    build(): Options<T, U>;
}
