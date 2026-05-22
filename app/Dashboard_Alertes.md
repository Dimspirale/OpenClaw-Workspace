# 🚨 Alertes en temps réel — OpenClaw Light

## 🔥 Alertes critiques

```dataview
table file.link as "Fichier", status, file.tags as "Tags"
from "Core"
where contains(file.tags, "prio/haute") and status != "en_cours"
```

---

## 🧨 Incohérences majeures

```dataview
table file.link as "Fichier", status
from "Core"
where !status or status = ""
```

---

## 🧹 Fichiers sans footer

```dataview
table file.link
from "Core"
where !contains(file.content, "# 🔗 Navigation rapide")
```

---

## ⏱️ Modifiés récemment (24h)

```dataview
table file.link, file.mtime
from "Core"
where date(file.mtime) >= date(today) - dur(1 day)
sort file.mtime desc
```

---

## 📦 Modules en surcharge (≥ 10 tâches actives)

```dataviewjs
const pages = dv.pages('"Core"');
const modules = [...new Set(pages.map(p => p.file.folder.split("/")[1]))];

let rows = [];

modules.forEach(m => {
  const files = pages.filter(p => p.file.folder.includes(m));
  const active = files.filter(p => p.status != "termine").length;
  if (active >= 10) rows.push([m, active]);
});

dv.table(["Module", "Charge"], rows);
```

---

## 🛠️ Actions rapides

```button
name Corriger footers
type command
action Templater: Run script Batch_Footer_Status
```

```button
name Nettoyer Vault
type command
action Templater: Run script CleanVault
```
