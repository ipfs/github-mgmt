#!/usr/bin/env bash

set -e
set -u
set -o pipefail

root="$(realpath "$(dirname "$0")/..")"

repository_file="$(jq '.' "$root/github/ipfs/repository_file.json")"

while read repository; do
  echo "Checking if $repository has stale.yml already"
  has_stale="$(jq '.[$repository] | .[".github/workflows/stale.yml"] | . != null' --arg repository "$repository" <<< "$repository_file")"
  if [[ "$has_stale" == 'true' ]]; then
    echo "stale.yml already exists in $repository, skipping"
  else
    echo "Checking if $repository has either needs/author-input or hints/needs-author-input label"
    if gh api repos/ipfs/$repository/labels/need/author-input > /dev/null 2>&1 || gh api repos/ipfs/$repository/labels/hint/needs-author-input > /dev/null 2>&1; then
      echo "Found label in $repository, adding stale.yml"
      repository_file="$(jq '.[$repository] +=  { ".github/workflows/stale.yml": { "content": "./.github/workflows/stale.yml" } }' --arg repository "$repository" <<< "$repository_file")"
    else
      echo "No label found in $repository, skipping"
    fi
  fi
done <<< "$(jq -r 'keys | .[]' "$root/github/ipfs/repository.json")"

echo "Saving new repository_file configuration"
jq '.' <<< "$repository_file" > "$root/github/ipfs/repository_file.json"
