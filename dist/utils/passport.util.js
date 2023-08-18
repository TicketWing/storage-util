"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyPassportStrategy = void 0;
const passport_jwt_1 = require("passport-jwt");
const error_constructor_1 = require("../constructors/error.constructor");
const options = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "secret",
};
const applyPassportStrategy = (passport) => {
    passport.use(new passport_jwt_1.Strategy(options, async (data, done) => {
        try {
            if (data.id) {
                return done(null, data);
            }
            return done(null, false);
        }
        catch (e) {
            throw new error_constructor_1.ErrorConstructor("Token", "Invalid token", 501);
        }
    }));
};
exports.applyPassportStrategy = applyPassportStrategy;
