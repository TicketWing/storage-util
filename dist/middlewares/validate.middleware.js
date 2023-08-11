"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const error_constructor_1 = require("../constructors/error.constructor");
const validate = (schema) => async (req, _res, next) => {
    try {
        const { error } = schema.validate(req.body);
        if (error) {
            throw new error_constructor_1.ErrorConstructor("Validation", "Invalid input", 400);
        }
        return next();
    }
    catch (error) {
        next(error);
    }
};
exports.validate = validate;
