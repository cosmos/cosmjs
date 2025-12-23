const path = require("path");

const cliBundleDir = path.join(__dirname, "build", "cli-bundle");

module.exports = [
  {
    target: "node",
    entry: "./build/cli.js",
    output: {
      asyncChunks: false,
      path: cliBundleDir,
      filename: "cli.js",
      library: {
        type: "commonjs",
      },
    },
    plugins: [],
    resolve: {},
  },
];
