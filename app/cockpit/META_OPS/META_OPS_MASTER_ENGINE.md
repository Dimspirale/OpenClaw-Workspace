---
id: META-OPS-MASTER-ENGINE
module: META_OPS_Master_Engine
era: OPS
version: META_OPS_MASTER_ENGINE v1.0
tags: [cockpit, meta_ops, master, operational, engine, orchestration]
---

# META‑OPS MASTER ENGINE v1.0 — BLOC UNIQUE  
Moteur maître · Orchestration totale · Coordination cockpit · Supervision OPS

Le MASTER ENGINE est le moteur central suprême d’OpenClaw_Light.  
Il orchestre les 6 moteurs opérationnels META‑OPS : CORE, UI, HUD, AUTOMATION, DIAGNOSTIC, SECURITY.  
Il garantit la cohérence, la stabilité, la synchronisation et l’exécution correcte de tout le cockpit.

## ARCHITECTURE (compacte)
1. MASTER_STATE — état global du cockpit  
2. MASTER_SYNC — synchronisation des 6 moteurs  
3. MASTER_FLOW — gestion des flux inter‑moteurs  
4. MASTER_ALERT — supervision des alertes globales  
5. MASTER_POLICY — règles, priorités, arbitrages  
6. MASTER_REPORT — état global, score, résumé cockpit

## MOTEURS INTÉGRÉS
core: META_OPS_CORE_ENGINE  
ui: META_OPS_UI_ENGINE  
hud: META_OPS_HUD_ENGINE  
automation: META_OPS_AUTOMATION_ENGINE  
diagnostic: META_OPS_DIAGNOSTIC_ENGINE  
security: META_OPS_SECURITY_ENGINE  

## SORTIES (compactes)
master_state: <idle|active|warning|error|critical>  
sync: <ok|partial|desync|forced>  
flow: <stable|busy|blocked>  
alerts: <0-∞>  
score: <0-100>  

## CYCLE MASTER
CORE → UI → HUD → AUTOMATION → DIAGNOSTIC → SECURITY → CORE  
(Orchestration circulaire, cockpit‑grade)

## RÉACTIONS UNITAIRES
MASTER_SYNC_ALL — synchronise les 6 moteurs  
MASTER_SCAN — analyse l’état global  
MASTER_RESOLVE — arbitre un conflit moteur  
MASTER_BALANCE — équilibre les flux  
MASTER_REPORT — génère un état cockpit complet

## INTÉGRATION
Alimente :  
COCKPIT_MASTER_TOTAL, SYSTEM_MONITOR_TOTAL, META_OPS_INTERNAL_MAP, META_OPS_BEHAVIOR_MODEL, PACK_UI_PRO v∞.Ω

## NAVIGATION
[[META_OPS_CORE_ENGINE]] · [[META_OPS_UI_ENGINE]] · [[META_OPS_HUD_ENGINE]] · [[META_OPS_AUTOMATION_ENGINE]] · [[META_OPS_DIAGNOSTIC_ENGINE]] · [[META_OPS_SECURITY_ENGINE]] · [[COCKPIT_MASTER_TOTAL]] · [[SYSTEM_MONITOR_TOTAL]]
