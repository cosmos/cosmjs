const glob = require("glob");
const path = require("path");

const target = "web";
const distdir = path.join(__dirname, "dist", "web");

module.exports = [
  {
    // bundle used for Karma tests
    target: target,
    entry: glob.sync("./build/**/*.spec.js"),
    output: {
      path: distdir,
      filename: "tests.js",
    },
    resolve: {
      fallback: {
        crypto: require.resolve("crypto-browserify"),
        path: require.resolve("path-browserify"),
        stream: require.resolve("stream-browserify"),
      },
    },
  },
];
