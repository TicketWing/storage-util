"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseConstructor = void 0;
class ResponseConstructor {
    success;
    message;
    data;
    constructor(success, message, data = null) {
        this.success = success;
        this.message = message;
        this.data = data;
    }
    static success(data) {
        return new ResponseConstructor(true, "Success", data);
    }
    static error(message) {
        return new ResponseConstructor(false, message);
    }
}
exports.ResponseConstructor = ResponseConstructor;
