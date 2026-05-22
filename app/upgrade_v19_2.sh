#!/usr/bin/env bash

echo "──────────────────────────────────────────────"
echo "     UPGRADE OpenClaw_Light → v19.2"
echo "     Mode : COCKPIT‑GRADE / SAFE / PRO"
echo "──────────────────────────────────────────────"

TARGET="$HOME/OpenClaw_Light"
cd "$TARGET"

echo ""
echo "📁 Dossier : $TARGET"

# 1. Anti‑HeavyFile Engine
echo ""
echo "── 1. Installation Anti‑HeavyFile Engine"
cat << 'EOF' > .heavyfile_ignore
# Fichiers interdits (>100MB)
*.log
*.bin
*.dump
*.cache
EOF

cat << 'EOF' > scripts/anti_heavyfile.sh
#!/usr/bin/env bash
FILES=$(git ls-files -s | awk '{print $4}')
for f in $FILES; do
  if [ -f "$f" ]; then
    SIZE=$(stat -c%s "$f")
    if [ $SIZE -gt 100000000 ]; then
      echo "❌ Fichier trop lourd détecté : $f ($SIZE bytes)"
      git rm --cached "$f"
      echo "$f" >> .gitignore
    fi
  fi
done
EOF
chmod +x scripts/anti_heavyfile.sh
echo "✔ Anti‑HeavyFile Engine installé"

# 2. Smart‑Diff v2
echo ""
echo "── 2. Mise à jour Smart‑Diff v2"
cat << 'EOF' > save.sh
#!/usr/bin/env bash
git add -A

if git diff --cached --quiet; then
  echo "🟦 Aucun changement à sauvegarder."
  exit 0
fi

bash scripts/anti_heavyfile.sh

git commit -m "auto-save $(date '+%Y-%m-%d %H:%M:%S')"
git push
EOF
chmod +x save.sh
echo "✔ Smart‑Diff v2 installé"

# 3. Rollback+ v2
echo ""
echo "── 3. Installation Rollback+ v2"
cat << 'EOF' > rollback.sh
#!/usr/bin/env bash
TS=$(date '+%Y%m%d_%H%M%S')
tar --exclude='*.log' --exclude='*.cache' -czf rollback_$TS.tar.gz .
echo "✔ Rollback créé : rollback_$TS.tar.gz"
EOF
chmod +x rollback.sh
echo "✔ Rollback+ v2 installé"

# 4. Integrity Watcher
echo ""
echo "── 4. Installation Integrity Watcher"
cat << 'EOF' > watcher.sh
#!/usr/bin/env bash
while true; do
  if ! git diff --quiet; then
    echo "⚠ Modification détectée à $(date)"
  fi
  sleep 5
done
EOF
chmod +x watcher.sh
echo "✔ Integrity Watcher installé"

echo ""
echo "──────────────────────────────────────────────"
echo "✔ UPGRADE v19.2 TERMINÉ"
echo "──────────────────────────────────────────────"
