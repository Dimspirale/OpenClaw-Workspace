# 📊 OpenClaw Index — Scoring global

```dataviewjs
const pages = dv.pages('"Core"');

function score(p) {
  let s = 0;

  // Status
  if (p.status == "termine") s += 20;
  if (p.status == "en_cours") s += 10;
  if (!p.status) s -= 20;

  // Tags
  if (p.file.tags?.length >= 3) s += 10;
  if (!p.file.tags) s -= 10;

  // Footer
  if (p.file.content.includes("# 🔗 Navigation rapide")) s += 10;
  else s -= 10;

  // Longueur
  const len = p.file.content.length;
  if (len > 500) s += 20;
  else if (len > 200) s += 10;
  else s -= 10;

  // Priorité
  if (p.file.tags?.includes("prio/haute")) s -= 10;

  // Cohérence module
  const folder = p.file.folder.toLowerCase();
  if (folder.includes("simulation") && p.file.tags?.includes("module/simulation")) s += 10;

  return Math.max(0, Math.min(100, s));
}

let rows = [];

pages.forEach(p => {
  rows.push([p.file.link, score(p)]);
});

rows.sort((a,b) => b[1] - a[1]);

dv.table(["Fichier", "Score"], rows);
```
