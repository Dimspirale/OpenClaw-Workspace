#!/usr/bin/env bash

set -e

echo "[OpenClaw] Mise à jour cockpit-safe..."

# --- Vérification WSL / Linux ---
if ! grep -qi "linux" /proc/version; then
    echo "[ERREUR] OpenClaw doit être exécuté sous Linux/WSL."
    exit 1
fi

# --- Vérification de l'état Git ---
echo "[OpenClaw] Vérification de l'état du dépôt..."

if ! git diff --quiet || ! git diff --cached --quiet; then
    echo "[ATTENTION] Des modifications locales existent."
    echo "Veuillez committer ou stasher avant la mise à jour."
    exit 1
fi

# --- Pull ---
echo "[OpenClaw] Récupération des mises à jour..."
git pull --ff-only

echo "[OpenClaw] Mise à jour terminée."
