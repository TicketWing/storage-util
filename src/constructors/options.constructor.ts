export class Options<T, U> {
  public cacheOptions: U | undefined;
  public dbOptions: T;

  constructor(dbOptions: T) {
    this.cacheOptions = undefined;
    this.dbOptions = dbOptions;
  }
}
