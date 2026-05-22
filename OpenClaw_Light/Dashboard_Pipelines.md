# 🛠️ Dashboard Pipelines

## 🔥 KPIs Pipelines (DataviewJS)
```dataviewjs
const p = dv.pages('"Pipelines"');
const total = p.length;
const success = p.filter(x => x.status == "success").length;
const failed = p.filter(x => x.status == "fail").length;
const running = p.filter(x => x.status == "running").length;
const paused = p.filter(x => x.status == "paused").length;
const scheduled = p.filter(x => x.status == "scheduled").length;
const missing = p.filter(x => !x.status).length;

dv.table(
  ["Indicateur", "Valeur"],
  [
    ["Total pipelines", total],
    ["Succès", success],
    ["Échecs", failed],
    ["En cours", running],
    ["En pause", paused],
    ["Planifiés", scheduled],
    ["Sans statut", missing],
  ]
);
```

## 🛠️ Liste complète des pipelines
```dataview
TABLE file.link AS "Pipeline", type, trigger, target, status
FROM "Pipelines"
SORT type ASC, file.name ASC
```

## 🧩 Pipelines par type
```dataview
TABLE type AS "Type", file.link AS "Pipeline", trigger, target, status
FROM "Pipelines"
WHERE type
SORT type ASC
```

## ⏱️ Pipelines par trigger
```dataview
TABLE trigger AS "Déclencheur", file.link AS "Pipeline", type, target, status
FROM "Pipelines"
WHERE trigger
SORT trigger ASC
```

## 🎯 Pipelines par cible
```dataview
TABLE target AS "Cible", file.link AS "Pipeline", type, trigger, status
FROM "Pipelines"
WHERE target
SORT target ASC
```

## 🟩 Pipelines réussis
```dataview
LIST FROM "Pipelines" WHERE status = "success"
```

## 🟥 Pipelines échoués
```dataview
LIST FROM "Pipelines" WHERE status = "fail"
```

## 🟧 Pipelines en cours
```dataview
LIST FROM "Pipelines" WHERE status = "running"
```

## 🟦 Pipelines planifiés
```dataview
LIST FROM "Pipelines" WHERE status = "scheduled"
```

## 🟨 Pipelines en pause
```dataview
LIST FROM "Pipelines" WHERE status = "paused"
```

## 🔥 Pipelines critiques (si champ `critical: true`)
```dataview
LIST FROM "Pipelines" WHERE critical = true
```

## 🧹 Pipelines incomplets (métadonnées manquantes)
```dataview
TABLE file.link AS "Pipeline", type, trigger, target, status
FROM "Pipelines"
WHERE !type OR !trigger OR !target OR !status
SORT file.name ASC
```

## 🕒 Dernières modifications
```dataview
TABLE file.link AS "Pipeline", file.mtime AS "Modifié le"
FROM "Pipelines"
SORT file.mtime DESC
LIMIT 20
```

## 🧭 Synthèse Pipelines (DataviewJS)
```dataviewjs
const p = dv.pages('"Pipelines"');
const total = p.length;
const success = p.filter(x => x.status == "success").length;
const percent = total > 0 ? Math.round((success / total) * 100) : 0;

dv.header(3, "Fiabilité des pipelines : " + percent + "%");
dv.paragraph(`Pipelines réussis : ${success} / ${total}`);
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
- [[Dashboard_Builds]]
- [[Dashboard_Environments]]
- [[Dashboard_Tests]]
- [[Dashboard_Distribution]]
- [[Dashboard_Risks]]
- [[Dashboard_Timeline]]
- [[Dashboard_Release_Train]]
- [[Core/README]]
- [[Home]]
