#!/usr/bin/env bash

echo "──────────────────────────────────────────────"
echo "     PRE‑SCAN SYSTÈME — OpenClaw_Light"
echo "     Mode : READ‑ONLY / SAFE / COCKPIT‑GRADE"
echo "──────────────────────────────────────────────"
echo ""

REPORT="pre_scan_report.txt"
echo "Pré‑scan lancé : $(date)" > $REPORT
echo "" >> $REPORT

section() {
  echo "" | tee -a $REPORT
  echo "── $1" | tee -a $REPORT
}

check() {
  local name="$1"
  local cmd="$2"
  local version_cmd="$3"

  if command -v $cmd >/dev/null 2>&1; then
    echo "✔ $name détecté" | tee -a $REPORT
    if [ ! -z "$version_cmd" ]; then
      echo "   Version : $($version_cmd 2>/dev/null)" | tee -a $REPORT
    fi
  else
    echo "✘ $name manquant" | tee -a $REPORT
  fi
}

section "SYSTÈME"
echo "OS : $(lsb_release -ds)" | tee -a $REPORT
echo "Kernel : $(uname -r)" | tee -a $REPORT
echo "WSL : $(grep -i microsoft /proc/version >/dev/null && echo 'Oui' || echo 'Non')" | tee -a $REPORT

section "RESSOURCES"
echo "RAM totale : $(grep MemTotal /proc/meminfo | awk '{print $2/1024 " MB"}')" | tee -a $REPORT
echo "Espace disque : $(df -h / | awk 'NR==2 {print $4 " libres"}')" | tee -a $REPORT

section "OUTILS REQUIS"
check "Git" git "git --version"
check "Node.js" node "node -v"
check "Corepack" corepack "corepack --version"
check "pnpm" pnpm "pnpm -v"
check "Python3" python3 "python3 --version"
check "pip" pip3 "pip3 --version"
check "venv" python3 "python3 -m venv --help >/dev/null && echo OK"
check "build-essential" gcc "gcc --version | head -n 1"
check "jq" jq "jq --version"
check "htop" htop "htop --version"
check "Ollama" ollama "ollama --version"

section "PORTS CRITIQUES"
for p in 3000 5173 8000 9000; do
  if ss -tuln | grep -q ":$p "; then
    echo "⚠ Port $p occupé" | tee -a $REPORT
  else
    echo "✔ Port $p libre" | tee -a $REPORT
  fi
done

section "INTÉGRITÉ DU DOSSIER OpenClaw_Light"
if [ -d "$HOME/OpenClaw_Light" ]; then
  echo "✔ Dossier détecté" | tee -a $REPORT
  echo "Contenu :" | tee -a $REPORT
  ls -1 "$HOME/OpenClaw_Light" | tee -a $REPORT
else
  echo "✘ Dossier OpenClaw_Light introuvable" | tee -a $REPORT
fi

echo "" | tee -a $REPORT
echo "──────────────────────────────────────────────" | tee -a $REPORT
echo "Pré‑scan terminé." | tee -a $REPORT
echo "Rapport généré : $REPORT" | tee -a $REPORT
echo "──────────────────────────────────────────────"

echo ""
echo "✔ Pré‑scan terminé. Rapport disponible dans : $REPORT"
