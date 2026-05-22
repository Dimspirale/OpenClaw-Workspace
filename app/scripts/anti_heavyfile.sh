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
