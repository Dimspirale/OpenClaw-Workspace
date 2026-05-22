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
