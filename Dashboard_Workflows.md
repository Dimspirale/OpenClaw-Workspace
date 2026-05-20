# 🔁 Dashboard Workflows

## 🔥 KPIs Workflows (DataviewJS)
```dataviewjs
const wf = dv.pages('"Workflows"');
const total = wf.length;
const active = wf.filter(w => w.status == "actif").length;
const draft = wf.filter(w => w.status == "brouillon").length;
const deprecated = wf.filter(w => w.status == "obsolete").length;
const missing = wf.filter(w => !w.status).length;

dv.table(
  ["Indicateur", "Valeur"],
  [
    ["Total workflows", total],
    ["Actifs", active],
    ["Brouillons", draft],
    ["Obsolètes", deprecated],
    ["Sans statut", missing],
  ]
);
```

## 🔁 Liste complète des workflows
```dataview
TABLE file.link AS "Workflow", category, scope, status
FROM "Workflows"
SORT category ASC, file.name ASC
```

## 🧩 Workflows par catégorie
```dataview
TABLE category AS "Catégorie", file.link AS "Workflow", scope, status
FROM "Workflows"
WHERE category
SORT category ASC
```

## 🗺️ Workflows par scope
```dataview
TABLE scope AS "Scope", file.link AS "Workflow", category, status
FROM "Workflows"
WHERE scope
SORT scope ASC
```

## 🟩 Workflows actifs
```dataview
LIST FROM "Workflows" WHERE status = "actif"
```

## 🟧 Workflows en brouillon
```dataview
LIST FROM "Workflows" WHERE status = "brouillon"
```

## 🟥 Workflows obsolètes
```dataview
LIST FROM "Workflows" WHERE status = "obsolete"
```

## ⚠️ Workflows critiques (si champ `critical: true`)
```dataview
LIST FROM "Workflows" WHERE critical = true
```

## 🧹 Workflows incomplets (métadonnées manquantes)
```dataview
TABLE file.link AS "Workflow", category, scope
FROM "Workflows"
WHERE !category OR !scope
SORT file.name ASC
```

## 🕒 Dernières modifications
```dataview
TABLE file.link AS "Workflow", file.mtime AS "Modifié le"
FROM "Workflows"
SORT file.mtime DESC
LIMIT 20
```

## 🧭 Synthèse Workflows (DataviewJS)
```dataviewjs
const wf = dv.pages('"Workflows"');
const total = wf.length;
const active = wf.filter(w => w.status == "actif").length;
const percent = total > 0 ? Math.round((active / total) * 100) : 0;

dv.header(3, "Workflows opérationnels : " + percent + "%");
dv.paragraph(`Workflows actifs : ${active} / ${total}`);
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
- [[Dashboard_Analytics]]
- [[Dashboard_Automation]]
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
