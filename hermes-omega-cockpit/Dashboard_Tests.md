# 🧪 Dashboard Tests

## 🔥 KPIs Tests (DataviewJS)
```dataviewjs
const t = dv.pages('"Tests"');
const total = t.length;
const passed = t.filter(x => x.result == "pass").length;
const failed = t.filter(x => x.result == "fail").length;
const skipped = t.filter(x => x.result == "skip").length;
const noResult = t.filter(x => !x.result).length;
const critical = t.filter(x => x.critical == true).length;

dv.table(
  ["Indicateur", "Valeur"],
  [
    ["Total tests", total],
    ["Réussis", passed],
    ["Échoués", failed],
    ["Ignorés", skipped],
    ["Sans résultat", noResult],
    ["Critiques", critical],
  ]
);
```

## 🧪 Liste complète des tests
```dataview
TABLE file.link AS "Test", module, type, result, last_run AS "Dernier run"
FROM "Tests"
SORT module ASC, file.name ASC
```

## 🧩 Tests par module
```dataview
TABLE module AS "Module", file.link AS "Test", type, result
FROM "Tests"
WHERE module
SORT module ASC
```

## 🧱 Tests par type
```dataview
TABLE type AS "Type", file.link AS "Test", module, result
FROM "Tests"
WHERE type
SORT type ASC
```

## 🟩 Tests réussis
```dataview
LIST FROM "Tests" WHERE result = "pass"
```

## 🟥 Tests échoués
```dataview
LIST FROM "Tests" WHERE result = "fail"
```

## 🟦 Tests ignorés
```dataview
LIST FROM "Tests" WHERE result = "skip"
```

## 🔥 Tests critiques
```dataview
LIST FROM "Tests" WHERE critical = true
```

## 🧪 Tests sans résultat
```dataview
LIST FROM "Tests" WHERE !result
```

## 🧹 Tests incomplets (métadonnées manquantes)
```dataview
TABLE file.link AS "Test", module, type, result
FROM "Tests"
WHERE !module OR !type OR !result
SORT file.name ASC
```

## 🕒 Dernières modifications
```dataview
TABLE file.link AS "Test", file.mtime AS "Modifié le"
FROM "Tests"
SORT file.mtime DESC
LIMIT 20
```

## 🧭 Synthèse Tests (DataviewJS)
```dataviewjs
const t = dv.pages('"Tests"');
const total = t.length;
const passed = t.filter(x => x.result == "pass").length;
const percent = total > 0 ? Math.round((passed / total) * 100) : 0;

dv.header(3, "Taux de réussite : " + percent + "%");
dv.paragraph(`Tests réussis : ${passed} / ${total}`);
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
- [[Dashboard_Distribution]]
- [[Dashboard_Risks]]
- [[Dashboard_Timeline]]
- [[Dashboard_Release_Train]]
- [[Core/README]]
- [[Home]]
