#!/bin/bash
set -o errexit -o nounset -o pipefail
command -v shellcheck > /dev/null && shellcheck "$0"

TMP_DIR="./tmp"
JS_SOURCE_FILE="$TMP_DIR/codecimpl.js"
DEFINITIONS_FILE="$TMP_DIR/codecimpl.d.ts"
OUTPUT_DIR="./src/generated/"


pbts "$JS_SOURCE_FILE" -o "$DEFINITIONS_FILE"
tsc --removeComments --outDir "$OUTPUT_DIR" --allowJs "$JS_SOURCE_FILE"
cp "$DEFINITIONS_FILE" "$OUTPUT_DIR"
rm "$DEFINITIONS_FILE" "$JS_SOURCE_FILE"
