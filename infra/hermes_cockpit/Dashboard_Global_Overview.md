# 🌐 Dashboard Global Overview

## 🔥 KPIs Globaux (DataviewJS)
```dataviewjs
const core = dv.pages('"Core"');
const total = core.length;
const done = core.filter(p => p.status == "termine").length;
const inProgress = core.filter(p => p.status == "en_cours").length;
const blocked = core.filter(p => p.status == "bloque").length;
const critical = core.filter(p => p.critical == true).length;

dv.table(
  ["Indicateur", "Valeur"],
  [
    ["Total modules", total],
    ["Terminés", done],
    ["En cours", inProgress],
    ["Bloqués", blocked],
    ["Critiques", critical],
  ]
);
```

## 📊 Vue d’ensemble par statut
```dataview
TABLE status AS "Statut", file.link AS "Module"
FROM "Core"
WHERE status
SORT status ASC, file.name ASC
```

## 🧩 Vue d’ensemble par dossier
```dataview
TABLE file.folder AS "Dossier", status, file.link AS "Module"
FROM "Core"
SORT file.folder ASC, file.name ASC
```

## 🚨 Anomalies globales
```dataview
TABLE file.link AS "Module", status
FROM "Core"
WHERE !status OR contains(file.content, "⚠️") OR contains(file.content, "❗") OR contains(file.content, "🔥")
SORT file.name ASC
```

## 🧱 Modules critiques
```dataview
LIST FROM "Core" WHERE critical = true
```

## 🧪 Modules en production
```dataview
TABLE file.link AS "Module", status
FROM "Core"
WHERE production = true
SORT file.name ASC
```

## 🧹 Modules incomplets (métadonnées manquantes)
```dataview
TABLE file.link AS "Module", status
FROM "Core"
WHERE !status OR !file.folder
SORT file.name ASC
```

## 🕒 Dernières modifications globales
```dataview
TABLE file.link AS "Module", file.mtime AS "Modifié le"
FROM "Core"
SORT file.mtime DESC
LIMIT 25
```

## 📈 Synthèse globale (DataviewJS)
```dataviewjs
const core = dv.pages('"Core"');
const total = core.length;
const done = core.filter(p => p.status == "termine").length;
const percent = total > 0 ? Math.round((done / total) * 100) : 0;

dv.header(3, "Progression globale : " + percent + "%");
dv.paragraph(`Modules terminés : ${done} / ${total}`);
```

# 🔗 Navigation rapide
- [[Dashboard_Master]]
- [[Dashboard_Progression_Modules]]
- [[Dashboard_Monitoring]]
- [[Dashboard_Production]]
- [[Dashboard_Documentation]]
- [[Dashboard_Architecture]]
- [[Dashboard_DevOps]]
- [[Dashboard_Assets]]
- [[Dashboard_Design]]
- [[Dashboard_Release]]
- [[Dashboard_Quality]]
- [[Dashboard_Security]]
- [[Dashboard_Integration]]
- [[Dashboard_Performance]]
- [[Dashboard_Analytics]]
- [[Dashboard_Automation]]
- [[Dashboard_Workflows]]
- [[Dashboard_Policies]]
- [[Dashboard_Versioning]]
- [[Dashboard_Changelog]]
- [[Dashboard_Rollback]]
- [[Dashboard_Builds]]
- [[Dashboard_Environments]]
- [[Dashboard_Pipelines]]
- [[Dashboard_Tests]]
- [[Dashboard_Distribution]]
- [[Core/README]]
- [[Home]]
