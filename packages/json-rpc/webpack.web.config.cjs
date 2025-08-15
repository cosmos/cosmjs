const { globSync } = require("glob");
const path = require("path");

const target = "web";
const distdir = path.join(__dirname, "build", "web");

module.exports = [
  {
    // bundle for WebWorker tests
    target: target,
    entry: "./dist/workers/dummyservice.worker.js",
    output: {
      asyncChunks: false,
      path: distdir,
      filename: "dummyservice.worker.js",
    },
  },
  {
    // bundle used for Karma tests
    target: target,
    entry: globSync("./dist/**/*.spec.js", { dotRelative: true }).sort(),
    output: {
      asyncChunks: false,
      path: distdir,
      filename: "tests.js",
    },
  },
];
