import { Options } from "../types/options.types";

export class StorageRequestBuilder<T, U> {
  private options: Options<T, U>;

  constructor(dbOptions: T) {
    this.options = { dbOptions };
  }

  setCacheOptions(options: U): StorageRequestBuilder<T, U> {
    this.options.cacheOptions = options;
    return this;
  }

  build(): Options<T, U> {
    return this.options;
  }
}
