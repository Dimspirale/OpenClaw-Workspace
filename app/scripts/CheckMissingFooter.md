# 📋 Fichiers sans footer

```dataview
table file.link as "Fichier"
from "Core"
where !contains(file.content, "# 🔗 Navigation rapide")
sort file.name asc

