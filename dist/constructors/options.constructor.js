"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Options = void 0;
class Options {
    cacheOptions;
    dbOptions;
    constructor(dbOptions) {
        this.cacheOptions = undefined;
        this.dbOptions = dbOptions;
    }
}
exports.Options = Options;
