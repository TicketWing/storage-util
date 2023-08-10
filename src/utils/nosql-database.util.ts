import mongoose from "mongoose";
import { ErrorHandler } from "./error-handler.util";
import {
  DeleteDBOptions,
  GetDBOptions,
  InsertDBOptions,
  UpdateDBOptions,
} from "../types/database.types";

export class NoSQLDatabaseUtil extends ErrorHandler {
  private model: mongoose.Model<any>;

  constructor(model: mongoose.Model<any>) {
    super("Database", 501);
    this.model = model;
  }

  private returning<T>(obj: T, fields: string[]) {
    const result: any = {};

    for (const field in obj) {
      if (fields.includes(field)) {
        result[field] = obj[field];
      }
    }

    return result;
  }

  async get(options: GetDBOptions) {
    const { select, where } = options;
    const record = await this.model.findOne(where).select(select);
    return record;
  }

  async insert<T>(data: T, options: InsertDBOptions) {
    const { returning } = options;
    const query = this.model.create(data);
    const inserted = await this.handler(query, "INSERT Error");
    const sorted = this.returning(inserted, returning);
    return sorted;
  }

  async update<T>(data: T, options: UpdateDBOptions) {
    const update = { $set: data as any };
    const query = this.model.findOneAndUpdate<T>(options.where, update);
    const result = await this.handler(query, "UPDATE Error");
    return result;
  }

  async delete(options: DeleteDBOptions) {
    const query = this.model.findOneAndDelete(options.where);
    await this.handler(query, "DELETE Error");
  }
}
