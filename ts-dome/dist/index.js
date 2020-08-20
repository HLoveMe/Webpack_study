(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./Component/Button", "./Theme/BaseTheme", "./Base/Container"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Button_1 = require("./Component/Button");
    exports.Button = Button_1.default;
    const BaseTheme_1 = require("./Theme/BaseTheme");
    exports.BaseTheme = BaseTheme_1.BaseTheme;
    const Container_1 = require("./Base/Container");
    exports.Container = Container_1.default;
});
