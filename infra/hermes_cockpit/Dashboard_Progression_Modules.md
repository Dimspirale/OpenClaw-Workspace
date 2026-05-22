# 📈 Dashboard Progression Modules — Vision Modulaire Avancée

## 🔥 KPIs Progression (DataviewJS)
```dataviewjs
const mods = dv.pages('"."').where(p => p.module);
const total = mods.length;
const done = mods.filter(m => ["done","success","published"].includes(m.status)).length;
const inProgress = mods.filter(m => m.status == "in_progress").length;
const planned = mods.filter(m => m.status == "planned").length;
const missing = mods.filter(m => !m.status).length;

dv.table(
  ["Indicateur", "Valeur"],
  [
    ["Total modules", total],
    ["Finalisés", done],
    ["En cours", inProgress],
    ["Planifiés", planned],
    ["Sans statut", missing],
  ]
);
```

---

# 🧩 Progression par Module (Tableau principal)
```dataview
TABLE module AS "Module", file.link AS "Fichier", status AS "Statut", domain AS "Domaine"
FROM ""
WHERE module
SORT module ASC, file.name ASC
```

---

# 📊 Synthèse par Module (DataviewJS)
```dataviewjs
const mods = dv.pages('"."').where(p => p.module);

let groups = {};
for (let m of mods) {
    if (!groups[m.module]) groups[m.module] = { total: 0, done: 0, critical: 0 };
    groups[m.module].total++;
    if (["done","success","published"].includes(m.status)) groups[m.module].done++;
    if (m.critical) groups[m.module].critical++;
}

let rows = Object.entries(groups).map(([name, data]) => [
    name,
    data.total,
    data.done,
    data.critical,
    data.total > 0 ? Math.round((data.done / data.total) * 100) + "%" : "0%"
]);

dv.table(["Module", "Total", "OK", "Critiques", "Progression"], rows);
```

---

# 🟦 Modules Finalisés
```dataview
LIST FROM "" WHERE module AND (status = "done" OR status = "success" OR status = "published")
```

# 🟧 Modules en Cours
```dataview
LIST FROM "" WHERE module AND status = "in_progress"
```

# 🟩 Modules Planifiés
```dataview
LIST FROM "" WHERE module AND status = "planned"
```

# 🟥 Modules Critiques
```dataview
LIST FROM "" WHERE module AND critical = true
```

---

# 🧹 Modules Incomplets (Métadonnées Manquantes)
```dataview
TABLE file.link AS "Fichier", module, status, domain
FROM ""
WHERE module AND (!status OR !domain)
SORT file.name ASC
```

---

# 🕒 Dernières Modifications (Modules)
```dataview
TABLE file.link AS "Fichier", module, file.mtime AS "Modifié le", status
FROM ""
WHERE module
SORT file.mtime DESC
LIMIT 25
```

---

# 🧠 Synthèse Finale (DataviewJS)
```dataviewjs
const mods = dv.pages('"."').where(p => p.module);
const total = mods.length;
const done = mods.filter(m => ["done","success","published"].includes(m.status)).length;
const percent = total > 0 ? Math.round((done / total) * 100) : 0;

dv.header(3, "Progression globale des modules : " + percent + "%");
dv.paragraph(`Modules finalisés : ${done} / ${total}`);
```

---

# 🔗 Navigation rapide
- [[Dashboard_OpenClaw Light]]
- [[Dashboard_Master]]
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
