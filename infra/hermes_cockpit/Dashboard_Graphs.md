# 🕸️ Visualisation Graphique — OpenClaw Light

## 🔗 Graph des dépendances

```dataviewjs
const pages = dv.pages('"Core"');

let edges = [];

pages.forEach(p => {
  const links = p.file.content.match(/

\[

\[(.*?)\]

\]

/g) || [];
  links.forEach(l => {
    const target = l.replace("[[","").replace("]]","");
    edges.push(`${p.file.name} --> ${target}`);
  });
});

dv.el("pre", "graph TD\n" + edges.join("\n"));
```

---

## 🧩 Graph des modules

```dataviewjs
const modules = [...new Set(pages.map(p => p.file.folder.split("/")[1]))];

let edges = [];

modules.forEach(m => {
  const files = pages.filter(p => p.file.folder.includes(m));
  files.forEach(f => edges.push(`${m} --> ${f.file.name}`));
});

dv.el("pre", "graph TD\n" + edges.join("\n"));
```

---

## 🔥 Graph des priorités

```dataviewjs
let edges = [];

pages.forEach(p => {
  if (p.file.tags?.includes("prio/haute")) edges.push(`Critique --> ${p.file.name}`);
  if (p.file.tags?.includes("prio/moyenne")) edges.push(`Moyenne --> ${p.file.name}`);
  if (p.file.tags?.includes("prio/basse")) edges.push(`Basse --> ${p.file.name}`);
});

dv.el("pre", "graph TD\n" + edges.join("\n"));
```

---

## 📊 Graph des statuts

```dataviewjs
let edges = [];

pages.forEach(p => {
  if (p.status) edges.push(`${p.status} --> ${p.file.name}`);
});

dv.el("pre", "graph TD\n" + edges.join("\n"));
```
