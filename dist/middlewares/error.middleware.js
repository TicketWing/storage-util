"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const response_constructor_1 = require("../constructors/response.constructor");
const errorMiddleware = (err, _req, res) => {
    const result = new response_constructor_1.ResponseConstructor(false, err.message);
    res.status(500).json(result);
};
exports.errorMiddleware = errorMiddleware;
