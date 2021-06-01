/* eslint-disable @typescript-eslint/naming-convention */
const glob = require("glob");
const path = require("path");

const target = "web";
const demodir = path.join(__dirname, "dist", "demo");

module.exports = [
  {
    // bundle used for Ledger demo
    target: target,
    entry: glob.sync("./build/demo/web.js"),
    output: {
      path: demodir,
      filename: "ledger.js",
    },
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
