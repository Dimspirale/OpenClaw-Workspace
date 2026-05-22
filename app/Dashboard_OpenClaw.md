# 📊 Dashboard OpenClaw Light

---

## 🔥 KPIs globaux (DataviewJS)

```dataviewjs
const pages = dv.pages('"Core"');

dv.table(
  ["Statut", "Nombre"],
  [
    ["Backlog", pages.filter(p => p.status == "backlog").length],
    ["En cours", pages.filter(p => p.status == "en_cours").length],
    ["À valider", pages.filter(p => p.status == "a_valider").length],
    ["Terminé", pages.filter(p => p.status == "termine").length],
  ]
);
```

---

## 📈 Progression globale

```dataview
table file.link as "Fichier", status
from "Core"
sort status asc
```

---

## 🧩 Progression par module

```dataview
table file.folder as "Module", status, file.link as "Fichier"
from "Core"
sort file.folder asc
```

---

## 🗂️ Fichiers sans status (qualité)

```dataview
table file.link as "Fichier"
from "Core"
where !status
sort file.name asc
```

---

## 🧹 Fichiers sans footer (qualité)

```dataview
table file.link as "Fichier"
from "Core"
where !contains(file.content, "# 🔗 Navigation rapide")
sort file.name asc
```

---

# 🔗 Navigation rapide
- [[Home]]
- [[Kanban_Master]]
- [[Kanban_Automatique]]
- [[Core/README]]
