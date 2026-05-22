---
id: META-OPS-CORE-ENGINE
module: META_OPS_Core_Engine
era: OPS
version: META_OPS_CORE_ENGINE v1.0
tags: [cockpit, meta_ops, core, operational, engine, workflow]
---

# META‑OPS CORE ENGINE v1.0 — BLOC UNIQUE  
Moteur central opérationnel · Gestion des états · Cohérence cockpit · Flux internes

Le CORE ENGINE est le cœur fonctionnel d’OpenClaw_Light. Il gère les états internes, les transitions, la cohérence globale, les alertes, les flux OPS, la synchronisation HUD/UI et la logique d’exécution. C’est le cerveau opérationnel du cockpit.

## ARCHITECTURE (compacte)
1. CORE_STATE_MANAGER — états cockpit/UI/HUD/OPS, transitions, verrouillages  
2. CORE_FLOW_CONTROLLER — flux internes, priorités, files, optimisation  
3. CORE_SYNC_ENGINE — synchronisation HUD↔UI, OPS↔META‑OPS  
4. CORE_ALERT_SYSTEM — erreurs, warnings, alertes, logs critiques  
5. CORE_EXECUTION_LOGIC — règles, autorisations, dépendances, résolution

## SORTIES (compactes)
state: <idle|active|error|locked|transition>  
flow_status: <stable|overload|blocked|optimizing>  
sync: <ok|desync|pending|forced>  
alerts: [...]  
execution: <allowed|denied|deferred>

## CYCLE OPÉRATIONNEL
STATE → FLOW → SYNC → ALERT → EXECUTION → STATE

## RÉACTIONS UNITAIRES
CORE_SET_STATE — change l’état  
CORE_PUSH_FLOW — injecte un flux  
CORE_FORCE_SYNC — force la synchro  
CORE_RAISE_ALERT — déclenche une alerte  
CORE_EXECUTE — exécute une action

## INTÉGRATION
Alimente : HUD_MASTER_TOTAL, COCKPIT_MASTER_TOTAL, SYSTEM_MONITOR_TOTAL, META_OPS_INTERNAL_MAP, META_OPS_BEHAVIOR_MODEL, META_OPS_REACTION_LIBRARY

## NAVIGATION
[[META_OPS_UI_ENGINE]] · [[META_OPS_HUD_ENGINE]] · [[META_OPS_AUTOMATION_ENGINE]] · [[META_OPS_DIAGNOSTIC_ENGINE]] · [[META_OPS_SECURITY_ENGINE]] · [[COCKPIT_MASTER_TOTAL]] · [[SYSTEM_MONITOR_TOTAL]]
