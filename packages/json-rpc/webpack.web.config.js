const { globSync } = require("glob");
const path = require("path");

const target = "web";
const distdir = path.join(__dirname, "dist", "web");

module.exports = [
  {
    // bundle for WebWorker tests
    target: target,
    entry: "./build/workers/dummyservice.worker.js",
    output: {
      path: distdir,
      filename: "dummyservice.worker.js",
    },
  },
  {
    // bundle used for Karma tests
    target: target,
    entry: globSync("./build/**/*.spec.js", { dotRelative: true }).sort(),
    output: {
      path: distdir,
      filename: "tests.js",
    },
  },
];
