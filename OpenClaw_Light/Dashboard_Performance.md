# 🚀 Dashboard Performance

## 🔥 KPIs Performance (DataviewJS)
```dataviewjs
const p = dv.pages('"Performance"');
const total = p.length;
const ok = p.filter(x => x.status == "ok").length;
const warn = p.filter(x => x.status == "warn").length;
const fail = p.filter(x => x.status == "fail").length;
const critical = p.filter(x => x.critical == true).length;
const missing = p.filter(x => !x.status).length;

dv.table(
  ["Indicateur", "Valeur"],
  [
    ["Total métriques", total],
    ["OK", ok],
    ["Avertissements", warn],
    ["Échecs", fail],
    ["Critiques", critical],
    ["Sans statut", missing],
  ]
);
```

## 📊 Liste complète des métriques de performance
```dataview
TABLE file.link AS "Métrique", category, target, value, unit, status
FROM "Performance"
SORT category ASC, file.name ASC
```

## 🧩 Performance par catégorie
```dataview
TABLE category AS "Catégorie", file.link AS "Métrique", value, unit, status
FROM "Performance"
WHERE category
SORT category ASC
```

## 🎯 Performance par cible
```dataview
TABLE target AS "Cible", file.link AS "Métrique", category, value, unit, status
FROM "Performance"
WHERE target
SORT target ASC
```

## 📈 Métriques critiques
```dataview
LIST FROM "Performance" WHERE critical = true
```

## 🟩 Métriques OK
```dataview
LIST FROM "Performance" WHERE status = "ok"
```

## 🟧 Métriques en avertissement
```dataview
LIST FROM "Performance" WHERE status = "warn"
```

## 🟥 Métriques en échec
```dataview
LIST FROM "Performance" WHERE status = "fail"
```

## ⚡ Métriques de latence (si champ `latency`)
```dataview
TABLE file.link AS "Métrique", latency AS "Latence (ms)", status
FROM "Performance"
WHERE latency
SORT latency DESC
```

## 📦 Métriques de charge (si champ `load`)
```dataview
TABLE file.link AS "Métrique", load AS "Charge (%)", status
FROM "Performance"
WHERE load
SORT load DESC
```

## 🧹 Métriques incomplètes (métadonnées manquantes)
```dataview
TABLE file.link AS "Métrique", category, target, status
FROM "Performance"
WHERE !category OR !target OR !status
SORT file.name ASC
```

## 🕒 Dernières modifications
```dataview
TABLE file.link AS "Métrique", file.mtime AS "Modifié le"
FROM "Performance"
SORT file.mtime DESC
LIMIT 20
```

## 🧭 Synthèse Performance (DataviewJS)
```dataviewjs
const p = dv.pages('"Performance"');
const total = p.length;
const ok = p.filter(x => x.status == "ok").length;
const percent = total > 0 ? Math.round((ok / total) * 100) : 0;

dv.header(3, "Santé Performance : " + percent + "%");
dv.paragraph(`Métriques OK : ${ok} / ${total}`);
```

# 🔗 Navigation rapide
- [[Dashboard_Global_Overview]]
- [[Dashboard_Master]]
- [[Dashboard_Timeline]]
- [[Dashboard_Risks]]
- [[Dashboard_Progression_Modules]]
- [[Dashboard_Monitoring]]
- [[Dashboard_Production]]
- [[Dashboard_Documentation]]
- [[Dashboard_Architecture]]
- [[Dashboard_DevOps]]
- [[Dashboard_Assets]]
- [[Dashboard