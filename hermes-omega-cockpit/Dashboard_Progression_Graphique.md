# 📊 Dashboard 2.0 — Progression Graphique

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

function bar(pct) {
  const total = 20;
  const filled = Math.round((pct / 100) * total);
  return "█".repeat(filled) + "░".repeat(total - filled);
}

let rows = [];

modules.forEach(mod => {
  const files = pages.filter(p => p.file.folder.toLowerCase().includes(mod));
  const total = files.length;
  const done = files.filter(p => p.status == "termine").length;

  const percent = total > 0 ? Math.round((done / total) * 100) : 0;

  rows.push([mod, total, done, percent + "%", bar(percent)]);
});

dv.table(["Module", "Total", "Terminé", "Progression", "Graphique"], rows);
```
