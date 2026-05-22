# 🔔 Notifications internes — OpenClaw Light

## 🚨 Urgences (prio haute)

```dataview
table file.link as "Fichier", status
from "Core"
where contains(file.tags, "prio/haute")
sort file.name asc
```

---

## 🧹 Fichiers sans status

```dataview
table file.link as "Fichier"
from "Core"
where !status
```

---

## 🧹 Fichiers sans footer

```dataview
table file.link as "Fichier"
from "Core"
where !contains(file.content, "# 🔗 Navigation rapide")
```

---

## ⏳ En attente de validation

```dataview
table file.link as "Fichier"
from "Core"
where status = "a_valider"
```

---

## ⚠️ En retard (tag semaine/en_cours mais pas “en_cours”)

```dataview
table file.link as "Fichier", status
from "Core"
where contains(file.tags, "semaine/en_cours") and status != "en_cours"
```

---

# 🛠️ Actions rapides

```button
name Ajouter status manquant
type command
action Templater: Run script Batch_Footer_Status
```

```button
name