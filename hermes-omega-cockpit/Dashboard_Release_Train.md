# 🚆 Dashboard Release Train

## 🔥 KPIs Release Train (DataviewJS)
```dataviewjs
const rt = dv.pages('"Release_Train"');
const total = rt.length;
const planned = rt.filter(x => x.status == "planned").length;
const inProgress = rt.filter(x => x.status == "in_progress").length;
const delivered = rt.filter(x => x.status == "delivered").length;
const delayed = rt.filter(x => x.status == "delayed").length;
const critical = rt.filter(x => x.critical == true).length;
const missing = rt.filter(x => !x.status).length;

dv.table(
  ["Indicateur", "Valeur"],
  [
    ["Total releases", total],
    ["Planifiées", planned],
    ["En cours", in_progress],
    ["Livrées", delivered],
    ["Retardées", delayed],
    ["Critiques", critical],
    ["Sans statut", missing],
  ]
);
```

## 🚆 Liste complète des releases
```dataview
TABLE file.link AS "Release", train, version, start, end, status
FROM "Release_Train"
SORT start ASC
```

## 🧩 Releases par train
```dataview
TABLE train AS "Train", file.link AS "Release", version, start, end, status
FROM "Release_Train"
WHERE train
SORT train ASC, start ASC
```

## 🏷️ Releases par version
```dataview
TABLE version AS "Version", file.link AS "Release", train, start, end, status
FROM "Release_Train"
WHERE version
SORT version DESC, start ASC
```

## 🟩 Releases livrées
```dataview
LIST FROM "Release_Train" WHERE status = "delivered"
```

## 🟧 Releases en cours
```dataview
LIST FROM "Release_Train" WHERE status = "in_progress"
```

## 🟥 Releases retardées
```dataview
LIST FROM "Release_Train" WHERE status = "delayed"
```

## 🟦 Releases planifiées
```dataview
LIST FROM "Release_Train" WHERE status = "planned"
```

## 🔥 Releases critiques
```dataview
LIST FROM "Release_Train" WHERE critical = true
```

## 🧹 Releases incomplètes (métadonnées manquantes)
```dataview
TABLE file.link AS "Release", train, version, start, end, status
FROM "Release_Train"
WHERE !train OR !version OR !start OR !end OR !status
SORT file.name ASC
```

## 🕒 Dernières modifications
```dataview
TABLE file.link AS "Release", file.mtime AS "Modifié le"
FROM "Release_Train"
SORT file.mtime DESC
LIMIT 20
```

## 🧭 Synthèse Release Train (DataviewJS)
```dataviewjs
const rt = dv.pages('"Release_Train"');
const total = rt.length;
const delivered = rt.filter(x => x.status == "delivered").length;
const percent = total > 0 ? Math.round((delivered / total) * 100) : 0;

dv.header(3, "Taux de livraison : " + percent + "%");
dv.paragraph(`Releases livrées : ${delivered} / ${total}`);
```

## 🚆 Vue Gantt (Mermaid)
```mermaid
gantt
    dateFormat  YYYY-MM-DD
    title Release Train

    %% Génération automatique via DataviewJS
```

```dataviewjs
const items = dv.pages('"Release_Train"')
    .where(r => r.start && r.end)
    .sort(r => r.start, 'asc');

let out = "gantt\ndateFormat  YYYY-MM-DD\ntitle Release Train\n\n";

for (let r of items) {
    const name = r.file.name.replace(".md", "");
    const start = r.start.toISODate();
    const end = r.end.toISODate();
    out += `    ${name} : ${start}, ${end}\n`;
}

dv.codeblock(out, "mermaid");
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
- [[Dashboard_Risks]]
- [[Dashboard_Timeline]]
- [[Core/README]]
- [[Home]]
