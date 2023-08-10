import { Response } from "express";
import { ErrorConstructor } from "../constructors/error.constructor";
import { ResponseConstructor } from "../constructors/response.constructor";

export const errorMiddleware = (
  err: Error | ErrorConstructor,
  _req: any,
  res: Response
) => {
  const result = new ResponseConstructor(false, err.message);
  res.status(500).json(result);
};