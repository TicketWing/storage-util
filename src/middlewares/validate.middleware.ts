import Joi from "joi";
import { ErrorConstructor } from "../constructors/error.constructor";
import { NextFunction, Request, Response } from "express";

export const validate =
  <T extends Joi.ObjectSchema>(schema: T) =>
  async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const { error } = schema.validate(req.body);

      if (error) {
        throw new ErrorConstructor("Validation", "Invalid input", 400);
      }

      return next();
    } catch (error) {
      next(error);
    }
  };
