# 📦 Dashboard Production

## 🔥 KPIs Production (DataviewJS)
```dataviewjs
const pages = dv.pages('"Core"');
const prod = pages.filter(p => p.production == true).length;
const critical = pages.filter(p => p.critical == true).length;
const blocked = pages.filter(p => p.status == "bloque").length;
const ready = pages.filter(p => p.status == "termine" && p.production == true).length;

dv.table(
  ["Indicateur", "Valeur"],
  [
    ["Modules en production", prod],
    ["Modules prêts", ready],
    ["Modules critiques", critical],
    ["Modules bloqués", blocked],
  ]
);
```

## 🚀 Modules prêts pour production
```dataview
TABLE file.link AS "Module", status
FROM "Core"
WHERE production = true AND status = "termine"
SORT file.name ASC
```

## 🧪 Modules à valider avant production
```dataview
TABLE file.link AS "Module", status
FROM "Core"
WHERE production = true AND status = "a_valider"
SORT file.name ASC
```

## 🛠️ Modules en cours de préparation
```dataview
TABLE file.link AS "Module", status
FROM "Core"
WHERE production = true AND status = "en_cours"
SORT file.name ASC
```

## 🛑 Modules bloqués
```dataview
TABLE file.link AS "Module", status
FROM "Core"
WHERE status = "bloque" OR contains(file.content, "🔥") OR contains(file.content, "❗")
SORT file.name ASC
```

## 📋 Liste complète des modules en production
```dataview
TABLE file.link AS "Module", status, priority
FROM "Core"
WHERE production = true
SORT priority DESC, file.name ASC
```

## 🕒 Dernières modifications (Production)
```dataview
TABLE file.link AS "Module", file.mtime AS "Modifié le"
FROM "Core"
WHERE production = true
SORT file.mtime DESC
LIMIT 15
```

## 📚 Modules prioritaires (Production)
```dataview
TABLE file.link AS "Module", priority
FROM "Core"
WHERE production = true AND priority
SORT priority DESC
```

## 🧭 Synthèse Production (DataviewJS)
```dataviewjs
const pages = dv.pages('"Core"');
const prod = pages.filter(p => p.production == true).length;
const ready = pages.filter(p => p.production == true && p.status == "termine").length;
const percent = prod > 0 ? Math.round((ready / prod) * 100) : 0;

dv.header(3, "Préparation Production : " + percent + "%");
dv.paragraph(`Modules prêts : ${ready} / ${prod}`);
```

# 🔗 Navigation rapide
- [[Dashboard_OpenClaw Light]]
- [[Dashboard_Progression_Modules]]
- [[Dashboard_Monitoring]]
- [[Dashboard_Master]]
- [[Dashboard_Documentation]]
- [[Dashboard_Architecture]]
- [[Dashboard_DevOps]]
- [[Dashboard