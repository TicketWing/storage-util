"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
class CustomError extends Error {
    name;
    message;
    code;
    constructor(name, msg, code) {
        super(msg);
        this.name = name;
        this.message = msg;
        this.code = code;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.CustomError = CustomError;
