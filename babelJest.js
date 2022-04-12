const babel = require("babel-jest");

module.exports = babel.default.createTransformer({
    presets: ["@babel/preset-env"],
});
