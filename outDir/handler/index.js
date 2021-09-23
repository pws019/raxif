"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@babel/core");
exports.default = (code) => {
    return new Promise((resolve) => {
        (0, core_1.transform)(code, {
            presets: [],
            plugins: [
                "@babel/plugin-syntax-jsx",
                './plugin.js'
            ]
        }, function (err, ret) {
            console.log(err);
            if (!err) {
                resolve(ret.code);
            }
        });
    });
};
//# sourceMappingURL=index.js.map