#!/usr/bin/env bash
# BOOT_SEQUENCE.sh — Hermès Cockpit
# Ultra-sober, no ASCII, no HUD, no animation

ROOT="$HOME/OpenClaw_Light/cockpit"
ENGINE="$ROOT/ENGINE"
HERMES="$ENGINE/hermes"
WRAPPERS="$ENGINE/wrappers"
LOGS="$ROOT/LOGS"

mkdir -p "$LOGS"

LOG_BOOT="$LOGS/boot_sequence.log"

timestamp() { date +"%Y-%m-%d %H:%M:%S"; }

log() {
    echo "$(timestamp) | $1" >> "$LOG_BOOT"
}

log "BOOT: sequence start"

# 1. Structure minimale cockpit
[ -d "$ENGINE" ]   || { mkdir -p "$ENGINE";   log "BOOT: ENGINE created"; }
[ -d "$HERMES" ]   || { mkdir -p "$HERMES";   log "BOOT: HERMES created"; }
[ -d "$WRAPPERS" ] || { mkdir -p "$WRAPPERS"; log "BOOT: WRAPPERS created"; }

# 2. PATH cockpit-grade
case ":$PATH:" in
    *":$ENGINE:"*) ;;
    *) export PATH="$ENGINE:$PATH"; log "BOOT: ENGINE added to PATH";;
esac

# 3. MODE 4 : AUTO-HEAL (HERMES_AUTO_HEAL.ocm)
AUTO_HEAL="$HERMES/HERMES_AUTO_HEAL.ocm"
if [ -f "$AUTO_HEAL" ]; then
    chmod +x "$AUTO_HEAL" 2>/dev/null
    bash "$AUTO_HEAL"
    log "BOOT: AUTO-HEAL executed"
else
    log "BOOT: AUTO-HEAL missing at $AUTO_HEAL"
fi

# 4. Chargement des wrappers essentiels (optionnel, sobre)
for w in "$WRAPPERS"/*.sh; do
    [ -f "$w" ] || continue
    chmod +x "$w" 2>/dev/null
    # wrappers disponibles dans PATH, pas de sourcing automatique
done

log "BOOT: sequence end"

exit 0
