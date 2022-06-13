#!/usr/bin/env bash

set -e
set -u
set -o pipefail

root="$(realpath "$(dirname "$0")/..")"

repository_file="$(jq '.' "$root/github/ipfs/repository_file.json")"

while read repository; do
  echo "Checking if $repository has need/author-input label already"
  if ! gh api repos/ipfs/$repository/labels/need/author-input > /dev/null 2>&1; then
    echo "Adding label need/author-input to $repository"
    gh api -X POST repos/ipfs/$repository/labels -f name='need/author-input' -f color='ededed' -f description='Needs input from the original author' > /dev/null || true
  fi
done <<< "$(jq -r 'keys | .[]' "$root/github/ipfs/repository.json")"
