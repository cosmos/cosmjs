#!/bin/bash
set -o errexit -o nounset -o pipefail
command -v shellcheck >/dev/null && shellcheck "$0"

version="latest"
out_dir="./docs_deployment"
assets_dir="$out_dir/assets"
index="$out_dir/index.html"

[ -d "$out_dir" ] && rm -r "$out_dir"
mkdir -p "$out_dir"

# assets
mkdir -p "$assets_dir"
cp docs/cosmjs-tree.png "$assets_dir"

{
  echo '<h1>CosmJS documentation</h1>'
  echo '<p>CosmJS is a modular library consisting of multiple packages that are organized like this:</p>'
  echo '<p><a href="assets/cosmjs-tree.png"><img alt="CosmJS dependency graph" src="assets/cosmjs-tree.png" style="max-width: 100%; width: 950px" /></a></p>'
  echo '<h2>Package documentation</h2>'
  echo '<p>The following packages can be used as libraries.</p>'
  echo '<ul>'
} >"$index"

for package_dir in ./packages/*/; do
  package_basename="$(basename "$package_dir")"
  package_name="$(jq -r .name <"$package_dir"/package.json)"
  package_docs_src="$(realpath "$package_dir")/docs"
  package_docs_dest="$out_dir/$version/$package_basename"

  if [ -d "$package_docs_src" ]; then
    mkdir -p "$package_docs_dest"
    echo "$package_basename: $package_docs_src -> $package_docs_dest"
    cp -R "$package_docs_src/"* "$package_docs_dest"

    echo "  <li><a href='./latest/$package_basename/index.html'>$package_name</a></li>" >>"$index"
  fi
done

{
  echo '</ul>'
  echo '<hr>'
  echo '<footer>'
  echo '  <a href="https://github.com/cosmos/cosmjs">CosmJS on GitHub</a>'
  echo '</footer>'
} >>"$index"
