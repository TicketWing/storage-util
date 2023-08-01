import { Options } from "../constructors/options.constructor";

export class OptionsBuilder<T, U> {
  private options: Options<T, U>;

  constructor(queries: T) {
    this.options = new Options(queries);
  }

  setCacheable(cacheable: boolean): OptionsBuilder<T, U> {
    this.options.cacheable = cacheable;
    return this;
  }

  setCacheOptions(options: U): OptionsBuilder<T, U> {
    this.options.cacheOptions = options;
    return this;
  }

  build(): Options<T, U> {
    return this.options;
  }
}
