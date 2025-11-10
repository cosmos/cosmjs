import js from "@eslint/js";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import importt from "eslint-plugin-import";
// eslint-disable-next-line import/extensions
import prettier from "eslint-plugin-prettier/recommended";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";

export default [
  {
    ignores: [".*", "packages/*/build/", "packages/*/dist/", "packages/*/docs/", "packages/*/examples/"],
  },
  js.configs.recommended,
  prettier,
  importt.flatConfigs.recommended,
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },

    languageOptions: {
      globals: {
        ...globals.jasmine,
        ...globals.node,
        ...globals.worker,
      },

      ecmaVersion: 2022,
    },

    settings: {
      "import/resolver": {
        typescript: {},
      },
    },

    rules: {
      curly: ["warn", "multi-line", "consistent"],
      "no-bitwise": "warn",

      "no-console": [
        "warn",
        {
          allow: ["error", "info", "table", "warn"],
        },
      ],

      "no-param-reassign": "warn",
      "prefer-const": "warn",
      radix: ["warn", "always"],

      "spaced-comment": [
        "warn",
        "always",
        {
          line: {
            markers: ["/ <reference"],
          },
        },
      ],

      "import/extensions": ["warn", "ignorePackages"],

      "simple-import-sort/imports": "warn",
      "simple-import-sort/exports": "warn",
    },
  },
  { files: ["**/*.ts"], ...importt.flatConfigs.typescript },
  ...typescriptEslint.configs["flat/strict-type-checked"].map((c) => ({ files: ["**/*.ts"], ...c })),
  {
    files: ["**/*.ts"],

    languageOptions: {
      ecmaVersion: 2022,

      parserOptions: {
        project: true,
      },
    },

    rules: {
      "no-shadow": "off",
      "no-unused-vars": "off",

      // lints from 'strict-type-checked' config
      "@typescript-eslint/no-deprecated": "off",
      "@typescript-eslint/no-extraneous-class": "off",
      "@typescript-eslint/no-unnecessary-condition": "off",
      "@typescript-eslint/use-unknown-in-catch-callback-variable": "off",

      "@typescript-eslint/array-type": [
        "warn",
        {
          default: "array-simple",
        },
      ],

      "@typescript-eslint/consistent-type-exports": "warn",

      "@typescript-eslint/explicit-function-return-type": [
        "warn",
        {
          allowExpressions: true,
        },
      ],

      "@typescript-eslint/explicit-member-accessibility": "warn",

      "@typescript-eslint/explicit-module-boundary-types": "warn",

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
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-misused-promises": "off",
      "@typescript-eslint/no-redundant-type-constituents": "off",
      "@typescript-eslint/no-shadow": "warn",
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-return": "off",

      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
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
    files: ["**/*.spec.ts"],

    rules: {
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/require-await": "off",
    },
  },
];
