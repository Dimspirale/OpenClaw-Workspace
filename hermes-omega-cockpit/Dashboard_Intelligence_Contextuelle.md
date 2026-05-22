# 🧠 Intelligence contextuelle — Analyse sémantique avancée

```dataviewjs
const pages = dv.pages('"Core"');

function keywords(text) {
  const words = text.toLowerCase().split(/\W+/);
  const freq = {};
  words.forEach(w => { if (w.length > 4) freq[w] = (freq[w] || 0) + 1; });
  return Object.entries(freq)
    .sort((a,b)=>b[1]-a[1])
    .slice(0,10)
    .map(e=>e[0]);
}

function themes(text) {
  const t = [];
  if (text.includes("dmx")) t.push("DMX");
  if (text.includes("osc")) t.push("OSC");
  if (text.includes("midi")) t.push("MIDI");
  if (text.includes("test")) t.push("Tests");
  if (text.includes("network")) t.push("Réseau");
  if (text.includes("show")) t.push("ShowControl");
  return t;
}

let rows = [];

pages.forEach(p => {
  const text = p.file.content;
  rows.push([
    p.file.link,
    keywords(text).join(", "),
    themes(text).join(", ") || "—"
  ]);
});

dv.table(["Fichier", "Mots-clés", "Thèmes détectés"], rows);
```
