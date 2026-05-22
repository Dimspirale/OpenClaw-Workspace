# 🏗️ Dashboard Builds

## 🔥 KPIs Builds (DataviewJS)
```dataviewjs
const b = dv.pages('"Builds"');
const total = b.length;
const success = b.filter(x => x.status == "success").length;
const failed = b.filter(x => x.status == "fail").length;
const running = b.filter(x => x.status == "running").length;
const queued = b.filter(x => x.status == "queued").length;
const missing = b.filter(x => !x.status).length;

dv.table(
  ["Indicateur", "Valeur"],
  [
    ["Total builds", total],
    ["Succès", success],
    ["Échecs", failed],
    ["En cours", running],
    ["En attente", queued],
    ["Sans statut", missing],
  ]
);
```

## 🏗️ Liste complète des builds
```dataview
TABLE file.link AS "Build", pipeline, version, status, date
FROM "Builds"
SORT date DESC
```

## 🧩 Builds par pipeline
```dataview
TABLE pipeline AS "Pipeline", file.link AS "Build", version, status, date
FROM "Builds"
WHERE pipeline
SORT pipeline ASC, date DESC
```

## 🗂️ Builds par version
```dataview
TABLE version AS "Version", file.link AS "Build", pipeline, status, date
FROM "Builds"
WHERE version
SORT version DESC, date DESC
```

## 🟩 Builds réussis
```dataview
LIST FROM "Builds" WHERE status = "success"
```

## 🟥 Builds échoués
```dataview
LIST FROM "Builds" WHERE status = "fail"
```

## 🟧 Builds en cours
```dataview
LIST FROM "Builds" WHERE status = "running"
```

## 🟦 Builds en attente
```dataview
LIST FROM "Builds" WHERE status = "queued"
```

## ⚠️ Builds critiques (si champ `critical: true`)
```dataview
LIST FROM "Builds" WHERE critical = true
```

## 🧹 Builds incomplets (métadonnées manquantes)
```dataview
TABLE file.link AS "Build", pipeline, version, status
FROM "Builds"
WHERE !pipeline OR !version OR !status
SORT file.name ASC
```

## 🕒 Dernières modifications
```dataview
TABLE file.link AS "Build", file.mtime AS "Modifié le"
FROM "Builds"
SORT file.mtime DESC
LIMIT 20
```

## 🧭 Synthèse Builds (DataviewJS)
```dataviewjs
const b = dv.pages('"Builds"');
const total = b.length;
const success = b.filter(x => x.status == "success").length;
const percent = total > 0 ? Math.round((success / total) * 100) : 0;

dv.header(3, "Stabilité des builds : " + percent + "%");
dv.paragraph(`Builds réussis : ${success} / ${total}`);
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
- [[Dashboard_Workflows]]
- [[Dashboard_Policies]]
- [[Dashboard_Versioning]]
- [[Dashboard_Changelog]]
- [[Dashboard_Rollback]]
- [[Dashboard_Environments]]
- [[Dashboard_Pipelines]]
- [[Dashboard_Tests]]
- [[Dashboard_Distribution]]
- [[Dashboard_Risks]]
- [[Dashboard_Timeline]]
- [[Dashboard_Release_Train]]
- [[Core/README]]
- [[Home]]
