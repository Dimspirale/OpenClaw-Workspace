# 🌍 Dashboard Environments

## 🔥 KPIs Environments (DataviewJS)
```dataviewjs
const env = dv.pages('"Environments"');
const total = env.length;
const prod = env.filter(e => e.type == "production").length;
const staging = env.filter(e => e.type == "staging").length;
const dev = env.filter(e => e.type == "development").length;
const down = env.filter(e => e.status == "down").length;
const missing = env.filter(e => !e.status || !e.type).length;

dv.table(
  ["Indicateur", "Valeur"],
  [
    ["Total environnements", total],
    ["Production", prod],
    ["Staging", staging],
    ["Développement", dev],
    ["En panne", down],
    ["Métadonnées manquantes", missing],
  ]
);
```

## 🌍 Liste complète des environnements
```dataview
TABLE file.link AS "Environnement", type, url, status, owner
FROM "Environments"
SORT type ASC, file.name ASC
```

## 🧩 Environnements par type
```dataview
TABLE type AS "Type", file.link AS "Environnement", url, status, owner
FROM "Environments"
WHERE type
SORT type ASC
```

## 🟩 Environnements opérationnels
```dataview
LIST FROM "Environments" WHERE status = "up"
```

## 🟥 Environnements en panne
```dataview
LIST FROM "Environments" WHERE status = "down"
```

## 🟧 Environnements instables (si champ `unstable: true`)
```dataview
LIST FROM "Environments" WHERE unstable = true
```

## 👤 Environnements par responsable
```dataview
TABLE owner AS "Responsable", file.link AS "Environnement", type, status
FROM "Environments"
WHERE owner
SORT owner ASC
```

## 🔐 Environnements nécessitant une attention (si champ `security_risk: true`)
```dataview
LIST FROM "Environments" WHERE security_risk = true
```

## 🧹 Environnements incomplets (métadonnées manquantes)
```dataview
TABLE file.link AS "Environnement", type, url, status
FROM "Environments"
WHERE !type OR !url OR !status
SORT file.name ASC
```

## 🕒 Dernières modifications
```dataview
TABLE file.link AS "Environnement", file.mtime AS "Modifié le"
FROM "Environments"
SORT file.mtime DESC
LIMIT 20
```

## 🧭 Synthèse Environments (DataviewJS)
```dataviewjs
const env = dv.pages('"Environments"');
const total = env.length;
const up = env.filter(e => e.status == "up").length;
const percent = total > 0 ? Math.round((up / total) * 100) : 0;

dv.header(3, "Disponibilité globale : " + percent + "%");
dv.paragraph(`Environnements opérationnels : ${up} / ${total}`);
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
- [[Dashboard_Pipelines]]
- [[Dashboard_Tests]]
- [[Dashboard_Distribution]]
- [[Dashboard_Risks]]
- [[Dashboard_Timeline]]
- [[Dashboard_Release_Train]]
- [[Core/README]]
- [[Home]]
