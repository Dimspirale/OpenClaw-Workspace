#!/usr/bin/env bash

# HUD Hermès Ω PRIME v20.1
# Tableau de bord cockpit pour OpenClaw_Light

set -e

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

while true; do
  clear
  echo "──────────────────────────────────────────────"
  echo "        HUD Hermès Ω PRIME  v20.1"
  echo "        OpenClaw_Light — Cockpit"
  echo "──────────────────────────────────────────────"
  echo ""

  # SECTION 1 — SYSTÈME
  echo "🖥  SYSTÈME"
  echo "   Host : $(hostname)"
  echo "   User : $(whoami)"
  echo "   Uptime : $(uptime -p)"
  echo ""

  # SECTION 2 — RESSOURCES
  echo "📊 RESSOURCES"
  echo "   CPU  : $(grep 'model name' /proc/cpuinfo | head -1 | cut -d: -f2 | xargs)"
  echo "   Load : $(uptime | awk -F'load average:' '{ print $2 }' | xargs)"
  echo "   RAM  : $(free -h | awk '/Mem:/ {print $3 "/" $2}')"
  echo ""

  # SECTION 3 — GIT / COCKPIT
  echo "📁 COCKPIT / GIT"
  BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "N/A")
  STATUS=$(git status --short | wc -l)
  echo "   Branche : $BRANCH"
  echo "   Fichiers modifiés : $STATUS"
  echo ""

  # SECTION 4 — WATCHER / STABILITÉ
  echo "🛰  STABILITÉ"
  if systemctl --user is-active --quiet openclaw_watcher.service 2>/dev/null; then
    echo "   Watcher : ✅ actif"
  else
    echo "   Watcher : ❌ inactif"
  fi

  CRON_CHECK=$(crontab -l 2>/dev/null | grep -c "OpenClaw_Light/save.sh" || true)
  if [ "$CRON_CHECK" -gt 0 ]; then
    echo "   Cron auto‑save : ✅ configuré"
  else
    echo "   Cron auto‑save : ❌ absent"
  fi
  echo ""

  # SECTION 5 — DERNIER COMMIT
  echo "📜 DERNIER COMMIT"
  git log -1 --pretty=format:"   %h — %s (%cr)" 2>/dev/null || echo "   Aucun commit."
  echo ""
  echo "──────────────────────────────────────────────"
  echo "Raccourcis :"
  echo "  [S] save.sh (Smart‑Diff v2)"
  echo "  [R] rollback.sh"
  echo "  [Q] quitter le HUD"
  echo "──────────────────────────────────────────────"
  echo -n "Choix : "
  read -r choice

  case "$choice" in
    s|S)
      bash "$ROOT_DIR/save.sh"
      read -rp "Appuie sur Entrée pour revenir au HUD…"
      ;;
    r|R)
      bash "$ROOT_DIR/rollback.sh"
      read -rp "Appuie sur Entrée pour revenir au HUD…"
      ;;
    q|Q)
      clear
      exit 0
      ;;
    *)
      ;;
  esac
done
