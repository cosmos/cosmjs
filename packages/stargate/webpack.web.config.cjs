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
    plugins: [
      new webpack.EnvironmentPlugin({
        SIMAPP47_ENABLED: "",
        SLOW_SIMAPP47_ENABLED: "",
        SIMAPP50_ENABLED: "",
        SLOW_SIMAPP50_ENABLED: "",
      }),
    ],
    resolve: {
      fallback: {
        buffer: false,
        crypto: false,
        events: false,
        path: false,
        stream: false,
        string_decoder: false,
      },
    },
  },
];
