#!/usr/bin/env bash
PING=$(ping -c 1 8.8.8.8 2>/dev/null | awk -F'time=' '/time=/{print $2}' | cut -d' ' -f1)
echo "NET : ${PING:-N/A}ms (eth0)"
