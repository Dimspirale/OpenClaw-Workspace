# 📝 Dashboard Policies

## 🔥 KPIs Policies (DataviewJS)
```dataviewjs
const pol = dv.pages('"Policies"');
const total = pol.length;
const active = pol.filter(p => p.status == "actif").length;
const draft = pol.filter(p => p.status == "brouillon").length;
const deprecated = pol.filter(p => p.status == "obsolete").length;
const missing = pol.filter(p => !p.status).length;

dv.table(
  ["Indicateur", "Valeur"],
  [
    ["Total policies", total],
    ["Actives", active],
    ["Brouillons", draft],
    ["Obsolètes", deprecated],
    ["Sans statut", missing],
  ]
);
```

## 📘 Liste complète des policies
```dataview
TABLE file.link AS "Policy", category, scope, status
FROM "Policies"
SORT category ASC, file.name ASC
```

## 🧩 Policies par catégorie
```dataview
TABLE category AS "Catégorie", file.link AS "Policy", scope, status
FROM "Policies"
WHERE category
SORT category ASC
```

## 🗺️ Policies par scope
```dataview
TABLE scope AS "Scope", file.link AS "Policy", category, status
FROM "Policies"
WHERE scope
SORT scope ASC
```

## 🟩 Policies actives
```dataview
LIST FROM "Policies" WHERE status = "actif"
```

## 🟧 Policies en brouillon
```dataview
LIST FROM "Policies" WHERE status = "brouillon"
```

## 🟥 Policies obsolètes
```dataview
LIST FROM "Policies" WHERE status = "obsolete"
```

## ⚠️ Policies critiques (si champ `critical: true`)
```dataview
LIST FROM "Policies" WHERE critical = true
```

## 🧹 Policies incomplètes (métadonnées manquantes)
```dataview
TABLE file.link AS "Policy", category, scope
FROM "Policies"
WHERE !category OR !scope
SORT file.name ASC
```

## 🕒 Dernières modifications
```dataview
TABLE file.link AS "Policy", file.mtime AS "Modifié le"
FROM "Policies"
SORT file.mtime DESC
LIMIT 20
```

## 🧭 Synthèse Policies (DataviewJS)
```dataviewjs
const pol = dv.pages('"Policies"');
const total = pol.length;
const active = pol.filter(p => p.status == "actif").length;
const percent = total > 0 ? Math.round((active / total) * 100) : 0;

dv.header(3, "Gouvernance active : " + percent + "%");
dv.paragraph(`Policies actives : ${active} / ${total}`);
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
- [[