"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorConstructor = void 0;
class ErrorConstructor extends Error {
    name;
    message;
    code;
    constructor(name, msg, code) {
        super(msg);
        this.name = name;
        this.message = msg;
        this.code = code;
        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.ErrorConstructor = ErrorConstructor;
