---
status: backlog
title: "Render Presets — OpenClaw Light"
version: "1.0"
---

# Render Presets

## 1 Objectif
Fournir un catalogue de presets de rendu 3D et artistiques réutilisables, versionnés et paramétrables.

## 2 Structure d’un preset
- **ID** : unique  
- **Nom** : lisible  
- **Auteur** :  
- **Version** :  
- **Paramètres** : couleurs dominantes, intensité, volumétrique, fog density, beam spread, shadow quality, post‑process.  
- **Contraintes techniques** : GPU recommandée, coût CPU, compatibilité visualiseur.

## 3 Catégories
- **Ambiances** : nuit, dawn, club, théâtre, concert.  
- **Palettes** : chaud, froid, complémentaire, émotionnelle.  
- **Phasers** : rythmique, organique, géométrique.  
- **Transitions** : crossfade, strobe blend, tempo sync.

## 4 Métadonnées et tags
- Tags : `#ambient`, `#high_gpu`, `#low_latency`, `#volumetric`.  
- Usage recommandé : scène type, nombre de fixtures, distance moyenne.

## 5 Processus d’ajout
1. Créer preset avec paramètres et métadonnées.  
2. Tester en simulation (preview 3D).  
3. Valider performance (profil GPU/CPU).  
4. Publier et versionner.

## 6 Export / Import
- Format d’échange : JSON avec champs standardisés (ID, params, metadata).  
- Compatibilité : importer dans Capture/Depence/L8 quand possible.

## 7 Personnalisation utilisateur
- Sauvegarde de variantes utilisateur ; apprentissage IA pour proposer ajustements selon style.

## 8 Exemples (squelettes)
- **Preset ID**: RP‑001  
  **Nom**: Ambiance Nuit Scène Large  
  **Params**: dominant_color=#0A1F3B; volumetric=0.6; beam_spread=8; shadow_quality=high

## 9 Annexes
- Template JSON pour création rapide de presets.

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
