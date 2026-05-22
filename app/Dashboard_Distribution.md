# 📦 Dashboard Distribution

## 🔥 KPIs Distribution (DataviewJS)
```dataviewjs
const d = dv.pages('"Distribution"');
const total = d.length;
const published = d.filter(x => x.status == "published").length;
const pending = d.filter(x => x.status == "pending").length;
const failed = d.filter(x => x.status == "failed").length;
const scheduled = d.filter(x => x.status == "scheduled").length;
const critical = d.filter(x => x.critical == true).length;
const missing = d.filter(x => !x.status).length;

dv.table(
  ["Indicateur", "Valeur"],
  [
    ["Total distributions", total],
    ["Publiées", published],
    ["En attente", pending],
    ["Échouées", failed],
    ["Planifiées", scheduled],
    ["Critiques", critical],
    ["Sans statut", missing],
  ]
);
```

## 📦 Liste complète des distributions
```dataview
TABLE file.link AS "Distribution", version, target, status, date
FROM "Distribution"
SORT date DESC
```

## 🧩 Distributions par version
```dataview
TABLE version AS "Version", file.link AS "Distribution", target, status, date
FROM "Distribution"
WHERE version
SORT version DESC, date DESC
```

## 🎯 Distributions par cible
```dataview
TABLE target AS "Cible", file.link AS "Distribution", version, status, date
FROM "Distribution"
WHERE target
SORT target ASC, date DESC
```

## 🟩 Distributions publiées
```dataview
LIST FROM "Distribution" WHERE status = "published"
```

## 🟧 Distributions en attente
```dataview
LIST FROM "Distribution" WHERE status = "pending"
```

## 🟥 Distributions échouées
```dataview
LIST FROM "Distribution" WHERE status = "failed"
```

## 🟦 Distributions planifiées
```dataview
LIST FROM "Distribution" WHERE status = "scheduled"
```

## 🔥 Distributions critiques
```dataview
LIST FROM "Distribution" WHERE critical = true
```

## 🧹 Distributions incomplètes (métadonnées manquantes)
```dataview
TABLE file.link AS "Distribution", version, target, status
FROM "Distribution"
WHERE !version OR !target OR !status
SORT file.name ASC
```

## 🕒 Dernières modifications
```dataview
TABLE file.link AS "Distribution", file.mtime AS "Modifié le"
FROM "Distribution"
SORT file.mtime DESC
LIMIT 20
```

## 🧭 Synthèse Distribution (DataviewJS)
```dataviewjs
const d = dv.pages('"Distribution"');
const total = d.length;
const published = d.filter(x => x.status == "published").length;
const percent = total > 0 ? Math.round((published / total) * 100) : 0;

dv.header(3, "Taux de publication : " + percent + "%");
dv.paragraph(`Distributions publiées : ${published} / ${total}`);
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
- [[Dashboard_Pipelines]]
- [[Dashboard_Tests]]
- [[Dashboard_Risks]]
- [[Dashboard_Timeline]]
- [[Dashboard_Release_Train]]
- [[Core/README]]
- [[Home]]
