#!/bin/bash

# https://buildkite.com/docs/pipelines/defining-steps#dynamic-pipelines

set -eu

RAW_PIPELINES=""

for f in $(ls .buildkite/pipelines/*.json); do
  export RAW_PIPELINES="$RAW_PIPELINES$(cat $f)"
done

echo "$RAW_PIPELINES" | jq '.[]' | jq -s | sed "s/\$BILDKITE_COMMIT/${BILDKITE_COMMIT}/"