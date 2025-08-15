const { globSync } = require("glob");
const path = require("path");
const webpack = require("webpack");

const target = "web";
const distdir = path.join(__dirname, "build", "web");

module.exports = [
  {
    // bundle used for Karma tests
    target: target,
    entry: globSync("./dist/**/*.spec.js", { dotRelative: true }).sort(),
    output: {
      asyncChunks: false,
      path: distdir,
      filename: "tests.js",
    },
    plugins: [
      new webpack.EnvironmentPlugin({
        WASMD_ENABLED: "",
      }),
      new webpack.ProvidePlugin({
        Buffer: ["buffer", "Buffer"],
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
