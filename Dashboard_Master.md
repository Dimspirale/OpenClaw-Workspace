# 🧠 Dashboard Master — Synthèse Globale Ultime

## 🔥 KPIs Globaux (DataviewJS)
```dataviewjs
const all = dv.pages('"."')
    .where(p => p.file.path.startsWith("OpenClaw") || p.file.path.startsWith("Core"));

const total = all.length;
const withStatus = all.filter(p => p.status).length;
const withoutStatus = total - withStatus;

const critical = all.filter(p => p.critical == true).length;
const outdated = all.filter(p => p.status == "obsolete").length;

dv.table(
  ["Indicateur", "Valeur"],
  [
    ["Total fichiers", total],
    ["Avec statut", withStatus],
    ["Sans statut", withoutStatus],
    ["Critiques", critical],
    ["Obsolètes", outdated],
  ]
);
```

---

# 📊 Synthèse par Domaines (DataviewJS)
```dataviewjs
const domains = [
  "Monitoring", "Production", "Builds", "Pipelines", "Tests",
  "Environments", "Distribution", "Release_Train", "Timeline",
  "Versioning", "Changelog", "Rollback", "Risks",
  "Policies", "Workflows", "Automation", "Analytics",
  "Performance", "Quality", "Security", "Integration",
  "Architecture", "Documentation", "Design", "Assets"
];

let rows = [];

for (let d of domains) {
    const pages = dv.pages(`"${d}"`);
    rows.push([
        d,
        pages.length,
        pages.filter(p => p.status == "done" || p.status == "success" || p.status == "published").length,
        pages.filter(p => p.critical == true).length,
        pages.filter(p => !p.status).length
    ]);
}

dv.table(
  ["Domaine", "Total", "OK", "Critiques", "Sans statut"],
  rows
);
```

---

# 🧩 Vue Modulaire (Progression par Module)
```dataview
TABLE module AS "Module", file.link AS "Fichier", status
FROM ""
WHERE module
SORT module ASC
```

---

# 🟦 Synthèse des Statuts (DataviewJS)
```dataviewjs
const pages = dv.pages('"."');

const statuses = ["planned", "in_progress", "done", "success", "fail", "obsolete", "published", "pending", "delayed"];
let rows = [];

for (let s of statuses) {
    rows.push([s, pages.filter(p => p.status == s).length]);
}

dv.table(["Statut", "Nombre"], rows);
```

---

# 🧹 Fichiers Incomplets (Métadonnées Manquantes)
```dataview
TABLE file.link AS "Fichier", status, module, type
FROM ""
WHERE !status OR !module OR !type
SORT file.name ASC
```

---

# 🕒 Dernières Modifications Globales
```dataview
TABLE file.link AS "Fichier", file.mtime AS "Modifié le", status
FROM ""
SORT file.mtime DESC
LIMIT 30
```

---

# 🧭 Synthèse Finale (DataviewJS)
```dataviewjs
const all = dv.pages('"."');
const total = all.length;
const done = all.filter(p => p.status == "done" || p.status == "success" || p.status == "published").length;
const percent = total > 0 ? Math.round((done / total) * 100) : 0;

dv.header(3, "Avancement global : " + percent + "%");
dv.paragraph(`Éléments finalisés : ${done} / ${total}`);
```

---

# 🔗 Navigation rapide
- [[Dashboard_OpenClaw Light]]
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
