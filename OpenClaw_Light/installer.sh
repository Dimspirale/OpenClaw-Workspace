#!/usr/bin/env bash

echo "──────────────────────────────────────────────"
echo "     INSTALLATEUR OpenClaw_Light v19.1"
echo "     Mode : WSL + OneDrive + GitHub (C)"
echo "──────────────────────────────────────────────"
echo ""

TARGET="$HOME/OpenClaw_Light"
BACKUP="/mnt/c/Users/dimitri/OneDrive/Documents/OpenClaw_Light"
REPO_URL="https://github.com/Dimspirale/OpenClaw_Light.git"
LOG="install_log_$(date +%Y%m%d_%H%M%S).txt"

echo "Installation dans : $TARGET" | tee -a $LOG
echo "Sauvegarde OneDrive : $BACKUP" | tee -a $LOG
echo "Repo GitHub : $REPO_URL" | tee -a $LOG
echo "" | tee -a $LOG

section() {
  echo "" | tee -a $LOG
  echo "── $1" | tee -a $LOG
}

section "1. Vérification du dossier cible"
if [ ! -d "$TARGET" ]; then
  echo "✘ Dossier introuvable : $TARGET" | tee -a $LOG
  exit 1
else
  echo "✔ Dossier détecté" | tee -a $LOG
fi

section "2. Création du point de rollback"
cp -r "$TARGET" "$TARGET.rollback_$(date +%Y%m%d_%H%M%S)"
echo "✔ Rollback créé" | tee -a $LOG

section "3. Mise à jour des dépendances"
if command -v pnpm >/dev/null 2>&1; then
  cd "$TARGET"
  pnpm install | tee -a $LOG
  echo "✔ Dépendances mises à jour" | tee -a $LOG
else
  echo "✘ pnpm introuvable" | tee -a $LOG
fi

section "4. Sauvegarde intelligente OneDrive"
mkdir -p "$BACKUP"

rsync -av --delete \
  --exclude "node_modules" \
  --exclude ".git" \
  --exclude "builds" \
  --exclude "system/cache" \
  "$TARGET/" "$BACKUP/" | tee -a $LOG

echo "✔ Sauvegarde OneDrive terminée" | tee -a $LOG

section "5. Sauvegarde GitHub intelligente"
cd "$TARGET"

if [ ! -d ".git" ]; then
  echo "Initialisation du repo Git…" | tee -a $LOG
  git init
  git remote add origin "$REPO_URL"
fi

git add -A

if git diff --cached --quiet; then
  echo "✔ Aucun changement à sauvegarder sur GitHub" | tee -a $LOG
else
  COMMIT_MSG="Auto‑backup v19.1 $(date)"
  git commit -m "$COMMIT_MSG" | tee -a $LOG
  git branch -M main
  git push -u origin main | tee -a $LOG
  echo "✔ Sauvegarde GitHub effectuée" | tee -a $LOG
fi

section "6. Finalisation"
echo "✔ Installation terminée" | tee -a $LOG
echo "✔ Log : $LOG" | tee -a $LOG

echo ""
echo "──────────────────────────────────────────────"
echo "INSTALLATION TERMINÉE — OpenClaw_Light v19.1"
echo "──────────────────────────────────────────────"
