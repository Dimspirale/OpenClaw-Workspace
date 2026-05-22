#!/usr/bin/env bash
set -e
TS=$(date '+%Y%m%d_%H%M%S')
tar --exclude='*.log' --exclude='*.cache' -czf rollback_$TS.tar.gz .
echo "✔ Rollback créé : rollback_$TS.tar.gz"
