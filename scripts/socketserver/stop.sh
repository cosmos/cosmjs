#!/bin/bash
set -o errexit -o nounset -o pipefail
command -v shellcheck >/dev/null && shellcheck "$0"

echo "Killing socketserver containers ..."
docker container kill "socketserver-default" "socketserver-slow"
