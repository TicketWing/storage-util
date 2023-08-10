import passport from "passport";
import { NextFunction, Response } from "express";
import { Identification } from "../types/middlewares.types";
import { ErrorConstructor } from "../constructors/error.constructor";

export const authenticate = (req: any, res: Response, next: NextFunction) => {
  passport.authenticate(
    "jwt",
    { session: false },
    (err: Error, data: Identification, info: any) => {
      if (err) {
        return next(err);
      }

      if (!data) {
        const error = new ErrorConstructor("Token", "Wrong token", 401);
        return next(error);
      }

      if (info && info.name === "TokenExpiredError") {
        const error = new ErrorConstructor("Token", "Expired", 401);
        return next(error);
      }

      const { id, email } = data;
      req.identification = { id, email };
      next();
    }
  )(req, res, next);
};
