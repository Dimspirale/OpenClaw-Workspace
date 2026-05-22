# 🔮 Simulation d’état — OpenClaw Light

```dataviewjs
const pages = dv.pages('"Core"');

const total = pages.length;
const done = pages.filter(p => p.status == "termine").length;
const inProgress = pages.filter(p => p.status == "en_cours").length;

const speed = inProgress * 0.5 + done * 0.1; // heuristique simple
const remaining = total - done;
const eta = speed > 0 ? Math.round(remaining / speed) : "∞";

dv.table(
  ["Indicateur", "Valeur"],
  [
    ["Total fichiers", total],
    ["Terminés", done],
    ["En cours", inProgress],
    ["Restants", remaining],
    ["Vitesse estimée", speed.toFixed(2)],
    ["ETA (jours)", eta]
  ]
);
```

---

## 📈 Simulation par module

```dataviewjs
const modules = ["simulation","diagnostic","showcontrol","artistique","reseau","rigging","electricite","dmx","hf","policies","versioning"];

let rows = [];

modules.forEach(mod => {
  const files = pages.filter(p => p.file.folder.toLowerCase().includes(mod));
  const total = files.length;
  const done = files.filter(p => p.status == "termine").length;
  const inProgress = files.filter(p => p.status == "en_cours").length;

  const speed = inProgress * 0.5 + done * 0.1;
  const remaining = total - done;
  const eta = speed > 0 ? Math.round(remaining / speed) : "∞";

  rows.push([mod, total, done, inProgress, eta]);
});

dv.table(["Module", "Total", "Terminé", "En cours", "ETA (jours)"], rows);
```
