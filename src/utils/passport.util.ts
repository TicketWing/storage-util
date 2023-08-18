import { PassportStatic } from "passport";
import {
  Strategy,
  ExtractJwt,
  StrategyOptions,
  VerifiedCallback,
} from "passport-jwt";
import { ErrorConstructor } from "../constructors/error.constructor";
import { Identification } from "../types/passport.types";


const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "secret",
};

export const applyPassportStrategy = (passport: PassportStatic) => {
  passport.use(
    new Strategy(
      options,
      async (data: Identification, done: VerifiedCallback) => {
        try {
          if (data.id) {
            return done(null, data);
          }
          return done(null, false);
        } catch (e) {
          throw new ErrorConstructor("Token", "Invalid token", 501);
        }
      }
    )
  );
};
