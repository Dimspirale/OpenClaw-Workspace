# 🕸️ Dépendances — OpenClaw Light

```dataviewjs
const pages = dv.pages('"Core"');

function extractLinks(content) {
  const regex = /

\[

\[(.*?)\]

\]

/g;
  let match;
  let links = [];
  while ((match = regex.exec(content)) !== null) {
    links.push(match[1]);
  }
  return links;
}

let rows = [];

pages.forEach(p => {
  const links = extractLinks(p.file.content);
  rows.push([p.file.link, links.join(", ") || "—"]);
});

dv.table(["Fichier", "Dépend de"], rows);
```

---

## 🔍 Fichiers orphelins

```dataviewjs
let orphans = pages.filter(p => {
  const content = p.file.content;
  return !content.match(/

\[

\[(.*?)\]

\]

/);
});

dv.table(["Fichier"], orphans.map(p => [p.file.link]));
```

---

## 🔁 Dépendances circulaires (cycles)

```dataviewjs
function hasCycle(p, visited = new Set()) {
  if (visited.has(p.file.path)) return true;
  visited.add(p.file.path);

  const links = extractLinks(p.file.content);
  for (const l of links) {
    const target = pages.find(x => x.file.name == l);
    if (target && hasCycle(target, new Set(visited))) return true;
  }
  return false;
}

let cycles = pages.filter(p => hasCycle(p));

dv.table(["Fichier"], cycles.map(p => [p.file.link]));
```
