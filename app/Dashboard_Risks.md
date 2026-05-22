# ⚠️ Dashboard Risks

## 🔥 KPIs Risks (DataviewJS)
```dataviewjs
const r = dv.pages('"Risks"');
const total = r.length;
const critical = r.filter(x => x.level == "critical").length;
const high = r.filter(x => x.level == "high").length;
const medium = r.filter(x => x.level == "medium").length;
const low = r.filter(x => x.level == "low").length;
const missing = r.filter(x => !x.level).length;

dv.table(
  ["Indicateur", "Valeur"],
  [
    ["Total risques", total],
    ["Critiques", critical],
    ["Élevés", high],
    ["Moyens", medium],
    ["Faibles", low],
    ["Sans niveau", missing],
  ]
);
```

## ⚠️ Liste complète des risques
```dataview
TABLE file.link AS "Risque", level AS "Niveau", probability AS "Probabilité", impact AS "Impact", owner AS "Responsable", status
FROM "Risks"
SORT level DESC, file.name ASC
```

## 🧩 Risques par niveau
```dataview
TABLE level AS "Niveau", file.link AS "Risque", probability, impact, owner, status
FROM "Risks"
WHERE level
SORT level DESC
```

## 🎯 Risques par responsable
```dataview
TABLE owner AS "Responsable", file.link AS "Risque", level, probability, impact, status
FROM "Risks"
WHERE owner
SORT owner ASC
```

## 📊 Matrice Probabilité × Impact
```dataview
TABLE file.link AS "Risque", probability AS "Probabilité", impact AS "Impact", level
FROM "Risks"
WHERE probability AND impact
SORT probability DESC, impact DESC
```

## 🟩 Risques faibles
```dataview
LIST FROM "Risks" WHERE level = "low"
```

## 🟧 Risques moyens
```dataview
LIST FROM "Risks" WHERE level = "medium"
```

## 🟥 Risques élevés
```dataview
LIST FROM "Risks" WHERE level = "high"
```

## 🔥 Risques critiques
```dataview
LIST FROM "Risks" WHERE level = "critical"
```

## 🧹 Risques incomplets (métadonnées manquantes)
```dataview
TABLE file.link AS "Risque", level, probability, impact, owner
FROM "Risks"
WHERE !level OR !probability OR !impact OR !owner
SORT file.name ASC
```

## 🕒 Dernières modifications
```dataview
TABLE file.link AS "Risque", file.mtime AS "Modifié le"
FROM "Risks"
SORT file.mtime DESC
LIMIT 20
```

## 🧭 Synthèse Risks (DataviewJS)
```dataviewjs
const r = dv.pages('"Risks"');
const total = r.length;
const severe = r.filter(x => x.level == "critical" || x.level == "high").length;
const percent = total > 0 ? Math.round((severe / total) * 100) : 0;

dv.header(3, "Risques sévères : " + percent + "%");
dv.paragraph(`Risques critiques + élevés : ${severe} / ${total}`);
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
- [[Dashboard_Distribution]]
- [[Dashboard_Timeline]]
- [[Dashboard_Release_Train]]
- [[Core/README]]
- [[Home]]
