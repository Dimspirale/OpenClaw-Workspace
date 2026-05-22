# 🎯 Priorités dynamiques — OpenClaw Light

```dataviewjs
const pages = dv.pages('"Core"');

function priority(p) {
  let score = 0;

  // Statut
  if (p.status == "backlog") score += 1;
  if (p.status == "en_cours") score += 3;
  if (p.status == "a_valider") score += 2;
  if (p.status == "termine") score += 0;

  // Tags de planning
  if (p.file.tags?.includes("semaine/en_cours")) score += 5;
  if (p.file.tags?.includes("semaine/prochaine")) score += 3;

  // Modules critiques
  const critical = ["showcontrol", "reseau", "dmx"];
  if (critical.some(m => p.file.folder.toLowerCase().includes(m))) score += 4;

  return score;
}

let rows = [];

pages.forEach(p => {
  rows.push([p.file.link, p.status, priority(p)]);
});

rows.sort((a, b) => b[2] - a[2]);

dv.table(["Fichier", "Statut", "Priorité"], rows);
```
