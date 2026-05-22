# 🤖 Dashboard Automation

## 🔥 KPIs Automation (DataviewJS)
```dataviewjs
const a = dv.pages('"Automation"');
const total = a.length;
const active = a.filter(x => x.status == "active").length;
const paused = a.filter(x => x.status == "paused").length;
const failed = a.filter(x => x.status == "failed").length;
const scheduled = a.filter(x => x.status == "scheduled").length;
const critical = a.filter(x => x.critical == true).length;
const missing = a.filter(x => !x.status).length;

dv.table(
  ["Indicateur", "Valeur"],
  [
    ["Total automatisations", total],
    ["Actives", active],
    ["En pause", paused],
    ["Échouées", failed],
    ["Planifiées", scheduled],
    ["Critiques", critical],
    ["Sans statut", missing],
  ]
);
```

## 🤖 Liste complète des automatisations
```dataview
TABLE file.link AS "Automation", type, trigger, target, status
FROM "Automation"
SORT type ASC, file.name ASC
```

## 🧩 Automatisations par type
```dataview
TABLE type AS "Type", file.link AS "Automation", trigger, target, status
FROM "Automation"
WHERE type
SORT type ASC
```

## 🎯 Automatisations par cible
```dataview
TABLE target AS "Cible", file.link AS "Automation", type, trigger, status
FROM "Automation"
WHERE target
SORT target ASC
```

## ⏱️ Automatisations par trigger
```dataview
TABLE trigger AS "Déclencheur", file.link AS "Automation", type, target, status
FROM "Automation"
WHERE trigger
SORT trigger ASC
```

## 🟩 Automatisations actives
```dataview
LIST FROM "Automation" WHERE status = "active"
```

## 🟧 Automatisations en pause
```dataview
LIST FROM "Automation" WHERE status = "paused"
```

## 🟥 Automatisations échouées
```dataview
LIST FROM "Automation" WHERE status = "failed"
```

## 🟦 Automatisations planifiées
```dataview
LIST FROM "Automation" WHERE status = "scheduled"
```

## 🔥 Automatisations critiques
```dataview
LIST FROM "Automation" WHERE critical = true
```

## 🧹 Automatisations incomplètes (métadonnées manquantes)
```dataview
TABLE file.link AS "Automation", type, trigger, target, status
FROM "Automation"
WHERE !type OR !trigger OR !target OR !status
SORT file.name ASC
```

## 🕒 Dernières modifications
```dataview
TABLE file.link AS "Automation", file.mtime AS "Modifié le"
FROM "Automation"
SORT file.mtime DESC
LIMIT 20
```

## 🧭 Synthèse Automation (DataviewJS)
```dataviewjs
const a = dv.pages('"Automation"');
const total = a.length;
const active = a.filter(x => x.status == "active").length;
const percent = total > 0 ? Math.round((active / total) * 100) : 0;

dv.header(3, "Automatisation active : " + percent + "%");
dv.paragraph(`Automatisations actives : ${active} / ${total}`);
```

# 🔗 Navigation rapide
- [[Dashboard_Global_Overview]]
- [[Dashboard_Master]]
- [[Dashboard_Timeline]]
- [[Dashboard_Risks]]
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
