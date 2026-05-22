#!/usr/bin/env bash
USED=$(free -m | awk '/Mem:/ {print $3}')
TOTAL=$(free -m | awk '/Mem:/ {print $2}')
PERCENT=$((100 * USED / TOTAL))
BAR=$(printf "%-20s" "$(printf "%0.s█" $(($PERCENT/5)))")
echo "RAM : ${BAR// /░} $PERCENT%"
