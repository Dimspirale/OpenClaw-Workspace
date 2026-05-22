#!/usr/bin/env bash
CPU=$(grep 'cpu ' /proc/stat | awk '{usage=($2+$4)*100/($2+$4+$5)} END {printf "%d", usage}')
BAR=$(printf "%-20s" "$(printf "%0.s█" $(($CPU/5)))")
echo "CPU : ${BAR// /░} $CPU%"
