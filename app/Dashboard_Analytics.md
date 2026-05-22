# 📊 Dashboard Analytics

## 🔥 KPIs Analytics (DataviewJS)
```dataviewjs
const ana = dv.pages('"Analytics"');
const total = ana.length;
const complete = ana.filter(a => a.status == "termine").length;
const inProgress = ana.filter(a => a.status == "en_cours").length;
const blocked = ana.filter(a => a.status == "bloque").length;
const missing = ana.filter(a => !a.status).length;

dv.table(
  ["Indicateur", "Valeur"],
  [
    ["Total analyses", total],
    ["Terminées", complete],
    ["En cours", inProgress],
    ["Bloquées", blocked],
    ["Sans statut", missing],
  ]
);
```

## 📈 Liste complète des analyses
```dataview
TABLE file.link AS "Analyse", category, module, metric, status
FROM "Analytics"
SORT category ASC, file.name ASC
```

## 🧩 Analyses par catégorie
```dataview
TABLE category AS "Catégorie", file.link AS "Analyse", module, metric, status
FROM "Analytics"
WHERE category
SORT category ASC
```

## 🧱 Analyses par module
```dataview
TABLE module AS "Module", file.link AS "Analyse", category, metric, status
FROM "Analytics"
WHERE module
SORT module ASC
```

## 🟩 Analyses terminées
```dataview
LIST FROM "Analytics" WHERE status = "termine"
```

## 🟧 Analyses en cours
```dataview
LIST FROM "Analytics" WHERE status = "en_cours"
```

## 🟥 Analyses bloquées
```dataview
LIST FROM "Analytics" WHERE status = "bloque"
```

## ⚠️ Analyses critiques (si champ `critical: true`)
```dataview
LIST FROM "Analytics" WHERE critical = true
```

## 🧹 Analyses incomplètes (métadonnées manquantes)
```dataview
TABLE file.link AS "Analyse", category, module, metric
FROM "Analytics"
WHERE !category OR !module OR !metric
SORT file.name ASC
```

## 🕒 Dernières modifications
```dataview
TABLE file.link AS "Analyse", file.mtime AS "Modifié le"
FROM "Analytics"
SORT file.mtime DESC
LIMIT 20
```

## 🧭 Synthèse Analytics (DataviewJS)
```dataviewjs
const ana = dv.pages('"Analytics"');
const total = ana.length;
const complete = ana.filter(a => a.status == "termine").length;
const percent = total > 0 ? Math.round((complete / total) * 100) : 0;

dv.header(3, "Avancement analytics : " + percent + "%");
dv.paragraph(`Analyses terminées : ${complete} / ${total}`);
```

# 🔗 Navigation rapide
- [[Dashboard_OpenClaw Light]]
- [[Dashboard_Progression_Modules]]
- [[Dashboard_Monitoring]]
- [[Dashboard_Production]]
- [[Dashboard_Master]]
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
- [[Dashboard_Risks]]
- [[Dashboard_Timeline]]
- [[Dashboard_Release_Train]]
- [[Core/README]]
- [[Home]]
