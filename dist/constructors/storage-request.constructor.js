"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageRequestBuilder = void 0;
class StorageRequestBuilder {
    options;
    constructor(dbOptions) {
        this.options = { dbOptions };
    }
    setCacheOptions(options) {
        this.options.cacheOptions = options;
        return this;
    }
    build() {
        return this.options;
    }
}
exports.StorageRequestBuilder = StorageRequestBuilder;
