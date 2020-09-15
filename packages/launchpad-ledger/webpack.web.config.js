const glob = require("glob");
const path = require("path");
// const webpack = require("webpack");

const target = "web";
// const distdir = path.join(__dirname, "dist", "web");
const demodir = path.join(__dirname, "dist", "demo");

module.exports = [
  // {
  //   // bundle used for Karma tests
  //   target: target,
  //   entry: glob.sync("./build/**/*.spec.js"),
  //   output: {
  //     path: distdir,
  //     filename: "tests.js",
  //   },
  //   plugins: [new webpack.EnvironmentPlugin(["WASMD_ENABLED"])],
  // },
  {
    // bundle used for Ledger demo
    target: target,
    entry: glob.sync("./build/demo/index.js"),
    output: {
      path: demodir,
      filename: "ledger.js",
    },
  },
];
