const { globSync } = require("glob");
const path = require("path");
const webpack = require("webpack");

const target = "web";
const bundleDir = path.join(__dirname, "build", "karma-bundle");

module.exports = [
  {
    // bundle used for Karma tests
    target: target,
    entry: globSync("./build/**/*.spec.js", { dotRelative: true }).sort(),
    output: {
      asyncChunks: false,
      path: bundleDir,
      filename: "tests.js",
    },
    plugins: [new webpack.EnvironmentPlugin({ FAUCET_ENABLED: "" })],
  },
];
