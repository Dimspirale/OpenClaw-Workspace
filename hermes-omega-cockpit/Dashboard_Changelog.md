# 🗒️ Dashboard Changelog

## 🔥 KPIs Changelog (DataviewJS)
```dataviewjs
const c = dv.pages('"Changelog"');
const total = c.length;
const major = c.filter(x => x.type == "major").length;
const minor = c.filter(x => x.type == "minor").length;
const patch = c.filter(x => x.type == "patch").length;
const hotfix = c.filter(x => x.type == "hotfix").length;
const missing = c.filter(x => !x.type).length;

dv.table(
  ["Indicateur", "Valeur"],
  [
    ["Total entrées", total],
    ["Major", major],
    ["Minor", minor],
    ["Patch", patch],
    ["Hotfix", hotfix],
    ["Sans type", missing],
  ]
);
```

## 🗒️ Liste complète des entrées du changelog
```dataview
TABLE file.link AS "Entrée", version, type, date, scope
FROM "Changelog"
SORT date DESC
```

## 🧩 Changelog par type
```dataview
TABLE type AS "Type", file.link AS "Entrée", version, date
FROM "Changelog"
WHERE type
SORT type ASC, date DESC
```

## 🏷️ Changelog par version
```dataview
TABLE version AS "Version", file.link AS "Entrée", type, date
FROM "Changelog"
WHERE version
SORT version DESC, date DESC
```

## 🟦 Entrées Major
```dataview
LIST FROM "Changelog" WHERE type = "major"
```

## 🟧 Entrées Minor
```dataview
LIST FROM "Changelog" WHERE type = "minor"
```

## 🟩 Entrées Patch
```dataview
LIST FROM "Changelog" WHERE type = "patch"
```

## 🟥 Hotfix
```dataview
LIST FROM "Changelog" WHERE type = "hotfix"
```

## 🧪 Entrées liées aux tests (si champ `tests: true`)
```dataview
LIST FROM "Changelog" WHERE tests = true
```

## 🧹 Entrées incomplètes (métadonnées manquantes)
```dataview
TABLE file.link AS "Entrée", version, type, date
FROM "Changelog"
WHERE !version OR !type OR !date
SORT file.name ASC
```

## 🕒 Dernières modifications
```dataview
TABLE file.link AS "Entrée", file.mtime AS "Modifié le"
FROM "Changelog"
SORT file.mtime DESC
LIMIT 20
```

## 🧭 Synthèse Changelog (DataviewJS)
```dataviewjs
const c = dv.pages('"Changelog"');
const total = c.length;
const major = c.filter(x => x.type == "major").length;
const percent = total > 0 ? Math.round((major / total) * 100) : 0;

dv.header(3, "Impact global : " + percent + "% major");
dv.paragraph(`Entrées major : ${major} / ${total}`);
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
