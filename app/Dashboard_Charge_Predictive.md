# 🔮 Analyse de charge prédictive — OpenClaw Light

```dataviewjs
const pages = dv.pages('"Core"');

// Heuristique ML simulée
function predictSpeed(p) {
  let s = 0;
  if (p.status == "en_cours") s += 1.5;
  if (p.status == "a_valider") s += 0.5;
  if (p.file.tags?.includes("prio/haute")) s -= 0.5;
  if (p.file.content.length > 500) s += 0.3;
  return s;
}

const total = pages.length;
const done = pages.filter(p => p.status == "termine").length;
const remaining = total - done;

const globalSpeed = pages.reduce((acc,p)=>acc+predictSpeed(p),0);
const eta = globalSpeed > 0 ? Math.round(remaining / globalSpeed) : "∞";

dv.table(
  ["Indicateur", "Valeur"],
  [
    ["Total fichiers", total],
    ["Terminés", done],
    ["Restants", remaining],
    ["Vitesse prédite", globalSpeed.toFixed(2)],
    ["ETA (jours)", eta]
  ]
);
```

---

## 📈 Prédiction par module

```dataviewjs
const modules = ["simulation","diagnostic","showcontrol","artistique","reseau","rigging","electricite","dmx","hf","policies","versioning"];

let rows = [];

modules.forEach(mod => {
  const files = pages.filter(p => p.file.folder.toLowerCase().includes(mod));
  const speed = files.reduce((acc,p)=>acc+predictSpeed(p),0);
  const done = files.filter(p => p.status == "termine").length;
  const remaining = files.length - done;
  const eta = speed > 0 ? Math.round(remaining / speed) : "∞";

  rows.push([mod, files.length, done, speed.toFixed(2), eta]);
});

dv.table(["Module", "Total", "Terminé", "Vitesse prédite", "ETA"], rows);
```
