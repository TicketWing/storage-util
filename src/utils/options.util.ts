import { Options } from "../constructors/options.constructor";

export class OptionsBuilder<T, U> {
  private options: Options<T, U>;

  constructor(queries: T) {
    this.options = new Options(queries);
  }

  setCacheOptions(options: U): OptionsBuilder<T, U> {
    this.options.cacheOptions = options;
    return this;
  }

  build(): Options<T, U> {
    return this.options;
  }
}
