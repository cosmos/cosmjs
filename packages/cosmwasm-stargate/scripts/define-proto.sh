#!/bin/bash
set -o errexit -o nounset -o pipefail
command -v shellcheck >/dev/null && shellcheck "$0"

TMP_DIR="./tmp"
JS_SOURCE_FILE="$TMP_DIR/codecimpl.js"
DEFINITIONS_FILE="$TMP_DIR/codecimpl.d.ts"
OUTPUT_DIR="./src/codec/generated/"

yarn pbts "$JS_SOURCE_FILE" -o "$DEFINITIONS_FILE"
# Remove comments after using them for the .d.ts
# Note "When input files are specified on the command line, tsconfig.json files are ignored." (https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)
yarn tsc --removeComments --target es2017 --module commonjs --outDir "$OUTPUT_DIR" --allowJs "$JS_SOURCE_FILE"

cp "$DEFINITIONS_FILE" "$OUTPUT_DIR"
rm "$DEFINITIONS_FILE" "$JS_SOURCE_FILE"
