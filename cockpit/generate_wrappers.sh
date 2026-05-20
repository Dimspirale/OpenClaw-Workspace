#!/usr/bin/env bash
set -e

# ============================================================
#  HERMÈS COCKPIT — WRAPPER GENERATOR v4.3 (LF, cockpit‑safe)
# ============================================================

PROJECT_ROOT="$HOME/OpenClaw_Light"
COCKPIT_DIR="$PROJECT_ROOT/cockpit"
ENGINE_DIR="$PROJECT_ROOT/ENGINE"
SRC_MAIN="$PROJECT_ROOT/src/main.js"

PROFILE="$1"

echo "[INFO] Mode demandé : $PROFILE"

# ------------------------------------------------------------
#  Vérification Node.js
# ------------------------------------------------------------
NODE_BIN="$(command -v node || true)"

if [ -z "$NODE_BIN" ]; then
    echo "[ERR] Node.js introuvable. Installe-le avant de continuer."
    exit 1
fi

echo "[INFO] Node.js détecté : $NODE_BIN"

# ------------------------------------------------------------
#  Vérification du main.js
# ------------------------------------------------------------
if [ ! -f "$SRC_MAIN" ]; then
    echo "[ERR] main.js introuvable : $SRC_MAIN"
    echo "[ERR] Chemin attendu : $PROJECT_ROOT/src/main.js"
    exit 1
fi

# ------------------------------------------------------------
#  Liste des wrappers à générer
# ------------------------------------------------------------
declare -A WRAPPERS=(
    ["hud"]="HUD_ENGINE"
    ["gpu"]="HERMES_GPU_MONITOR"
    ["system"]="HERMES_SYSTEM_MONITOR_TOTAL"
    ["dashboard"]="HERMES_DASHBOARD"
    ["hermes-os"]="HERMES_OS"
    ["cockpit"]="HERMES_COCKPIT_MASTER_TOTAL_v4"
    ["fusion"]="HERMES_ENGINE"
    ["dashboard-gpu"]="HERMES_DASHBOARD_GPU"
    ["core"]="CORE_ENGINE"
    ["listener"]="HERMES_LISTENER"
)

# ------------------------------------------------------------
#  Génération cockpit‑safe
# ------------------------------------------------------------
echo "[GEN] Génération des wrappers cockpit‑safe..."

mkdir -p "$ENGINE_DIR"

for key in "${!WRAPPERS[@]}"; do
    WRAP_NAME="${WRAPPERS[$key]}"
    WRAP_PATH="$ENGINE_DIR/$key"

    echo "[GEN] Création wrapper $key → $WRAP_NAME via Node.js"

    cat > "$WRAP_PATH" <<EOF
#!/usr/bin/env bash
"$NODE_BIN" "$SRC_MAIN" "$WRAP_NAME" "\$@"
EOF

    chmod +x "$WRAP_PATH"
    echo "[DIAG] Wrapper $key → OK"
done

echo "[OK] Wrappers cockpit-safe régénérés."

# ------------------------------------------------------------
#  Vérification de cohérence
# ------------------------------------------------------------
echo "[CHECK] Vérification de cohérence des wrappers..."

for key in "${!WRAPPERS[@]}"; do
    if [ ! -x "$ENGINE_DIR/$key" ]; then
        echo "[ERR] Wrapper manquant ou non exécutable : $key"
        exit 1
    fi
done

echo "[INFO] Vérification de cohérence terminée."

# ------------------------------------------------------------
#  Mise à jour PATH
# ------------------------------------------------------------
if [[ ":$PATH:" != *":$ENGINE_DIR:"* ]]; then
    export PATH="$ENGINE_DIR:$PATH"
    echo "[INFO] PATH mis à jour pour inclure ENGINE."
fi

# ------------------------------------------------------------
#  Relance cockpit
# ------------------------------------------------------------
echo "[INFO] Relance cockpit en mode $PROFILE..."

"$NODE_BIN" "$SRC_MAIN" run "$PROFILE"

exit 0
