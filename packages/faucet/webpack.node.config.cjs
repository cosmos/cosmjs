const path = require("path");

const target = "node";
const distdir = path.join(__dirname, "build", target);

module.exports = [
  {
    target: target,
    entry: "./dist/cli.js",
    output: {
      asyncChunks: false,
      path: distdir,
      filename: "cli.js",
      library: {
        type: "commonjs",
      },
    },
    plugins: [],
    resolve: {},
  },
];
