#!/usr/bin/env bash
if command -v nvidia-smi >/dev/null 2>&1; then
  UTIL=$(nvidia-smi --query-gpu=utilization.gpu --format=csv,noheader | tr -d ' %')
  MEM=$(nvidia-smi --query-gpu=memory.used --format=csv,noheader | tr -d ' MiB')
  MEMTOT=$(nvidia-smi --query-gpu=memory.total --format=csv,noheader | tr -d ' MiB')
  BAR=$(printf "%-20s" "$(printf "%0.s█" $(($UTIL/5)))")
  echo "GPU : ${BAR// /░} $UTIL%  ($MEM/$MEMTOT MiB)"
else
  echo "GPU : Aucun GPU détecté"
fi
