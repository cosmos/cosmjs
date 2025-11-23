const { globSync } = require("glob");
const path = require("path");

const target = "web";
const bundleDir = path.join(__dirname, "build", "karma-bundle");

module.exports = [
  {
    // bundle for WebWorker tests
    target: target,
    entry: "./build/workers/dummyservice.worker.js",
    output: {
      asyncChunks: false,
      path: bundleDir,
      filename: "dummyservice.worker.js",
    },
  },
  {
    // bundle used for Karma tests
    target: target,
    entry: globSync("./build/**/*.spec.js", { dotRelative: true }).sort(),
    output: {
      asyncChunks: false,
      path: bundleDir,
      filename: "tests.js",
    },
  },
];
