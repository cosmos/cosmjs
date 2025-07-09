// Use one config file at monorepo root for all workspaces.
// https://eslint.org/docs/v8.x/use/configure/configuration-files#cascading-and-hierarchy

module.exports = {
  root: true,
  env: {
    es6: true,
    jasmine: true,
    node: true,
    worker: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2022,
    project: true,
  },
  plugins: ["@typescript-eslint", "prettier", "simple-import-sort", "import"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:prettier/recommended",
    "plugin:import/typescript",
  ],
  rules: {
    curly: ["warn", "multi-line", "consistent"],
    "no-bitwise": "warn",
    "no-console": ["warn", { allow: ["error", "info", "table", "warn"] }],
    "no-param-reassign": "warn",
    "no-shadow": "off", // disabled in favour of @typescript-eslint/no-shadow, see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-shadow.md
    "no-unused-vars": "off", // disabled in favour of @typescript-eslint/no-unused-vars, see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unused-vars.md
    "prefer-const": "warn",
    radix: ["warn", "always"],
    "spaced-comment": ["warn", "always", { line: { markers: ["/ <reference"] } }],
    "import/no-cycle": "warn",
    "simple-import-sort/imports": "warn",
    "simple-import-sort/exports": "warn",
    "@typescript-eslint/array-type": ["warn", { default: "array-simple" }],
    "@typescript-eslint/consistent-type-exports": "error",
    "@typescript-eslint/explicit-function-return-type": ["warn", { allowExpressions: true }],
    "@typescript-eslint/explicit-member-accessibility": "warn",
    "@typescript-eslint/naming-convention": [
      "warn",
      {
        selector: "default",
        format: ["strictCamelCase"],
      },
      {
        selector: "typeLike",
        format: ["StrictPascalCase"],
      },
      {
        selector: "enumMember",
        format: ["StrictPascalCase"],
      },
      {
        selector: "variable",
        format: ["strictCamelCase"],
        leadingUnderscore: "allow",
      },
      {
        selector: "parameter",
        format: ["strictCamelCase"],
        leadingUnderscore: "allow",
      },
      {
        // For object literal keys we want to allow things like numbers (e.g. 35),
        // type URLs (e.g. "/cosmos.feegrant.v1beta1.MsgGrantAllowance") or test data (e.g. "0.14ucoin2")
        selector: "objectLiteralProperty",
        format: null,
      },
    ],
    "@typescript-eslint/no-dynamic-delete": "warn",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/parameter-properties": "warn",
    "@typescript-eslint/no-shadow": "warn",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_", caughtErrorsIgnorePattern: "^_" },
    ],
    "@typescript-eslint/no-use-before-define": "warn",
    "@typescript-eslint/prefer-readonly": "warn",
  },
  overrides: [
    {
      files: "**/*.js",
      parser: "espree",
      parserOptions: { ecmaVersion: 2022 },
      rules: {
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/consistent-type-exports": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-member-accessibility": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/naming-convention": "off",
        "@typescript-eslint/prefer-readonly": "off",
      },
    },
    {
      files: "**/*.spec.ts",
      rules: {
        "@typescript-eslint/no-non-null-assertion": "off",
      },
    },
  ],
};
