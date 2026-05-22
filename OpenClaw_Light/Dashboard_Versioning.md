# 🏷️ Dashboard Versioning

## 🔥 KPIs Versioning (DataviewJS)
```dataviewjs
const v = dv.pages('"Versioning"');
const total = v.length;
const stable = v.filter(x => x.channel == "stable").length;
const rc = v.filter(x => x.channel == "rc").length;
const beta = v.filter(x => x.channel == "beta").length;
const deprecated = v.filter(x => x.status == "deprecated").length;
const missing = v.filter(x => !x.channel).length;

dv.table(
  ["Indicateur", "Valeur"],
  [
    ["Total versions", total],
    ["Stable", stable],
    ["Release Candidates", rc],
    ["Beta", beta],
    ["Obsolètes", deprecated],
    ["Sans canal", missing],
  ]
);
```

## 🏷️ Liste complète des versions
```dataview
TABLE file.link AS "Version", channel AS "Canal", status, release_date AS "Date", notes
FROM "Versioning"
SORT release_date DESC
```

## 🧩 Versions par canal
```dataview
TABLE channel AS "Canal", file.link AS "Version", status, release_date
FROM "Versioning"
WHERE channel
SORT channel ASC, release_date DESC
```

## 🟩 Versions stables
```dataview
LIST FROM "Versioning" WHERE channel = "stable"
```

## 🟦 Release Candidates
```dataview
LIST FROM "Versioning" WHERE channel = "rc"
```

## 🟧 Versions Beta
```dataview
LIST FROM "Versioning" WHERE channel = "beta"
```

## 🟥 Versions obsolètes
```dataview
LIST FROM "Versioning" WHERE status = "deprecated"
```

## 🧪 Versions en test (si champ `testing: true`)
```dataview
LIST FROM "Versioning" WHERE testing = true
```

## 🧹 Versions incomplètes (métadonnées manquantes)
```dataview
TABLE file.link AS "Version", channel, status, release_date
FROM "Versioning"
WHERE !channel OR !status OR !release_date
SORT file.name ASC
```

## 🕒 Dernières modifications
```dataview
TABLE file.link AS "Version", file.mtime AS "Modifié le"
FROM "Versioning"
SORT file.mtime DESC
LIMIT 20
```

## 🧭 Synthèse Versioning (DataviewJS)
```dataviewjs
const v = dv.pages('"Versioning"');
const total = v.length;
const stable = v.filter(x => x.channel == "stable").length;
const percent = total > 0 ? Math.round((stable / total) * 100) : 0;

dv.header(3, "Stabilité globale : " + percent + "%");
dv.paragraph(`Versions stables : ${stable} / ${total}`);
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
