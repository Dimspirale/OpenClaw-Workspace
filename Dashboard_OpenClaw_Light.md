# 📊 Dashboard OpenClaw Light — Cockpit Central

## 🔥 KPIs Globaux (DataviewJS)
```dataviewjs
const all = dv.pages('"."')
    .where(p => p.file.path.includes("OpenClaw") || p.file.path.includes("Core"));

const total = all.length;
const done = all.filter(p => ["done","success","published"].includes(p.status)).length;
const inProgress = all.filter(p => p.status == "in_progress").length;
const planned = all.filter(p => p.status == "planned").length;
const critical = all.filter(p => p.critical == true).length;
const missing = all.filter(p => !p.status).length;

dv.table(
  ["Indicateur", "Valeur"],
  [
    ["Total fichiers", total],
    ["Finalisés", done],
    ["En cours", inProgress],
    ["Planifiés", planned],
    ["Critiques", critical],
    ["Sans statut", missing],
  ]
);
```

---

# 🧭 Navigation Principale
```dataview
TABLE file.link AS "Section", description
FROM "Core"
WHERE type = "section"
SORT file.name ASC
```

---

# 🧩 Vue Modulaire (Modules OpenClaw Light)
```dataview
TABLE module AS "Module", file.link AS "Fichier", status
FROM ""
WHERE module
SORT module ASC
```

---

# 🗂️ Synthèse par Domaines
```dataview
TABLE domain AS "Domaine", file.link AS "Fichier", status
FROM ""
WHERE domain
SORT domain ASC
```

---

# 🟦 Synthèse des Statuts
```dataview
TABLE status AS "Statut", length(rows) AS "Nombre"
FROM ""
GROUP BY status
SORT length(rows) DESC
```

---

# 🧹 Fichiers Incomplets
```dataview
TABLE file.link AS "Fichier", status, module, domain
FROM ""
WHERE !status OR !module OR !domain
SORT file.name ASC
```

---

# 🕒 Dernières Modifications
```dataview
TABLE file.link AS "Fichier", file.mtime AS "Modifié le", status
FROM ""
SORT file.mtime DESC
LIMIT 25
```

---

# 🧠 Synthèse Finale (DataviewJS)
```dataviewjs
const all = dv.pages('"."');
const total = all.length;
const done = all.filter(p => ["done","success","published"].includes(p.status)).length;
const percent = total > 0 ? Math.round((done / total) * 100) : 0;

dv.header(3, "Avancement global OpenClaw Light : " + percent + "%");
dv.paragraph(`Éléments finalisés : ${done} / ${total}`);
```

---

# 🔗 Navigation rapide
- [[Dashboard_Master]]
- [[Dashboard_Progression_Modules]]
- [[Dashboard_Monitoring]]
- [[Dashboard_Production]]
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
- [[Dashboard_Risks]]
- [[Dashboard_Timeline]]
- [[Dashboard_Release_Train]]
- [[Core/README]]
- [[Home]]
