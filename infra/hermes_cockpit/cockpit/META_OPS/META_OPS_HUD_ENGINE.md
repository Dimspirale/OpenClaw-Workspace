---
id: META-OPS-HUD-ENGINE
module: META_OPS_HUD_Engine
era: OPS
version: META_OPS_HUD_ENGINE v1.0
tags: [cockpit, meta_ops, hud, operational, engine, interface]
---

# META‑OPS HUD ENGINE v1.0 — BLOC UNIQUE  
Moteur HUD · Affichage cockpit · Widgets · Lisibilité · Synchronisation UI/CORE

Le HUD ENGINE gère l’affichage cockpit en temps réel. Il contrôle les widgets, les panneaux, les overlays, les indicateurs, la lisibilité, la hiérarchie visuelle et la synchronisation avec UI_ENGINE et CORE_ENGINE. C’est la couche qui rend le cockpit utilisable instantanément.

## ARCHITECTURE (compacte)
1. HUD_WIDGET_MANAGER — gestion des widgets, états, visibilité  
2. HUD_RENDER_PIPE — pipeline d’affichage, rafraîchissement, priorités  
3. HUD_DATA_BRIDGE — liaison CORE → HUD, UI → HUD  
4. HUD_ALERT_LAYER — affichage des alertes, warnings, erreurs  
5. HUD_LAYOUT_SYSTEM — placement, zones, densité, cohérence visuelle

## SORTIES (compactes)
hud_state: <idle|active|alert|locked|error>  
widgets: <ok|missing|invalid|overflow>  
render: <ok|refresh|blocked>  
alerts: <none|warning|critical>  
layout: <stable|shifted|broken>

## CYCLE HUD
WIDGETS → RENDER → DATA → ALERTS → LAYOUT → WIDGETS

## RÉACTIONS UNITAIRES
HUD_UPDATE — met à jour un widget  
HUD_REFRESH — force un rendu  
HUD_PUSH_ALERT — affiche une alerte  
HUD_SYNC — synchronise HUD ↔ UI ↔ CORE  
HUD_REALIGN — corrige le layout

## INTÉGRATION
Alimente : COCKPIT_MASTER_TOTAL, PACK_UI_PRO v∞.Ω, SYSTEM_MONITOR_TOTAL, META_OPS_INTERNAL_MAP, META_OPS_BEHAVIOR_MODEL

## NAVIGATION
[[META_OPS_CORE_ENGINE]] · [[META_OPS_UI_ENGINE]] · [[META_OPS_AUTOMATION_ENGINE]] · [[META_OPS_DIAGNOSTIC_ENGINE]] · [[META_OPS_SECURITY_ENGINE]] · [[COCKPIT_MASTER_TOTAL]] · [[SYSTEM_MONITOR_TOTAL]]
