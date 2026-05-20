# 🌐 Dashboard Global 3.0 — Cockpit + Widgets Interactifs

> Version widgetisée de ton cockpit global, pensée pour être **cliquable**, **réactive**, **opérationnelle**.  
> (Nécessite le plugin **Buttons** pour les boutons interactifs.)

---

## 🎛️ Zone de Contrôle Rapide

```button
name 🧹 Scanner les fichiers incomplets
type command
action Dataview: Force refresh
color red
tooltip Rafraîchir les vues Dataview pour voir les fichiers incomplets à jour
```

```button
name 🔄 Rafraîchir les dashboards
type command
action Dataview: Force refresh
color blue
tooltip Recalculer toutes les vues Dataview
```

```button
name 🚨 Voir les alertes
type link
action [[Dashboard_Alerts]]
color orange
tooltip Ouvrir le système d’alertes visuelles
```

```button
name 📊 Vue Master
type link
action [[Dashboard_Master]]
color purple
tooltip Ouvrir la synthèse globale Master
```

```button
name 🧠 Cockpit OpenClaw
type link
action [[Dashboard_OpenClaw Light]]
color green
tooltip Ouvrir le cockpit central OpenClaw Light
```

```button
name 📈 Progression Modules
type link
action [[Dashboard_Progression_Modules]]
color gray
tooltip Ouvrir la vue de progression par module
```

---

## 🔥 KPIs Globaux (DataviewJS)

```dataviewjs
const all = dv.pages('"."')
    .where(p => !p.file.path.includes("Core/README"));

const total = all.length;
const done = all.filter(p => ["done","success","published"].includes(p.status)).length;
const inProgress = all.filter(p => p.status == "in_progress").length;
const planned = all.filter(p => p.status == "planned").length;
const critical = all.filter(p => p.critical == true).length;
const delayed = all.filter(p => p.status == "delayed").length;

dv.table(
  ["Indicateur", "Valeur"],
  [
    ["Total éléments", total],
    ["Finalisés", done],
    ["En cours", inProgress],
    ["Planifiés", planned],
    ["Critiques", critical],
    ["Retardés", delayed],
  ]
);
```

---

## 🚨 Résumé des Alertes

```dataviewjs
const crit = dv.pages('"."').where(p => p.critical == true);
const missing = dv.pages('"."').where(p => !p.status || !p.module || !p.domain);
const delayed = dv.pages('"."').where(p => p.status == "delayed");

dv.table(
  ["Type", "Nombre"],
  [
    ["🔥 Critiques", crit.length],
    ["⚠️ Métadonnées manquantes", missing.length],
    ["⏳ Retards", delayed.length],
  ]
);
```

---

## 🧩 Vue Domaines

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

## 🧠 Synthèse Finale

```dataviewjs
const all = dv.pages('"."');
const total = all.length;
const done = all.filter(p => ["done","success","published"].includes(p.status)).length;
const percent = total > 0 ? Math.round((done / total) * 100) : 0;

dv.header(2, "Progression Globale : " + percent + "%");
dv.paragraph(`Éléments finalisés : ${done} / ${total}`);
```

---

## 🔗 Navigation rapide

- [[Dashboard_Global_2.0]]
- [[Dashboard_Alerts]]
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
