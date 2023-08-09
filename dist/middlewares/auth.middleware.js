"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const passport_1 = __importDefault(require("passport"));
const error_util_1 = require("../utils/error.util");
const authenticate = (req, res, next) => {
    passport_1.default.authenticate("jwt", { session: false }, (err, data, info) => {
        if (err) {
            return next(err);
        }
        if (!data) {
            const error = new error_util_1.CustomError("Token", "Wrong token", 401);
            return next(error);
        }
        if (info && info.name === "TokenExpiredError") {
            const error = new error_util_1.CustomError("Token", "Expired", 401);
            return next(error);
        }
        const { id, email } = data;
        req.identification = { id, email };
        next();
    })(req, res, next);
};
exports.authenticate = authenticate;
