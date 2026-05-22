# 🌐 Dashboard Global 2.0 — Vue Unifiée, Intelligente et Transversale

> **La version la plus avancée de tout ton système.**  
> Une fusion intelligente de :  
> **Master + OpenClaw Light + Progression_Modules + Domaines + Statuts + Alertes.**

---

# 🔥 KPIs Globaux (DataviewJS)
```dataviewjs
const all = dv.pages('"."')
    .where(p => !p.file.path.includes("Core/README"));

const total = all.length;
const done = all.filter(p => ["done","success","published"].includes(p.status)).length;
const inProgress = all.filter(p => p.status == "in_progress").length;
const planned = all.filter(p => p.status == "planned").length;
const critical = all.filter(p => p.critical == true).length;
const missing = all.filter(p => !p.status).length;

dv.table(
  ["Indicateur", "Valeur"],
  [
    ["Total éléments", total],
    ["Finalisés", done],
    ["En cours", inProgress],
    ["Planifiés", planned],
    ["Critiques", critical],
    ["Sans statut", missing],
  ]
);
```

---

# 🧠 Synthèse Transversale (Domaines × Modules × Statuts)
```dataviewjs
const pages = dv.pages('"."').where(p => p.module || p.domain);

let rows = [];

for (let p of pages) {
    rows.push([
        p.domain ?? "—",
        p.module ?? "—",
        p.file.link,
        p.status ?? "—",
        p.critical ? "🔥" : ""
    ]);
}

dv.table(
  ["Domaine", "Module", "Fichier", "Statut", "Critique"],
  rows
);
```

---

# 📦 Vue Domaines (Synthèse par Domaine)
```dataviewjs
const domains = dv.pages('"."')
    .where(p => p.domain)
    .groupBy(p => p.domain);

let rows = [];

for (let d of domains) {
    const total = d.rows.length;
    const ok = d.rows.filter(p => ["done","success","published"].includes(p.status)).length;
    const crit = d.rows.filter(p => p.critical).length;
    rows.push([d.key, total, ok, crit, Math.round(ok / total * 100) + "%"]);
}

dv.table(["Domaine", "Total", "OK", "Critiques", "Progression"], rows);
```

---

# 🧩 Vue Modules (Synthèse par Module)
```dataviewjs
const modules = dv.pages('"."')
    .where(p => p.module)
    .groupBy(p => p.module);

let rows = [];

for (let m of modules) {
    const total = m.rows.length;
    const ok = m.rows.filter(p => ["done","success","published"].includes(p.status)).length;
    const crit = m.rows.filter(p => p.critical).length;
    rows.push([m.key, total, ok, crit, Math.round(ok / total * 100) + "%"]);
}

dv.table(["Module", "Total", "OK", "Critiques", "Progression"], rows);
```

---

# 🚨 Système d’Alerte Intelligent (DataviewJS)
```dataviewjs
const crit = dv.pages('"."').where(p => p.critical == true);
const missing = dv.pages('"."').where(p => !p.status);
const delayed = dv.pages('"."').where(p => p.status == "delayed");

dv.header(3, "🔥 Alerte Critiques (" + crit.length + ")");
crit.forEach(c => dv.list([c.file.link]));

dv.header(3, "⚠️ Métadonnées manquantes (" + missing.length + ")");
missing.forEach(m => dv.list([m.file.link]));

dv.header(3, "⏳ Retards (" + delayed.length + ")");
delayed.forEach(d => dv.list([d.file.link]));
```

---

# 🕒 Dernières Modifications Globales
```dataview
TABLE file.link AS "Fichier", module, domain, status, file.mtime AS "Modifié le"
FROM ""
SORT file.mtime DESC
LIMIT 40
```

---

# 📊 Synthèse Finale (DataviewJS)
```dataviewjs
const all = dv.pages('"."');
const total = all.length;
const done = all.filter(p => ["done","success","published"].includes(p.status)).length;
const percent = total > 0 ? Math.round((done / total) * 100) : 0;

dv.header(2, "Progression Globale : " + percent + "%");
dv.paragraph(`Éléments finalisés : ${done} / ${total}`);
```

---

# 🔗 Navigation rapide
- [[Dashboard_OpenClaw Light]]
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
