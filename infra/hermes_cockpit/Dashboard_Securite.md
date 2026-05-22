# 🛡️ Audit de sécurité — OpenClaw Light

## 🔥 Risques critiques

```dataview
table file.link as "Fichier", status, file.tags as "Tags"
from "Core"
where contains(file.tags, "prio/haute") and status = "backlog"
```

---

## 🧨 Fichiers sensibles (contenu court + prio haute)

```dataview
table file.link as "Fichier", length(file.content) as "Longueur"
from "Core"
where contains(file.tags, "prio/haute") and length(file.content) < 150
```

---

## 🧩 Fichiers modifiés récemment (48h)

```dataview
table file.link as "Fichier", file.mtime as "Modifié"
from "Core"
where date(file.mtime) >= date(today) - dur(2 days)
sort file.mtime desc
```

---

## 🧹 Fichiers sans frontmatter (danger)

```dataview
table file.link
from "Core"
where !file.frontmatter
```

---

## 🚫 Fichiers sans footer (navigation cassée)

```dataview
table file.link
from "Core"
where !contains(file.content, "# 🔗 Navigation rapide")
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
