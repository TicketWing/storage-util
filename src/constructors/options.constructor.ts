import { Conditions } from "../types/storage.types";

export class Options {
  public key: string | undefined;
  public cacheable: boolean;
  public conditions: Conditions;
  public select: string[];
  public returning: string[];

  constructor() {
    this.key = undefined;
    this.cacheable = false;
    this.conditions = {};
    this.select = [];
    this.returning = [];
  }
}
