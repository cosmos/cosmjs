// Use one config file at monorepo root for all workspaces.
// https://eslint.org/docs/v8.x/use/configure/configuration-files#cascading-and-hierarchy

module.exports = {
  ignorePatterns: ["packages/*/build/", "packages/*/docs/", "packages/*/examples/"],
  root: true,
  env: {
    es6: true,
    jasmine: true,
    node: true,
    worker: true,
  },
  parser: "espree",
  parserOptions: { ecmaVersion: 2022 },
  plugins: ["prettier", "simple-import-sort", "import"],
  extends: ["eslint:recommended", "prettier", "plugin:prettier/recommended", "plugin:import/recommended"],
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
  },
  overrides: [
    {
      files: "**/*.ts",
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaVersion: 2022,
        project: true,
      },
      plugins: ["@typescript-eslint"],
      extends: ["plugin:@typescript-eslint/recommended-type-checked", "plugin:import/typescript"],
      rules: {
        "@typescript-eslint/array-type": ["warn", { default: "array-simple" }],
        "@typescript-eslint/consistent-type-exports": "warn",
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
        "@typescript-eslint/no-empty-object-type": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-misused-promises": "off",
        "@typescript-eslint/no-redundant-type-constituents": "off",
        "@typescript-eslint/no-shadow": "warn",
        "@typescript-eslint/no-unsafe-argument": "off",
        "@typescript-eslint/no-unsafe-assignment": "off",
        "@typescript-eslint/no-unsafe-call": "off",
        "@typescript-eslint/no-unsafe-enum-comparison": "off",
        "@typescript-eslint/no-unsafe-member-access": "off",
        "@typescript-eslint/no-unsafe-return": "off",
        "@typescript-eslint/no-unused-vars": [
          "warn",
          { argsIgnorePattern: "^_", varsIgnorePattern: "^_", caughtErrorsIgnorePattern: "^_" },
        ],
        "@typescript-eslint/no-use-before-define": "warn",
        "@typescript-eslint/parameter-properties": "warn",
        "@typescript-eslint/prefer-promise-reject-errors": "off",
        "@typescript-eslint/prefer-readonly": "warn",
        "@typescript-eslint/require-await": "off",
        "@typescript-eslint/restrict-template-expressions": "off",
        "@typescript-eslint/unbound-method": "off",
      },
    },
    {
      files: "**/*.spec.ts",
      rules: {
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/require-await": "off",
      },
    },
  ],
};
