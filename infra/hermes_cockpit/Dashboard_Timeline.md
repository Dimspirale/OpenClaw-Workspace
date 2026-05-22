# 🕒 Dashboard Timeline

## 🔥 KPIs Timeline (DataviewJS)
```dataviewjs
const t = dv.pages('"Timeline"');
const total = t.length;
const planned = t.filter(x => x.status == "planned").length;
const inProgress = t.filter(x => x.status == "in_progress").length;
const done = t.filter(x => x.status == "done").length;
const delayed = t.filter(x => x.status == "delayed").length;
const missing = t.filter(x => !x.status).length;

dv.table(
  ["Indicateur", "Valeur"],
  [
    ["Total timelines", total],
    ["Planifiées", planned],
    ["En cours", inProgress],
    ["Terminées", done],
    ["Retardées", delayed],
    ["Sans statut", missing],
  ]
);
```

## 🕒 Liste complète des timelines
```dataview
TABLE file.link AS "Timeline", type, start, end, status
FROM "Timeline"
SORT start ASC
```

## 🧩 Timelines par type
```dataview
TABLE type AS "Type", file.link AS "Timeline", start, end, status
FROM "Timeline"
WHERE type
SORT type ASC, start ASC
```

## 🟩 Timelines terminées
```dataview
LIST FROM "Timeline" WHERE status = "done"
```

## 🟧 Timelines en cours
```dataview
LIST FROM "Timeline" WHERE status = "in_progress"
```

## 🟥 Timelines retardées
```dataview
LIST FROM "Timeline" WHERE status = "delayed"
```

## 🟦 Timelines planifiées
```dataview
LIST FROM "Timeline" WHERE status = "planned"
```

## 🧱 Timelines critiques (si champ `critical: true`)
```dataview
LIST FROM "Timeline" WHERE critical = true
```

## 🧹 Timelines incomplètes (métadonnées manquantes)
```dataview
TABLE file.link AS "Timeline", type, start, end
FROM "Timeline"
WHERE !type OR !start OR !end
SORT file.name ASC
```

## 🕒 Dernières modifications
```dataview
TABLE file.link AS "Timeline", file.mtime AS "Modifié le"
FROM "Timeline"
SORT file.mtime DESC
LIMIT 20
```

## 📊 Synthèse Timeline (DataviewJS)
```dataviewjs
const t = dv.pages('"Timeline"');
const total = t.length;
const done = t.filter(x => x.status == "done").length;
const percent = total > 0 ? Math.round((done / total) * 100) : 0;

dv.header(3, "Avancement global : " + percent + "%");
dv.paragraph(`Timelines terminées : ${done} / ${total}`);
```

## 📅 Vue Gantt (Mermaid)
```mermaid
gantt
    dateFormat  YYYY-MM-DD
    title Timeline globale

    %% Génération automatique via DataviewJS
```

```dataviewjs
const items = dv.pages('"Timeline"')
    .where(t => t.start && t.end)
    .sort(t => t.start, 'asc');

let out = "gantt\ndateFormat  YYYY-MM-DD\ntitle Timeline globale\n\n";

for (let t of items) {
    const name = t.file.name.replace(".md", "");
    const start = t.start.toISODate();
    const end = t.end.toISODate();
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
- [[Dashboard_Release_Train]]
- [[Core/README]]
- [[Home]]
