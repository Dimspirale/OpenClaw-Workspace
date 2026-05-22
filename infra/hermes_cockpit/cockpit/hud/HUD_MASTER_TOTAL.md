---
id: HUD-MASTER-TOTAL
module: HUD_Master_Total
era: HUD
version: HUD_MASTER_TOTAL v1.0
tags: [cockpit, hud, master, total, operational, interface]
---

# HUD MASTER TOTAL v1.0 — BLOC UNIQUE  
HUD global · Synthèse visuelle cockpit · Widgets maîtres · État système en temps réel

HUD_MASTER_TOTAL est la couche HUD suprême d’OpenClaw_Light.  
Il affiche la synthèse visuelle complète du cockpit : états, alertes, flux, synchronisation, score, modules, moteurs OPS.  
Il lit COCKPIT_MASTER_TOTAL, SYSTEM_MONITOR_TOTAL et PACK_UI_PRO v∞.Ω pour produire un HUD clair, stable et cockpit‑grade.

## ARCHITECTURE (compacte)
1. HUD_GLOBAL_BAR — état global, score, synchro  
2. HUD_ALERT_CENTER — alertes, warnings, critiques  
3. HUD_FLOW_PANEL — flux internes, blocages, charges  
4. HUD_ENGINE_STATUS — états des 6 moteurs META‑OPS  
5. HUD_COCKPIT_PANEL — cockpit_state + résumé  
6. HUD_MONITOR_FEED — données SYSTEM_MONITOR_TOTAL  
7. HUD_SYNC_INDICATOR — cohérence et synchronisation  
8. HUD_FOOTER — version, état, timecode

## SOURCES
cockpit: COCKPIT_MASTER_TOTAL  
monitor: SYSTEM_MONITOR_TOTAL  
master_engine: META_OPS_MASTER_ENGINE  
theme: PACK_UI_PRO v∞.Ω  

## SORTIES (compactes)
hud_state: <ok|warning|error|critical>  
global_score: <0-100>  
sync: <ok|partial|desync|forced>  
alerts: <0-∞>  
engines: {core, ui, hud, automation, diagnostic, security}  
flow: <stable|busy|blocked|overload>  
summary: <string>

## STRUCTURE VISUELLE (compacte)
TOP BAR  
- état global  
- score  
- synchro  
- timecode  

LEFT STACK  
- moteurs OPS  
- flux  
- intégrité  

CENTER PANEL  
- résumé cockpit  
- état monitor  
- messages système  

RIGHT STACK  
- alertes  
- warnings  
- critiques  

BOTTOM BAR  
- version cockpit  
- version pack UI  
- état HUD  
- signature OPS  

## RÉACTIONS UNITAIRES
HUD_MASTER_REFRESH — rafraîchit tout le HUD  
HUD_MASTER_ALERT — met en avant une alerte  
HUD_MASTER_SYNC — force la synchro visuelle  
HUD_MASTER_SUMMARY — met à jour le résumé cockpit  
HUD_MASTER_BALANCE — ajuste la densité visuelle

## INTÉGRATION
Alimente :  
PACK_UI_PRO v∞.Ω, SYSTEM_MONITOR_TOTAL, COCKPIT_MASTER_TOTAL, META_OPS_MASTER_ENGINE, META_OPS_INTERNAL_MAP

## NAVIGATION
[[COCKPIT_MASTER_TOTAL]] · [[SYSTEM_MONITOR_TOTAL]] · [[META_OPS_MASTER_ENGINE]] · [[META_OPS_CORE_ENGINE]] · [[META_OPS_UI_ENGINE]] · [[META_OPS_HUD_ENGINE]] · [[PACK_UI_PRO_vINF_OMEGA]]
