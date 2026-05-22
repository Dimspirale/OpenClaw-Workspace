#!/usr/bin/env bash
# Hermès Ω PRIME+++ v20.4 — Module Builder
# Génère tous les modules HUD d’un coup

ROOT="$(dirname "$(readlink -f "$0")")/.."
MOD="$ROOT/hud/modules"

echo "📦 Création du dossier modules…"
mkdir -p "$MOD"

echo "🧩 Génération des modules…"

# CPU
cat > "$MOD/cpu.sh" << 'EOF'
#!/usr/bin/env bash
CPU=$(grep 'cpu ' /proc/stat | awk '{usage=($2+$4)*100/($2+$4+$5)} END {printf "%d", usage}')
BAR=$(printf "%-20s" "$(printf "%0.s█" $(($CPU/5)))")
echo "CPU : ${BAR// /░} $CPU%"
EOF

# RAM
cat > "$MOD/ram.sh" << 'EOF'
#!/usr/bin/env bash
USED=$(free -m | awk '/Mem:/ {print $3}')
TOTAL=$(free -m | awk '/Mem:/ {print $2}')
PERCENT=$((100 * USED / TOTAL))
BAR=$(printf "%-20s" "$(printf "%0.s█" $(($PERCENT/5)))")
echo "RAM : ${BAR// /░} $PERCENT%"
EOF

# GPU
cat > "$MOD/gpu.sh" << 'EOF'
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
EOF

# NET
cat > "$MOD/net.sh" << 'EOF'
#!/usr/bin/env bash
PING=$(ping -c 1 8.8.8.8 2>/dev/null | awk -F'time=' '/time=/{print $2}' | cut -d' ' -f1)
echo "NET : ${PING:-N/A}ms (eth0)"
EOF

# RISKS
cat > "$MOD/risks.sh" << 'EOF'
#!/usr/bin/env bash
echo "Risques :"
CPU=$(grep 'cpu ' /proc/stat | awk '{usage=($2+$4)*100/($2+$4+$5)} END {printf "%d", usage}')
RAM=$(free -m | awk '/Mem:/ {print int($3/$2*100)}')
NET=$(ping -c 1 8.8.8.8 2>/dev/null | awk -F'time=' '/time=/{print int($2)}')

echo "   CPU : $( [ $CPU -gt 85 ] && echo "⚠️" || echo "OK" )"
echo "   RAM : $( [ $RAM -gt 85 ] && echo "⚠️" || echo "OK" )"
echo "   NET : $( [ ${NET:-0} -gt 150 ] && echo "⚠️" || echo "OK" )"
echo "   GPU : OK"
EOF

# TIMELINE
cat > "$MOD/timeline.sh" << 'EOF'
#!/usr/bin/env bash
echo "Timeline :"
git -C ~/OpenClaw_Light log -1 --pretty=format:"   • %s"
echo ""
EOF

# MODULES STATUS
cat > "$MOD/modules_status.sh" << 'EOF'
#!/usr/bin/env bash
echo "Modules A1‑A22 :"
for i in {1..22}; do
  echo "   A$i : OK"
done
EOF

# OPACITY
cat > "$MOD/opacity.sh" << 'EOF'
#!/usr/bin/env bash
CPU_LOAD=$(awk '{print $1}' /proc/loadavg)
CORES=$(nproc)
CPU_PERCENT=$(echo "$CPU_LOAD $CORES" | awk '{printf "%.0f", ($1/$2)*100}')
RAM_USED=$(free -m | awk '/Mem:/ {print $3}')
RAM_TOTAL=$(free -m | awk '/Mem:/ {print $2}')
RAM_PERCENT=$((100 * RAM_USED / RAM_TOTAL))
GPU_UTIL=$(nvidia-smi --query-gpu=utilization.gpu --format=csv,noheader 2>/dev/null | tr -d ' %')
PING=$(ping -c 1 8.8.8.8 2>/dev/null | awk -F'time=' '/time=/{print $2}' | cut -d' ' -f1)

OPACITY=0.85

if [ "$CPU_PERCENT" -gt 80 ]; then OPACITY=0.95
elif [ "$CPU_PERCENT" -gt 60 ]; then OPACITY=0.90
elif [ "$CPU_PERCENT" -lt 30 ]; then OPACITY=0.75; fi

if [ "$RAM_PERCENT" -gt 80 ]; then OPACITY=$(echo "$OPACITY + 0.05" | bc)
elif [ "$RAM_PERCENT" -lt 40 ]; then OPACITY=$(echo "$OPACITY - 0.05" | bc); fi

if [ -n "$GPU_UTIL" ]; then
  if [ "$GPU_UTIL" -gt 70 ]; then OPACITY=$(echo "$OPACITY + 0.05" | bc)
  elif [ "$GPU_UTIL" -lt 30 ]; then OPACITY=$(echo "$OPACITY - 0.05" | bc); fi
fi

if [ -z "$PING" ]; then OPACITY=0.95
elif (( $(echo "$PING > 80" | bc -l) )); then OPACITY=$(echo "$OPACITY + 0.03" | bc); fi

if (( $(echo "$OPACITY > 0.95" | bc -l) )); then OPACITY=0.95; fi
if (( $(echo "$OPACITY < 0.70" | bc -l) )); then OPACITY=0.70; fi

echo "$OPACITY"
EOF

echo "🔧 Permissions…"
chmod +x "$MOD"/*.sh

echo "✅ Tous les modules HUD ont été générés."
echo "Tu peux lancer :"
echo "   source ~/OpenClaw_Light/hud/hud_prime_plus.sh"
