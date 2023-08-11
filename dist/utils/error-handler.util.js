"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
const error_constructor_1 = require("../constructors/error.constructor");
class ErrorHandler {
    code;
    name;
    constructor(name, code) {
        this.code = code;
        this.name = name;
    }
    async handler(promise, msg) {
        try {
            const result = await promise;
            return result;
        }
        catch (error) {
            throw new error_constructor_1.ErrorConstructor(this.name, msg, this.code);
        }
    }
}
exports.ErrorHandler = ErrorHandler;
