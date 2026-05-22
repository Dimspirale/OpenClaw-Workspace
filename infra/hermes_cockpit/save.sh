#!/usr/bin/env bash

# --- HERMÈS SAVE SEQUENCE -----------------------------------------
# Sauvegarde cockpit-grade : commit + push en un seul ordre

set -e

cd "$(dirname "$0")"

# Vérifier s'il y a des changements
if git diff --quiet && git diff --cached --quiet; then
    echo "🟦 Aucun changement à sauvegarder."
    exit 0
fi

# Commit auto avec timestamp
msg="auto-save $(date '+%Y-%m-%d %H:%M:%S')"
git add -A
git commit -m "$msg"

# Push
git push

echo "🟩 Sauvegarde terminée : $msg"
