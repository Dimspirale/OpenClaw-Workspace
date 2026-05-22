#!/usr/bin/env bash
set -e

cd "$(dirname "$0")"

git add -A

if git diff --cached --quiet; then
  echo "🟦 Aucun changement à sauvegarder."
  exit 0
fi

bash scripts/anti_heavyfile.sh

git commit -m "auto-save $(date '+%Y-%m-%d %H:%M:%S')"
git push
