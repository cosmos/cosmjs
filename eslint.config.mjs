import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import importt from "eslint-plugin-import";
import prettier from "eslint-plugin-prettier/recommended";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import * as espree from "espree";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: ["packages/*/build/", "packages/*/dist/", "packages/*/docs/", "packages/*/examples/"],
  },
  js.configs.recommended,
  prettier,
  // importt.flatConfigs.recommended,
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
      import: fixupPluginRules(importt),
    },

    languageOptions: {
      globals: {
        ...globals.jasmine,
        ...globals.node,
        ...globals.worker,
      },

      parser: espree,
      ecmaVersion: 2022,
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
      "no-shadow": "off",
      "no-unused-vars": "off",
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

      "import/no-cycle": "off",
      "import/no-named-as-default-member": "off",
      "simple-import-sort/imports": "warn",
      "simple-import-sort/exports": "warn",
    },
  },
  {
    files: ["**/*.ts"],

    plugins: {
      "@typescript-eslint": fixupPluginRules(typescriptEslint),
    },

    ...typescriptEslint.configs.recommendedTypeChecked,

    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2022,
      sourceType: "script",

      parserOptions: {
        project: true,
      },
    },

    rules: {
      ...importt.flatConfigs.typescript.rules,
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
