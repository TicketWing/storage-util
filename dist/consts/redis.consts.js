"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.failedStatuses = exports.successStatuses = void 0;
const successStatuses = ["connecting", "connected", "connect", "reconnecting"];
exports.successStatuses = successStatuses;
const failedStatuses = ["disconnected", "end", "error", "close"];
exports.failedStatuses = failedStatuses;
