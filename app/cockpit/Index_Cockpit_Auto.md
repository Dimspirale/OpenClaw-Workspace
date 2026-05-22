---
tags:
  - cockpit
  - index
  - auto
---

# INDEX COCKPIT — AUTO (Dataview)

> Version dynamique de l’index cockpit.  
> Pour la version éditorialisée : [[Index_Cockpit]].

---

## 🔷 Fichiers cockpit principaux

```dataview
TABLE file.name AS "Fichier", file.folder AS "Dossier"
FROM "OpenClaw_Light"
WHERE file.name = "Index_Cockpit"
   OR file.name = "Index_Cockpit_Auto"
   OR file.name = "Plan_Fusion_4_Eres"
   OR file.name = "Cockpit_Architecture_A1-A22_V17-V∴"
   OR file.name = "Schema_Global_Arborescence"
   OR file.name = "Carte_Mentale_Cockpit"
   OR file.name = "Dashboard_ERA_Modules_Outils"
SORT file.folder, file.name
