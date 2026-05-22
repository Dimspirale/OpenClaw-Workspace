#!/usr/bin/env bash
cd "$(dirname "$0")"
while true; do
  if ! git diff --quiet; then
    echo "⚠ Modification détectée à $(date)"
  fi
  sleep 5
done
