# 🎨 Analyse artistique — OpenClaw Light

## 🎛️ Couleurs dominantes

```dataviewjs
const pages = dv.pages('"Core/Artistique"');

function extractColors(text){
  const regex = /#([0-9A-Fa-f]{6})/g;
  let match, colors = [];
  while ((match = regex.exec(text)) !== null) colors.push(match[0]);
  return colors;
}

dv.table(
  ["Fichier","Couleurs"],
  pages.map(p => [p.file.link, extractColors(p.file.content).join(", ") || "—"])
);
```

---

## 📈 Courbes d’intensité (Mermaid)

```dataviewjs
let mermaid = "graph LR\n";

pages.forEach(p => {
  const intensities = p.file.content.match(/intensité\s*:\s*(\d+)%/gi) || [];
  intensities.forEach((i, idx) => {
    const val = i.match(/(\d+)%/)[1];
    mermaid += `${p.file.name}_${idx}["${val}%"] --> `;
  });
});

dv.el("pre", mermaid);
```

---

## 🔊 Dynamique

```dataview
table file.link, dynamique
from "Core/Artistique"
where dynamique
```

---

## 🎭 Cohérence artistique

```dataviewjs
function score(p){
  let s = 0;
  if (p.file.content.includes("transition")) s += 2;
  if (p.file.content.includes("fade")) s += 2;
  if (p.file.content.includes("#")) s += 1;
  if (p.file.content.includes("intensité")) s += 1;
  return s;
}

dv.table(
  ["Fichier","Score artistique"],
  pages.map(p => [p.file.link, score(p)])
);
```
