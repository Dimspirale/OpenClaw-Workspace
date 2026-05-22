# 🧪 Qualité & Conformité — OpenClaw Light

## 📌 Résumé global

```dataviewjs
const pages = dv.pages('"Core"');

dv.table(
  ["Critère", "Nombre"],
  [
    ["Sans frontmatter", pages.filter(p => !p.file.frontmatter).length],
    ["Sans status", pages.filter(p => !p.status).length],
    ["Sans tags", pages.filter(p => !p.file.tags || p.file.tags.length == 0).length],
    ["Sans footer", pages.filter(p => !p.file.content.includes("# 🔗 Navigation rapide")).length],
    ["Trop courts (<150 caractères)", pages.filter(p => p.file.content.length < 150).length],
  ]
);
```

---

## 🧹 Détails des fichiers non conformes

### ❗ Sans frontmatter

```dataview
table file.link
from "Core"
where !file.frontmatter
```

### ❗ Sans status

```dataview
table file.link
from "Core"
where !status
```

### ❗ Sans tags

```dataview
table file.link
from "Core"
where !file.tags
```

### ❗ Sans footer

```dataview
table file.link
from "Core"
where !contains(file.content, "# 🔗 Navigation rapide")
```

### ❗ Trop courts

```dataview
table file.link, length(file.content) as "Longueur"
from "Core"
where length(file.content) < 150
```

---

## 🛠️ Actions rapides

```button
name Corriger status + footer
type command
action Templater: Run script Batch_Footer_Status
```

```button
name Ajouter tags
type command
action Templater: Run script Batch_AddTags
```
