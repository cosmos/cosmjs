const { globSync } = require("glob");
const path = require("path");
const webpack = require("webpack");

const target = "web";
const demodir = path.join(__dirname, "build", "demo");

module.exports = [
  {
    // bundle used for Ledger demo
    target: target,
    entry: globSync("./build/demo/web.js"),
    output: {
      asyncChunks: false,
      path: demodir,
      filename: "ledger.js",
    },
    plugins: [
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
