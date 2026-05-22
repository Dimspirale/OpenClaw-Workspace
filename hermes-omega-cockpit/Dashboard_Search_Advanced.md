# 🔎 Moteur de recherche avancé — OpenClaw Light

## 🔍 Recherche

Tape un mot-clé dans le champ ci-dessous :

```dataviewjs
const query = dv.current().query ?? "";
dv.el("input", "", {placeholder: "Tape ta recherche…", value: query, oninput: (e) => {
    dv.current().query = e.target.value;
    dv.current().reload();
}});
```

---

## 📄 Résultats

```dataviewjs
const q = dv.current().query?.toLowerCase() ?? "";
if (!q) {
  dv.paragraph("⏳ Tape un mot-clé pour commencer la recherche.");
  return;
}

const pages = dv.pages('"Core"');

function score(p) {
  let s = 0;

  if (p.file.name.toLowerCase().includes(q)) s += 5;
  if (p.file.content.toLowerCase().includes(q)) s += 3;

  if (p.file.tags?.some(t => t.toLowerCase().includes(q))) s += 2;

  if (p.file.folder.toLowerCase().includes(q)) s += 1;

  if (p.status == "en_cours") s += 1;

  return s;
}

let results = pages
  .map(p => ({page: p, score: score(p)}))
  .filter(r => r.score > 0)
  .sort((a, b) => b.score - a.score);

dv.table(["Fichier", "Score"], results.map(r => [r.page.file.link, r.score]));
```
