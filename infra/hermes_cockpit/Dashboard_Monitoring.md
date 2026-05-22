# 📡 Dashboard Monitoring (Advanced)

## 🔥 KPIs Monitoring (DataviewJS)
```dataviewjs
const m = dv.pages('"Monitoring"');
const total = m.length;
const ok = m.filter(x => x.status == "ok").length;
const warn = m.filter(x => x.status == "warn").length;
const fail = m.filter(x => x.status == "fail").length;
const critical = m.filter(x => x.critical == true).length;
const missing = m.filter(x => !x.status).length;

dv.table(
  ["Indicateur", "Valeur"],
  [
    ["Total checks", total],
    ["OK", ok],
    ["Avertissements", warn],
    ["Échecs", fail],
    ["Critiques", critical],
    ["Sans statut", missing],
  ]
);
```

## 📡 Liste complète des checks
```dataview
TABLE file.link AS "Check", category, target, status, latency, uptime
FROM "Monitoring"
SORT category ASC, file.name ASC
```

## 🧩 Checks par catégorie
```dataview
TABLE category AS "Catégorie", file.link AS "Check", target, status
FROM "Monitoring"
WHERE category
SORT category ASC
```

## 🎯 Checks par cible
```dataview
TABLE target AS "Cible", file.link AS "Check", category, status
FROM "Monitoring"
WHERE target
SORT target ASC
```

## 📈 Latences (si champ `latency`)
```dataview
TABLE file.link AS "Check", latency AS "Latence (ms)", status
FROM "Monitoring"
WHERE latency
SORT latency DESC
```

## 🟩 Checks OK
```dataview
LIST FROM "Monitoring" WHERE status = "ok"
```

## 🟧 Checks en avertissement
```dataview
LIST FROM "Monitoring" WHERE status = "warn"
```

## 🟥 Checks échoués
```dataview
LIST FROM "Monitoring" WHERE status = "fail"
```

## 🔥 Checks critiques
```dataview
LIST FROM "Monitoring" WHERE critical = true
```

## 🧹 Checks incomplets (métadonnées manquantes)
```dataview
TABLE file.link AS "Check", category, target, status
FROM "Monitoring"
WHERE !category OR !target OR !status
SORT file.name ASC
```

## 🕒 Dernières modifications
```dataview
TABLE file.link AS "Check", file.mtime AS "Modifié le"
FROM "Monitoring"
SORT file.mtime DESC
LIMIT 20
```

## 📊 Synthèse Monitoring (DataviewJS)
```dataviewjs
const m = dv.pages('"Monitoring"');
const total = m.length;
const ok = m.filter(x => x.status == "ok").length;
const percent = total > 0 ? Math.round((ok / total) * 100) : 0;

dv.header(3, "Santé globale : " + percent + "%");
dv.paragraph(`Checks OK : ${ok} / ${total}`);
```

# 🔗 Navigation rapide
- [[Dashboard_OpenClaw Light]]
- [[Dashboard_Progression_Modules]]
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
- [[Core/README]]
- [[Home]]
