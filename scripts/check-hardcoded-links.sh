#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

readonly BLOCKED_PATTERNS=(
  "moonjaehyun.github.io"
  "MoonJaehyun.github.io"
  "chaelin0722"
)

readonly TARGETS=(
  "_config.yml"
  "_data"
  "_pages"
  "_posts"
  "_includes"
  "_layouts"
  "assets/css"
  "assets/js"
  "robots.txt"
  "index.html"
  "README.md"
  "disqus.html"
)

echo "Running hardcoded link checks..."

for pattern in "${BLOCKED_PATTERNS[@]}"; do
  if rg -n --hidden \
    --glob '!docs/**' \
    --glob '!assets/js/vendor/**' \
    --glob '!assets/js/lunr/**' \
    "$pattern" "${TARGETS[@]}"; then
    echo "Error: blocked pattern found ($pattern)" >&2
    exit 1
  fi
done

echo "Hardcoded link checks passed."
