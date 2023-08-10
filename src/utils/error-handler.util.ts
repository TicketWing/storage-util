import { ErrorConstructor } from "../constructors/error.constructor";

export class ErrorHandler {
  private code: number;
  private name: string;

  constructor(name: string, code: number) {
    this.code = code;
    this.name = name;
  }

  async handler<T>(promise: Promise<T>, msg: string): Promise<T> {
    try {
      const result = await promise;
      return result;
    } catch (error) {
      throw new ErrorConstructor(this.name, msg, this.code);
    }
  }
}
