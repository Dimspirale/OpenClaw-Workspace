#!/usr/bin/env bash

# Hermès HUD Ω — cockpit-safe, couleurs + bargraph ASCII
# CPU / RAM / GPU / NET — ultra-rapide, zéro écriture disque

# -----------------------------
#  PALETTE COCKPIT SAFE (ANSI)
# -----------------------------
C_RESET="\033[0m"
C_GREEN="\033[32m"
C_YELLOW="\033[33m"
C_RED="\033[31m"
C_CYAN="\033[36m"
C_BLUE="\033[34m"

# -----------------------------
#  BARGRAPH ASCII (0–100%)
# -----------------------------
bargraph() {
    local val=$1
    local bars=$(( val / 10 ))
    local out=""
    for i in {1..10}; do
        if [ $i -le $bars ]; then
            out="${out}#"
        else
            out="${out}-"
        fi
    done
    echo "$out"
}

# -----------------------------
#  CPU
# -----------------------------
get_cpu() {
    top -bn1 | grep "Cpu(s)" | awk '{print int($2)}'
}

color_cpu() {
    local v=$1
    if [ $v -lt 40 ]; then echo -n "$C_GREEN"; return; fi
    if [ $v -lt 75 ]; then echo -n "$C_YELLOW"; return; fi
    echo -n "$C_RED"
}

# -----------------------------
#  RAM
# -----------------------------
get_ram() {
    free -m | awk '/Mem:/ { printf "%d", ($3/$2)*100 }'
}

color_ram() {
    local v=$1
    if [ $v -lt 50 ]; then echo -n "$C_GREEN"; return; fi
    if [ $v -lt 80 ]; then echo -n "$C_YELLOW"; return; fi
    echo -n "$C_RED"
}

# -----------------------------
#  GPU
# -----------------------------
get_gpu() {
    if command -v nvidia-smi >/dev/null 2>&1; then
        nvidia-smi --query-gpu=utilization.gpu --format=csv,noheader,nounits 2>/dev/null | head -n1
    else
        echo 0
    fi
}

color_gpu() {
    local v=$1
    if [ $v -lt 40 ]; then echo -n "$C_GREEN"; return; fi
    if [ $v -lt 75 ]; then echo -n "$C_YELLOW"; return; fi
    echo -n "$C_RED"
}

# -----------------------------
#  NET (KB/s)
# -----------------------------
get_net() {
    RX=$(cat /sys/class/net/w*/statistics/rx_bytes 2>/dev/null | paste -sd+ - | bc)
    sleep 0.2
    RX2=$(cat /sys/class/net/w*/statistics/rx_bytes 2>/dev/null | paste -sd+ - | bc)
    echo $(( (RX2 - RX) / 1024 ))
}

color_net() {
    local v=$1
    if [ $v -lt 50 ]; then echo -n "$C_BLUE"; return; fi
    if [ $v -lt 500 ]; then echo -n "$C_CYAN"; return; fi
    echo -n "$C_YELLOW"
}

# -----------------------------
#  HUD COMPLET
# -----------------------------
hud_minimal() {

    CPU=$(get_cpu)
    RAM=$(get_ram)
    GPU=$(get_gpu)
    NET=$(get_net)

    CPU_BAR=$(bargraph $CPU)
    RAM_BAR=$(bargraph $RAM)
    GPU_BAR=$(bargraph $GPU)

    echo -n \
"CPU:$(color_cpu $CPU)${CPU}%${C_RESET}[$CPU_BAR] \
RAM:$(color_ram $RAM)${RAM}%${C_RESET}[$RAM_BAR] \
GPU:$(color_gpu $GPU)${GPU}%${C_RESET}[$GPU_BAR] \
NET:$(color_net $NET)${NET}KB/s${C_RESET}"
}
