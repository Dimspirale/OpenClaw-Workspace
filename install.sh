#!/usr/bin/env bash

set -e

echo "[OpenClaw] Installation cockpit-safe..."

# --- Vérification WSL / Linux ---
if ! grep -qi "linux" /proc/version; then
    echo "[ERREUR] OpenClaw doit être exécuté sous Linux/WSL."
    exit 1
fi

# --- Création des dossiers runtime ---
RUNTIME_DIR="cockpit/runtime"

if [ ! -d "$RUNTIME_DIR" ]; then
    echo "[OpenClaw] Création du dossier runtime..."
    mkdir -p "$RUNTIME_DIR"
fi

# --- Permissions ---
echo "[OpenClaw] Vérification des permissions..."
chmod -R 700 cockpit/runtime

# --- Installation des dépendances minimales ---
echo "[OpenClaw] Vérification des outils essentiels..."

for cmd in git jq; do
    if ! command -v $cmd >/dev/null 2>&1; then
        echo "[OpenClaw] Installation de $cmd..."
        sudo apt install -y $cmd
    fi
done

echo "[OpenClaw] Installation terminée."
