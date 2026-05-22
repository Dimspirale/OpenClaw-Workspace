# ⏪ Dashboard Rollback

## 🔥 KPIs Rollback (DataviewJS)
```dataviewjs
const rb = dv.pages('"Rollback"');
const total = rb.length;
const prepared = rb.filter(r => r.status == "ready").length;
const executed = rb.filter(r => r.status == "done").length;
const failed = rb.filter(r => r.status == "fail").length;
const missing = rb.filter(r => !r.status).length;

dv.table(
  ["Indicateur", "Valeur"],
  [
    ["Total rollbacks", total],
    ["Préparés", prepared],
    ["Exécutés", executed],
    ["Échecs", failed],
    ["Sans statut", missing],
  ]
);
```

## 📦 Liste complète des rollbacks
```dataview
TABLE file.link AS "Rollback", version, reason, status, date
FROM "Rollback"
SORT date DESC
```

## 🧩 Rollbacks par version
```dataview
TABLE version AS "Version", file.link AS "Rollback", reason, status, date
FROM "Rollback"
WHERE version
SORT version DESC
```

## 🧱 Rollbacks par cause
```dataview
TABLE reason AS "Cause", file.link AS "Rollback", version, status, date
FROM "Rollback"
WHERE reason
SORT reason ASC, date DESC
```

## 🟩 Rollbacks exécutés
```dataview
LIST FROM "Rollback" WHERE status = "done"
```

## 🟧 Rollbacks prêts
```dataview
LIST FROM "Rollback" WHERE status = "ready"
```

## 🟥 Rollbacks échoués
```dataview
LIST FROM "Rollback" WHERE status = "fail"
```

## ⚠️ Rollbacks critiques (si champ `critical: true`)
```dataview
LIST FROM "Rollback" WHERE critical = true
```

## 🧹 Rollbacks incomplets (métadonnées manquantes)
```dataview
TABLE file.link AS "Rollback", version, reason, status
FROM "Rollback"
WHERE !version OR !reason OR !status
SORT file.name ASC
```

## 🕒 Dernières modifications
```dataview
TABLE file.link AS "Rollback", file.mtime AS "Modifié le"
FROM "Rollback"
SORT file.mtime DESC
LIMIT 20
```

## 🧭 Synthèse Rollback (DataviewJS)
```dataviewjs
const rb = dv.pages('"Rollback"');
const total = rb.length;
const executed = rb.filter(r => r.status == "done").length;
const percent = total > 0 ? Math.round((executed / total) * 100) : 0;

dv.header(3, "Rollbacks exécutés : " + percent + "%");
dv.paragraph(`Rollbacks réalisés : ${executed} / ${total}`);
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
- [[Core/README]]
- [[Home]]
