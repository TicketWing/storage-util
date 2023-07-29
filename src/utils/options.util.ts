import { Options } from "../constructors/options.constructor";
import { Conditions } from "../types/storage.types";

export class OptionsBuilder {
  private options: Options;

  constructor() {
    this.options = new Options();
  }

  setKey(key: string): OptionsBuilder {
    this.options.cacheable = true;
    this.options.key = key;
    return this;
  }

  setCacheable(cacheable: boolean): OptionsBuilder {
    this.options.cacheable = cacheable;
    return this;
  }

  setConditions(conditions: Conditions): OptionsBuilder {
    this.options.conditions = conditions;
    return this;
  }

  setSelect(select: string[]): OptionsBuilder {
    this.options.select = select;
    return this;
  }

  setReturning(returning: string[]): OptionsBuilder {
    this.options.returning = returning;
    return this;
  }

  build(): Options {
    return this.options;
  }
}
