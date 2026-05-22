# 📚 Documentation automatique — OpenClaw Light

## 📝 Résumés automatiques

```dataviewjs
const pages = dv.pages('"Core"');

function summarize(text) {
  return text.split("\n").slice(0,3).join(" ").substring(0,150) + "...";
}

dv.table(
  ["Fichier", "Résumé"],
  pages.map(p => [p.file.link, summarize(p.file.content)])
);
```

---

## 🧩 Index par module

```dataview
table file.link as "Fichier", file.folder as "Module"
from "Core"
sort file.folder asc
```

---

## 🏷️ Index par type

```dataview
table file.link as "Fichier", file.tags as "Tags"
from "Core"
where contains(file.tags, "type/")
```

---

## 🔥 Index par priorité

```dataview
table file.link as "Fichier", file.tags as "Tags"
from "Core"
where contains(file.tags, "prio/")
sort file.tags asc
```
