---
title: "Kanban Automatique — OpenClaw Light"
---

# 🗂️ Kanban Automatique (Dataview)

## 🧩 Backlog
```dataview
table file.link as "Tâche", status
from "Core"
where contains(status, "backlog")
sort file.name asc

```yaml
status: en_cours

---

## 🛠️ En cours
```dataview
table file.link as "Tâche", status
from "Core"
where contains(status, "en_cours")
sort file.name asc

```yaml
status: en_cours

---

## 🔍 À valider
```dataview
table file.link as "Tâche", status
from "Core"
where contains(status, "a_valider")
sort file.name asc

```yaml
status: a_valider

---

## 🚀 Terminé
```dataview
table file.link as "Tâche", status
from "Core"
where contains(status, "termine")
sort file.name asc

```yaml
status: termine

---
