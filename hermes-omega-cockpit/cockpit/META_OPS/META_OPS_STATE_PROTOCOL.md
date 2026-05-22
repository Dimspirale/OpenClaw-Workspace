---
id: META-OPS-STATE-PROTOCOL
module: META_OPS_State_Protocol
era: OPS
version: META_OPS_STATE_PROTOCOL v1.0
tags: [cockpit, meta_ops, state, protocol, operational, engine]
---

# META‑OPS STATE PROTOCOL v1.0 — BLOC UNIQUE  
Protocole des états cockpit · Transitions · Conditions · Stabilisation OPS

Le STATE PROTOCOL définit **la logique officielle des états cockpit**.  
Il gère les transitions, les conditions d’entrée/sortie, les réactions associées et les stabilisations.  
C’est la couche qui garantit que le cockpit évolue entre les états de manière cohérente, stable et prévisible.

## ÉTATS COCKPIT
idle  
active  
warning  
error  
critical  

Chaque état modifie :  
- les flux  
- les alertes  
- la synchro  
- les priorités  
- les réactions automatiques  
- le comportement global  

## CONDITIONS D’ENTRÉE
idle: CORE ok + UI ok + HUD ok  
active: CORE actif + flux stable  
warning: DIAGNOSTIC warning OR flux busy  
error: SECURITY blocked OR DIAGNOSTIC error  
critical: flux blocked + sync failed OR SECURITY lock  

## CONDITIONS DE SORTIE
idle → active: cockpit_ready  
active → warning: diag_warning OR flow_busy  
warning → error: diag_error OR security_block  
error → critical: sync_failed OR flow_blocked  
critical → idle: recovery_full_ok  

## TRANSITIONS (compactes)
idle → active  
active → warning  
warning → error  
error → critical  
critical → idle  

Transitions autorisées uniquement via :  
- MASTER_ENGINE  
- BEHAVIOR_MODEL  
- REACTION_LIBRARY  

## RÉACTIONS ASSOCIÉES
idle: UI_REFRESH + HUD_MASTER_REFRESH  
active: MASTER_SYNC_ALL  
warning: HUD_ALERT_LAYER.warning + MONITOR_RISK  
error: SECURITY_BLOCK + DIAG_SCAN + HUD_ALERT_LAYER.error  
critical: SECURITY_LOCK + HUD_MASTER_ALERT + AUTO_FIX  

## MATRICE ÉTAT × ACTION
idle: no_risk, low_flux, full_sync  
active: normal_ops, full_flux, stable  
warning: medium_risk, partial_sync, auto_balance  
error: high_risk, desync, diag_scan  
critical: max_risk, locked, recovery_required  

## STABILISATION
STATE_STABILIZER agit sur :  
- oscillations d’état  
- transitions rapides  
- états instables  
- conflits moteur  
- désynchronisations  

Sortie :  

state_stable: <true|false>


## RÉCUPÉRATION
STATE_RECOVERY déclenche :  
- RECOVERY_AUTO  
- RECOVERY_SYNC  
- RECOVERY_FLOW  
- RECOVERY_FULL  

Condition de retour à idle :  

CORE ok + SECURITY ok + DIAGNOSTIC ok + FLOW stable + SYNC ok


## PROPAGATION
état cockpit → HUD_MASTER → SYSTEM_MONITOR_TOTAL → PACK_UI_PRO  
état moteur → MASTER_ENGINE → COCKPIT_MASTER_TOTAL  
alertes → STATE_PROTOCOL → BEHAVIOR_MODEL → REACTION_LIBRARY  

## INTÉGRATION
Utilisé par :  
META_OPS_BEHAVIOR_MODEL, META_OPS_REACTION_LIBRARY, META_OPS_FLOW_PROTOCOL, META_OPS_MASTER_ENGINE, COCKPIT_MASTER_TOTAL, SYSTEM_MONITOR_TOTAL

## NAVIGATION
[[META_OPS_BEHAVIOR_MODEL]] · [[META_OPS_REACTION_LIBRARY]] · [[META_OPS_FLOW_PROTOCOL]] · [[META_OPS_MASTER_ENGINE]] · [[COCKPIT_MASTER_TOTAL]] · [[SYSTEM_MONITOR_TOTAL]]
