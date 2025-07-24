const packageJson = require("./package.json");

module.exports = {
  entryPoints: ["./src"],
  out: "docs",
  exclude: ["**/*.spec.ts", "./src/demo"],
  name: `${packageJson.name} Documentation`,
  readme: "README.md",
  excludeExternals: true,
  excludePrivate: true,
};
