"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionsBuilder = void 0;
const options_constructor_1 = require("../constructors/options.constructor");
class OptionsBuilder {
    options;
    constructor(queries) {
        this.options = new options_constructor_1.Options(queries);
    }
    setCacheOptions(options) {
        this.options.cacheOptions = options;
        return this;
    }
    build() {
        return this.options;
    }
}
exports.OptionsBuilder = OptionsBuilder;
