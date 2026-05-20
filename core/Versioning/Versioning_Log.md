---
status: backlog
title: "Versioning Log — OpenClaw Light"
version: "1.0"
---

# Versioning Log

## 1 Objectif
Historiser les changements du PRD, des politiques IA, des mappings Show Control et des presets de rendu.

## 2 Conventions
- Format d’entrée : `YYYY‑MM‑DD — vX.Y — Auteur — Résumé bref`  
- Détail : lien vers fichier modifié, changelist, impact (technique / artistique / sécurité), rollback tag.

## 3 Entrées récentes
- 2026‑04‑28 — v5.2 — Dimitri — Intégration IA Autonome, Show Control, Rendu Artistique Avancé; ré‑architecture Vault/Obsidian.

## 4 Processus de release
1. Draft → 2. Review (technique + artistique + sécurité) → 3. Validation (approbation) → 4. Tag release → 5. Publication dans `/Core/`.

## 5 Branching & merges
- Branches nommées `feature/<nom>`, `hotfix/<nom>`.  
- Merge requests documentés avec checklist (tests, simulation, audit).

## 6 Templates de changelog
- **Titre** : vX.Y — Date — Auteur  
- **Résumé** : 1 ligne  
- **Détails** : liste des fichiers modifiés, raison, impact, actions requises.

## 7 Rollback
- Chaque release doit inclure un plan de rollback et un snapshot exporté dans `/Core/Exports/`.

## 8 Annexes
- Script d’automatisation recommandé (ex. export JSON des métadonnées de version).

---
## 🔗 Navigation modules
- [[Core/OpenClaw_Light_PRD_v5.2]]
- [[Core/Simulation/Simulation_Globale]]
- [[Core/Diagnostic/Diagnostic_Global]]
- [[Core/ShowControl/Show_Control]]
- [[Core/Visualisation/Visualisation_3D]]
- [[Core/Artistique/Artistique_Predictif]]
- [[Core/Réseau/Réseau_Predictif]]
- [[Core/Rigging/Rigging_Predictif]]
- [[Core/Électricité/Electricite_Predictive]]
- [[Core/DMX/DMX_Predictif]]
- [[Core/HF/HF_Predictif]]
- [[Core/Policies/IA_Policies]]
- [[Core/Policies/Show_Control_Mappings]]
- [[Core/Policies/Render_Presets]]
- [[Core/Versioning/Versioning_Log]]


---

# 🔗 Navigation rapide
- [[Home]]
- [[Kanban_Master]]
- [[Kanban_Automatique]]
- [[Core/README]]
