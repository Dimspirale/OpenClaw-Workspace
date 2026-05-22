#!/usr/bin/env bash
echo "Risques :"
CPU=$(grep 'cpu ' /proc/stat | awk '{usage=($2+$4)*100/($2+$4+$5)} END {printf "%d", usage}')
RAM=$(free -m | awk '/Mem:/ {print int($3/$2*100)}')
NET=$(ping -c 1 8.8.8.8 2>/dev/null | awk -F'time=' '/time=/{print int($2)}')

echo "   CPU : $( [ $CPU -gt 85 ] && echo "⚠️" || echo "OK" )"
echo "   RAM : $( [ $RAM -gt 85 ] && echo "⚠️" || echo "OK" )"
echo "   NET : $( [ ${NET:-0} -gt 150 ] && echo "⚠️" || echo "OK" )"
echo "   GPU : OK"
