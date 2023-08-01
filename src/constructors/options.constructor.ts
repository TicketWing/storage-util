export class Options<T, U> {
  public cacheable: boolean;
  public cacheOptions: U | undefined;
  public dbOptions: T;

  constructor(dbOptions: T) {
    this.cacheable = false;
    this.cacheOptions = undefined;
    this.dbOptions = dbOptions;
  }
}
