(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "react", "react", "react-native"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const React = require("react");
    const react_1 = require("react");
    const react_native_1 = require("react-native");
    class Button extends react_1.Component {
        constructor(ops) {
            super(ops);
        }
        render() {
            return (React.createElement(react_native_1.TouchableOpacity, Object.assign({}, this.props),
                React.createElement(react_native_1.Text, null, "AA")));
        }
    }
    exports.default = Button;
});
