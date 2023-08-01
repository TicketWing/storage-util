export class Options<T, U> {
  public cacheable: boolean;
  public cacheOptions: U | undefined;
  public queries: T;

  constructor(queries: T) {
    this.cacheable = false;
    this.cacheOptions = undefined;
    this.queries = queries;
  }
}
