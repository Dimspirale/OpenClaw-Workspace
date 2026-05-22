
```markdown
---
title: "Planning Hebdo — OpenClaw Light"
---

# 🗓️ Planning Hebdomadaire Automatique

## 📅 Cette semaine (tag : #semaine/en_cours)

```dataview
table file.link as "Tâche", status
from "Core"
where contains(file.tags, "semaine/en_cours")
sort file.name asc

```dataview
table file.link as "Tâche", status
from "Core"
where contains(file.tags, "semaine/prochaine")
sort file.name asc

```dataview
table file.link as "Tâche", status
from "Core"
where contains(file.tags, "semaine/attente")
sort file.name asc

🔗 Navigation rapide
[[Dashboard_OpenClaw]]

[[Kanban_Master]]

[[Kanban_Automatique]]