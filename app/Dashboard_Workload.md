# 🧮 Charge de travail par module

```dataviewjs
const pages = dv.pages('"Core"');

const modules = [
  "simulation",
  "diagnostic",
  "showcontrol",
  "artistique",
  "reseau",
  "rigging",
  "electricite",
  "dmx",
  "hf",
  "policies",
  "versioning"
];

function workload(p) {
  let score = 1; // base

  if (p.status == "en_cours") score += 2;
  if (p.status == "a_valider") score += 1;

  if (p.file.tags?.includes("prio/haute")) score += 3;
  if (p.file.tags?.includes("prio/moyenne")) score += 1;

  return score;
}

let rows = [];

modules.forEach(mod => {
  const files = pages.filter(p => p.file.folder.toLowerCase().includes(mod));
  const total = files.length;
  const active = files.filter(p => p.status == "en_cours").length;
  const critical = files.filter(p => p.file.tags?.includes("prio/haute")).length;

  const load = files.reduce((sum, p) => sum + workload(p), 0);

  rows.push([mod, total, active, critical, load]);
});

dv.table(["Module", "Total", "En cours", "Critiques", "Charge"], rows);
```
