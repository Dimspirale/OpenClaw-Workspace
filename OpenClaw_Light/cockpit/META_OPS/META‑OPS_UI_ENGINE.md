---
id: META-OPS-UI-ENGINE
module: META_OPS_UI_Engine
era: OPS
version: META_OPS_UI_ENGINE v1.0
tags: [cockpit, meta_ops, ui, operational, engine, interface]
---

# META‑OPS UI ENGINE v1.0 — BLOC UNIQUE  
Moteur d’interface · Gestion UI cockpit · États visuels · Cohérence graphique

Le UI ENGINE gère toute la couche interface d’OpenClaw_Light. Il contrôle l’affichage, les états visuels, la cohérence graphique, les interactions, les transitions UI et la communication avec le CORE ENGINE. C’est la couche qui garantit un cockpit clair, stable et lisible.

## ARCHITECTURE (compacte)
1. UI_STATE_MANAGER — états UI, transitions, modes, overlays  
2. UI_RENDER_ENGINE — rendu visuel, rafraîchissement, thèmes, palettes  
3. UI_EVENT_HANDLER — clics, touches, interactions, triggers  
4. UI_LAYOUT_ENGINE — placement, hiérarchie, zones, widgets  
5. UI_SYNC_BRIDGE — synchro UI ↔ HUD ↔ CORE ENGINE

## SORTIES (compactes)
ui_state: <idle|active|modal|locked|error>  
render: <ok|pending|refresh|blocked>  
events: <none|input|trigger|action>  
layout: <stable|overflow|missing|invalid>  
sync: <ok|desync|forced>

## CYCLE UI
STATE → RENDER → EVENTS → LAYOUT → SYNC → STATE

## RÉACTIONS UNITAIRES
UI_SET_STATE — change l’état UI  
UI_REFRESH — force un rendu  
UI_TRIGGER — déclenche un événement  
UI_RELAY — envoie une action au CORE  
UI_REALIGN — corrige le layout

## INTÉGRATION
Alimente : HUD_ENGINE, COCKPIT_MASTER_TOTAL, PACK_UI_PRO v∞.Ω, SYSTEM_MONITOR_TOTAL, META_OPS_INTERNAL_MAP

## NAVIGATION
[[META_OPS_HUD_ENGINE]] · [[META_OPS_AUTOMATION_ENGINE]] · [[META_OPS_DIAGNOSTIC_ENGINE]] · [[META_OPS_SECURITY_ENGINE]] · [[COCKPIT_MASTER_TOTAL]] · [[SYSTEM_MONITOR_TOTAL]]
