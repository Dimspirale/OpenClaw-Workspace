#!/usr/bin/env bash
# Hermès Ω PRIME+++ v20.5 — Black‑Room Edition
# Mode Shadow‑Ops Intelligent — Auto‑Path Indestructible

# ROOT ABSOLU FIABLE À 100%
HUD_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$HUD_DIR/.."

while true; do
  clear

  # Transparence adaptative
  OPACITY=$(bash "$HUD_DIR/modules/opacity.sh")
  echo -ne "\033]11;rgba(0,0,0,$OPACITY)\007"

  echo -e "\e[38;5;240m──────────────────────────────────────────────"
  echo -e "        HUD Hermès Ω PRIME+++  v20.5 — BLACK‑ROOM"
  echo -e "        OpenClaw_Light — Shadow‑Ops Cockpit"
  echo -e "──────────────────────────────────────────────\e[0m"
  echo ""

  echo -e "\e[38;5;240m📊 RESSOURCES\e[0m"
  bash "$HUD_DIR/modules/cpu.sh"
  bash "$HUD_DIR/modules/ram.sh"
  bash "$HUD_DIR/modules/gpu.sh"
  echo ""

  echo -e "\e[38;5;240m🌐 RÉSEAU\e[0m"
  bash "$HUD_DIR/modules/net.sh"
  echo ""

  echo -e "\e[38;5;240m⚠️  RISQUES COCKPIT\e[0m"
  bash "$HUD_DIR/modules/risks.sh"
  echo ""

  echo -e "\e[38;5;240m📜 TIMELINE\e[0m"
  bash "$HUD_DIR/modules/timeline.sh"
  echo ""

  echo -e "\e[38;5;240m🧩 MODULES A1‑A22\e[0m"
  bash "$HUD_DIR/modules/modules_status.sh"
  echo ""

  echo -e "\e[38;5;240m──────────────────────────────────────────────\e[0m"
  echo "Raccourcis :"
  echo "  [S] save.sh"
  echo "  [R] rollback.sh"
  echo "  [Q] quitter"
  echo -e "\e[38;5;240m──────────────────────────────────────────────\e[0m"
  echo -n "Choix : "

  read -r CHOICE
  case "$CHOICE" in
    S|s) bash "$HUD_DIR/save.sh" ;;
    R|r) bash "$HUD_DIR/rollback.sh" ;;
    Q|q) exit 0 ;;
  esac
done
